# Code Review — Open Lap

## Overall Quality: B+

The codebase is well-structured for a mid-size Angular/Ionic app. Domain modeling (the `carrera/` layer) is clean and decoupled from Angular. Feature modules are logically organized, naming conventions are consistent, and barrel exports keep imports tidy. The RxJS-heavy reactive style in `Session` and `RmsPage` is idiomatic and handles complex real-time race logic effectively.

The `shareReplay()` buffer is now explicit (`bufferSize: 1`) and `refCount: false` is an intentional, documented design choice. The remaining weaknesses center on deprecated RxJS operators and a `scan()` side effect. All known issues are documented with FIXME/TODO comments in the source.

**Strengths:**
- Clean separation between hardware abstraction (`ControlUnit`), session logic, and UI
- Consistent use of `OnDestroy` cleanup across most components
- Good i18n coverage with natural-language translation keys
- Defensive loaded-flag pattern in settings pages prevents data corruption
- `NavParams` fully removed — popover menus and modal dialogs use `@Input()` with `componentProps`

**Weaknesses:**
- Deprecated RxJS operators in the most critical file (`control-unit.ts`)
- `scan()` side effect in session logic (timing-critical, requires careful testing)

---

## HIGH — Bugs / Correctness

### 1. Deprecated RxJS operators: `publish()` and `retryWhen()`

**File:** `src/app/carrera/control-unit.ts` L70, L80

Both deprecated since RxJS 7.x (removal planned for v8). Source FIXME comments note that `catchError` doesn't work correctly with `publish`/`shareReplay`, and `shareReplay` with `refCount: false` doesn't work with `retryWhen`. These are coupled — migrating requires replacing both simultaneously.

**Suggested fix:**

`publish()` returns a `ConnectableObservable`; the modern equivalent is the standalone `connectable()` factory, which already imported `Connectable` is typed against:

```ts
import { connectable, Subject } from 'rxjs';

this.data = connectable(
  timedConnection.pipe(
    retry({ delay: errors => this.doReconnect(errors) }),
    tap(() => this.poll()),
    map((data: ArrayBuffer) => new DataView(data))
  ),
  { connector: () => new Subject<DataView>(), resetOnDisconnect: false }
);
```

`retryWhen(fn)` maps directly to `retry({ delay: fn })` — `delay` receives the same error notification stream and re-subscribes when it emits. Because `doReconnect()` already owns its own retry/backoff counter via `scan()` (resetting to `0` whenever `state.value === 'connected'`), no per-error count argument is needed and the existing logic transfers unchanged.

**Caveats to verify when migrating:**
- `connectable()` defaults `resetOnDisconnect: true`; set it to `false` to preserve the current `publish()` semantics where the underlying connection persists across re-subscription.
- `retry` with a `delay` selector completes (rather than retries) if the selector completes. `doReconnect()` returns a `timer(...)` that emits then completes per error, which is the desired "wait then retry once more" behavior — confirm reconnection still loops indefinitely after multiple consecutive failures.
- Test the full reconnect path on real hardware (drop and restore the BLE link): connect → timeout → backoff → `state` transitions `disconnected → connecting → connected`.

### 2. Stateful side effect in `doReconnect()` reads `state.value`

**File:** `src/app/carrera/control-unit.ts` L228–242

`doReconnect()` reads `this.state.value` imperatively inside `scan()` and pushes new states via `state.next()`. This works but couples the retry counter to a mutable `BehaviorSubject` snapshot. It is low-risk and intentional, but worth a comment noting that the `scan()` accumulator deliberately resets on a successful connection. No change required.

---

## MEDIUM — Robustness

### 3. `scan()` side effect calls `this.finish(id)`

**File:** `src/app/rms/session.ts` L236–240

The `scan()` accumulator invokes `this.finish(id)`, which mutates `this.mask` and sends commands to the CU. Side effects inside `scan()` are an anti-pattern (they should live in a downstream `tap()`), but the timing of this call is critical to race session state management.

**Suggested fix:** keep `scan()` pure by emitting the `finished` flag (it already does) and reacting to the *transition* downstream. The accumulator already carries `finished` as the 4th tuple element, so a `tap()` after the `scan()` can detect the `false → true` edge and trigger the side effect exactly once:

```ts
const times = group.pipe(
  scan(([times, last, best, finished]: TimeInfo, [id, time, sensor]) => {
    // ...existing pure accumulation, but DON'T call this.finish() here...
    if (sensor === 1 && !finished && this.isFinished(times.length - 1)) {
      finished = true; // just flip the flag
    }
    return <TimeInfo>[times, last, best, finished];
  }, <TimeInfo>[[], [], [], false]),
  distinctUntilChanged((a, b) => a[3] === b[3]),   // optional: only re-emit on change
  tap(([, , , finished]) => {
    if (finished) {
      this.finish(group.key);   // side effect isolated downstream
    }
  })
);
```

**Caveats to verify when migrating:**
- `this.finish()` must fire **once**. Guard against repeated emissions after `finished` becomes `true` (e.g. `pairwise()` to detect the `false → true` edge, or a local `wasFinished` flag in the `tap`), otherwise `setMask`/`finish` commands are resent on every subsequent lap event.
- `group.key` is the driver id; confirm it equals the `id` previously passed to `finish(id)` (it does — `group` is keyed by `([id]) => id`).
- This is timing-critical race logic. Test with a multi-car session running to the configured lap/time limit and confirm the checkered flag and pace-car behavior are unchanged.

---

## Summary

| Severity | Count | Key themes |
|----------|-------|------------|
| HIGH     | 2     | Deprecated `publish()`/`retryWhen()`; stateful `doReconnect()` counter |
| MEDIUM   | 1     | `scan()` side effect (timing-critical) |

### Recommended order of work

1. **Migrate `publish()` + `retryWhen()` together** (#1) — they are coupled and block a future RxJS 8 upgrade. Validate reconnection on hardware.
2. **Isolate the `scan()` side effect** (#3) — purely mechanical once the `false → true` edge guard is in place; lowest risk after reconnection is verified.
3. Leave #2 as a documented intentional decision; revisit only if the `ControlUnit` lifecycle model changes.
