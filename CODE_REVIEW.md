# Code Review — Open Lap

## Overall Quality: B

The codebase is well-structured for a mid-size Angular/Ionic app. Domain modeling (the `carrera/` layer) is clean and decoupled from Angular. Feature modules are logically organized, naming conventions are consistent, and barrel exports keep imports tidy. The RxJS-heavy reactive style in `Session` and `RmsPage` is idiomatic and handles complex real-time race logic effectively.

The main weaknesses are concentrated in observable lifecycle management — a few unbounded replays, leaked subscriptions, and deprecated operators that will break in RxJS 8. These are typical of projects that started on RxJS 6 and haven't fully migrated. The `NavParams` deprecation is cosmetic (still works) but straightforward to fix. No security issues, no broken abstractions, no architectural debt beyond the Cordova plugin layer.

**Strengths:**
- Clean separation between hardware abstraction (`ControlUnit`), session logic, and UI
- Consistent use of `OnDestroy` cleanup across most components
- Good i18n coverage with natural-language translation keys
- Defensive loaded-flag pattern in settings pages prevents data corruption

**Weaknesses:**
- RxJS subscription lifecycle needs attention in 3 key places
- Deprecated operators in the most critical file (`control-unit.ts`)
- Stray `console.log` calls in production code

---

## HIGH — Bugs / Correctness

### 1. `getState()` unbounded `shareReplay` — leaks subscribers and replays forever

**File:** `src/app/carrera/control-unit.ts` L114

`shareReplay()` with no config uses `bufferSize: Infinity` and `refCount: false`. All past emissions are replayed to new subscribers and inner subscriptions are never released. Should be `shareReplay({ bufferSize: 1, refCount: true })`.

### 2. Deprecated RxJS operators: `publish()` and `retryWhen()`

**File:** `src/app/carrera/control-unit.ts` L68, L77

Both deprecated since RxJS 7.x (removal planned for v8). Replace `publish()` with `connectable()` and `retryWhen()` with `retry({ delay: ... })`.

### 3. Subscription leak in `AppComponent.connect()`

**File:** `src/app/app.component.ts` L182, L192

Subscribes to `getConnection()`. Each time it emits, a *new* `cu.getState()` subscription is added to `this.subscription`, but subscriptions from prior connections are never removed. Over multiple reconnects, stale state subscriptions accumulate.

---

## MEDIUM — Deprecations

### 4. `NavParams` is deprecated in Ionic 6+

**Files:**
- `src/app/rms/race-settings.component.ts` L5, L41, L55, L94
- `src/app/rms/rms.menu.ts` L3, L27
- `src/app/tuning/tuning.menu.ts` L3, L34

The modern Ionic pattern is `@Input()` properties + `componentProps`. All callers already pass `componentProps`, so only the receiving components need to change.

---

## MEDIUM — Robustness

### 5. `scan()` side effect calls `this.finish(id)`

**File:** `src/app/rms/session.ts` L238

The `scan()` accumulator invokes `this.finish(id)`, which mutates `this.mask` and sends commands to the CU. Side effects inside `scan()` are an anti-pattern; they should be in a downstream `tap()`. (Has existing TODO comment.)

### 6. `orientation` event listener never removed

**File:** `src/app/app.component.ts` L95

`window.screen.orientation.addEventListener('change', ...)` is registered in the constructor. The callback is never removed in `ngOnDestroy()`, causing a leak if the component is destroyed.

### 7. `console.log` left in production code

**File:** `src/app/drivers/color.component.ts` L32, L45

`console.log("update", ...)` and `console.log(this.color)` should be removed or routed through `LoggingService`.

### 8. `ControlUnitService.next()` async disconnect race condition

**File:** `src/app/services/control-unit.service.ts` L18

`disconnect()` is called asynchronously and `super.next()` is in the `.then()`. If `next()` is called twice rapidly, the second call reads the stale `this.value` and tries to disconnect it again.

---

## LOW — Code Quality

### 9. `RmsPage` triple subscription management

**File:** `src/app/rms/rms.page.ts` L53, L55, L57

Three separate subscription fields (`subscriptions`, `backButtonSubscription`, `subscription`) with different lifecycles. This fragmented pattern makes leak auditing difficult. Consider consolidating.

### 10. `@awesome-cordova-plugins` is unmaintained

**File:** `src/app/app.module.ts` L14

All `@awesome-cordova-plugins/*` packages (formerly `@ionic-native`) are unmaintained. Consider direct Cordova plugin calls or migrating to Capacitor over time. (Has existing TODO comment.)

### 11. `TuningPage.ngOnInit()` subscription not explicitly stored

**File:** `src/app/tuning/tuning.page.ts` L74

`this.subject.pipe(debounceTime(400)).subscribe(...)` result is not stored. The `subject.complete()` in `ngOnDestroy()` terminates the chain, which is sufficient, but explicit unsubscription would be clearer. (Has existing TODO comment.)

### 12. `LoggingService.records` uses `shift()` on array

**File:** `src/app/services/logging.service.ts` L56

`this.records.shift()` is O(n). Negligible at limit 50, but a circular buffer would be more efficient at scale. (Has existing TODO comment.)

---

## Summary

| Severity | Count | Key themes |
|----------|-------|------------|
| HIGH | 3 | Unbounded `shareReplay`, deprecated `publish()`/`retryWhen()`, subscription leak |
| MEDIUM | 4 | Deprecated `NavParams`, `scan()` side effect, stale event listener, `console.log`, async race |
| LOW | 4 | Triple subscription management, unmaintained deps, implicit unsubscribe, O(n) shift |
