# Code Review — Open Lap

## Overall Quality: B+

The codebase is well-structured for a mid-size Angular/Ionic app. Domain modeling (the `carrera/` layer) is clean and decoupled from Angular. Feature modules are logically organized, naming conventions are consistent, and barrel exports keep imports tidy. The RxJS-heavy reactive style in `Session` and `RmsPage` is idiomatic and handles complex real-time race logic effectively.

The `shareReplay()` unbounded buffer issue has been fully addressed (buffer size is now explicit). The remaining weaknesses center on deprecated RxJS operators and a `scan()` side effect. All known issues are documented with FIXME/TODO comments in the source.

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

### 1. `shareReplay` with `refCount: false`

**File:** `src/app/carrera/control-unit.ts` L88, L119

Buffer size is now explicitly `1`, fixing the unbounded replay. `refCount: false` is intentional — FIXME comments in the source explain that the latest status/state must always be replayed to new subscribers. This is acceptable for `ControlUnit`'s lifecycle since `disconnect()` tears down the underlying connection. No action needed unless the lifecycle model changes.

### 2. Deprecated RxJS operators: `publish()` and `retryWhen()`

**File:** `src/app/carrera/control-unit.ts` L70, L80

Both deprecated since RxJS 7.x (removal planned for v8). Source FIXME comments note that `catchError` doesn't work correctly with `publish`/`shareReplay`, and `shareReplay` with `refCount: false` doesn't work with `retryWhen`. These are coupled — migrating requires replacing both simultaneously. Likely approach: switch to `connectable()` + `retry({ delay: ... })` and test reconnection behavior carefully.

---

## MEDIUM — Robustness

### 3. `scan()` side effect calls `this.finish(id)`

**File:** `src/app/rms/session.ts` L236–240

The `scan()` accumulator invokes `this.finish(id)`, which mutates `this.mask` and sends commands to the CU. While side effects inside `scan()` are an anti-pattern (they should be in a downstream `tap()`), the timing of this call is critical to race session state management. 

**Note:** Refactoring this to move the side effect downstream requires careful analysis and testing to ensure the finish logic is triggered at exactly the right point in the event stream. The existing TODO comment documents the issue for future maintainers.

---

## Summary

| Severity | Count | Key themes |
|----------|-------|------------|
| HIGH     | 2     | `shareReplay` refCount, deprecated `publish()`/`retryWhen()` |
| MEDIUM   | 1     | `scan()` side effect (timing-critical) |
