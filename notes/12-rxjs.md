# RxJS

## 1. What is it?

**Definition:** RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs using **Observables** — streams of values over time that can be transformed, combined, and subscribed to. Angular uses RxJS extensively (`HttpClient`, Router events, Reactive Forms, `EventEmitter`).

**Purpose:** To handle async/event streams (HTTP responses, user input, timers, WebSocket messages) in a unified, composable, declarative way instead of nested callbacks or nested `.then()` chains.

## 2. Why is it used?

- Solves "callback hell" / deeply nested async logic.
- Provides powerful operators to transform, filter, combine, and cancel streams declaratively.
- Essential for handling real-world UI patterns: debounced search, polling, request cancellation, combining multiple data sources.

## 3. When should we use it?

- Any time you're working with `HttpClient`, Router events, Reactive Forms `valueChanges`, or custom event streams.
- Use **Subjects** when you need to manually push values into a stream (e.g., a shared event bus between sibling components).
- Use **BehaviorSubject** when consumers need the *current* value immediately on subscribe (e.g., current logged-in user, current theme).

## 4. How does it work? (Core mental model)

- An **Observable** is a blueprint for a stream — it does nothing until subscribed to (lazy/cold by default).
- An **Observer** is an object with `next`, `error`, and `complete` callbacks — what you pass to `.subscribe()`.
- A **Subscription** represents the active execution — calling `.unsubscribe()` stops it and triggers cleanup.
- **Operators** (`map`, `filter`, `switchMap`, etc.) are pure functions that take an Observable and return a new transformed Observable — typically composed via `.pipe()`.

```
source$  ----1----2----3----4---->
  .pipe(map(x => x * 10))
result$  ----10---20---30---40--->
```

## 5. Syntax

**Basic Observable + subscribe:**

```typescript
import { Observable } from 'rxjs';

const numbers$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});

numbers$.subscribe({
  next: value => console.log(value),
  error: err => console.error(err),
  complete: () => console.log('done'),
});
```

**Subjects — Subject vs BehaviorSubject vs ReplaySubject vs AsyncSubject:**

```typescript
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

const subject = new Subject<number>();           // no initial value, no replay to late subscribers
const behavior = new BehaviorSubject<number>(0);   // has current value, replays last value to late subscribers
const replay = new ReplaySubject<number>(2);       // replays last N values to late subscribers
const async = new AsyncSubject<number>();           // only emits the FINAL value, only on complete()
```

## 6. Example — Subjects in practice

```typescript
@Injectable({ providedIn: 'root' })
export class ThemeService {
  // BehaviorSubject: new subscribers immediately get the current theme
  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: 'light' | 'dark') {
    this.themeSubject.next(theme);
  }
}
```

## Comparison Table: Subject Types

| Type | Initial value? | Replays to late subscribers? | Typical use case |
|---|---|---|---|
| `Subject` | No | No | Simple event bus, one-off notifications |
| `BehaviorSubject` | Yes (required) | Replays the **last** value | Current app state (logged-in user, theme, cart count) |
| `ReplaySubject` | No | Replays the **last N** values (configurable) | Chat message history, recent activity feed |
| `AsyncSubject` | No | Replays **only the final** value, only after `complete()` | One-shot result that should only be read once finished (e.g., a long batch job result) |

---

## RxJS Operators

### `map` — transform each emitted value

```typescript
source$.pipe(map(user => user.name));
```

### `filter` — only let through values matching a condition

```typescript
source$.pipe(filter(order => order.total > 1000));
```

### `tap` — side-effects without altering the stream (logging, debugging)

```typescript
source$.pipe(tap(value => console.log('emitted:', value)));
```

### `switchMap` — map to a new inner Observable, **cancelling** the previous one

```typescript
searchTerm$.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term)) // cancels in-flight search if a new term arrives
);
```

### `mergeMap` (aka `flatMap`) — map to inner Observables, run **concurrently**, no cancellation

```typescript
userIds$.pipe(mergeMap(id => this.api.getUser(id))); // fires all requests in parallel
```

### `concatMap` — map to inner Observables, run **sequentially**, one at a time

```typescript
uploadQueue$.pipe(concatMap(file => this.api.upload(file))); // uploads one file after another, in order
```

### `exhaustMap` — map to inner Observable, **ignore new emissions** until current completes

```typescript
submitClick$.pipe(exhaustMap(() => this.api.submitForm())); // prevents duplicate submits from rapid clicks
```

### `catchError` — gracefully handle errors in the stream

```typescript
this.http.get('/api/data').pipe(
  catchError(err => {
    console.error(err);
    return of([]); // fallback value instead of breaking the stream
  })
);
```

### `retry` — automatically resubscribe N times on error

```typescript
this.http.get('/api/data').pipe(retry(3));
```

### `debounceTime` — wait for a pause in emissions before emitting the latest value

```typescript
searchInput$.pipe(debounceTime(300)); // waits 300ms of silence before emitting
```

### `distinctUntilChanged` — skip emissions equal to the previous one

```typescript
searchInput$.pipe(distinctUntilChanged()); // ignores re-emitting the same search term twice in a row
```

### `take` — complete automatically after N emissions

```typescript
interval(1000).pipe(take(5)); // emits 0,1,2,3,4 then completes
```

### `takeUntil` — unsubscribe automatically when a notifier Observable emits (common cleanup pattern)

```typescript
this.dataService.stream$.pipe(takeUntil(this.destroy$)).subscribe(...);
// this.destroy$ is a Subject that .next()s in ngOnDestroy
```

## Comparison Table: The "Mapping" Operators

| Operator | Concurrency behavior | Typical use case |
|---|---|---|
| `switchMap` | Cancels previous inner Observable on new emission | Search-as-you-type, route param changes |
| `mergeMap` | Runs all inner Observables concurrently, no cancellation | Independent parallel requests (e.g., fetch details for each item in a list) |
| `concatMap` | Queues inner Observables, runs strictly one at a time, in order | Sequential uploads, ordered API writes |
| `exhaustMap` | Ignores new emissions while current inner Observable is active | Preventing duplicate form submissions on repeated clicks |

## 7. Advantages

- Declarative composition of complex async logic (debounce + switchMap + catchError in one readable pipeline).
- Built-in cancellation semantics avoid race conditions (e.g., stale search results overwriting fresh ones).
- One unified abstraction (`Observable`) for HTTP, events, timers, and WebSockets.

## 8. Disadvantages

- Steep learning curve — operator selection (especially the four mapping operators) is a common source of subtle bugs.
- Debugging deeply piped chains can be harder than straightforward async/await code.
- Risk of memory leaks if subscriptions aren't cleaned up (`takeUntil`, `async` pipe, or manual `unsubscribe()`).

## 9. Interview Questions

**Beginner:**
1. What is an Observable? — *A lazy stream of values over time that does nothing until subscribed to, and can emit multiple `next` values before optionally completing or erroring.*
2. What's the difference between `Subject` and `BehaviorSubject`? — *`BehaviorSubject` requires and holds a current value, replaying it to new subscribers immediately; `Subject` has no current value and only emits to subscribers active at the time of emission.*

**Intermediate:**
3. What's the difference between `switchMap` and `mergeMap`? — *`switchMap` cancels the previous inner Observable when a new value arrives; `mergeMap` lets all inner Observables run concurrently without cancellation.*
4. Why use `debounceTime` with `distinctUntilChanged` together in a search box? — *`debounceTime` reduces how often values pass through (only after a pause in typing); `distinctUntilChanged` then prevents firing a duplicate API call if the debounced value happens to be the same as the last one (e.g., typing then deleting back to the same text).*

**Advanced:**
5. Why is `switchMap` the right choice for a type-ahead search but the wrong choice for handling form submissions on a "Submit" button? — *For search, cancelling stale in-flight requests when the user types again is desirable; for submissions, cancelling an in-flight submit on a second click could silently drop the first submission or cause inconsistent state — `exhaustMap` (ignore duplicate clicks) or `concatMap` (queue them) are safer choices.*
6. How would you prevent a memory leak from a long-lived subscription in a component? — *Use the `async` pipe wherever possible (auto-unsubscribes), or store a `Subject` (`destroy$`) and pipe subscriptions through `takeUntil(this.destroy$)`, calling `this.destroy$.next()` in `ngOnDestroy` — or use Angular's `takeUntilDestroyed()` utility which does this automatically.*

## 10. Best Practices

- Prefer the `async` pipe over manual `.subscribe()` in components when just displaying data.
- Use `takeUntilDestroyed()` (or `takeUntil(destroy$)`) for subscriptions that must live as long as the component.
- Choose the mapping operator deliberately: `switchMap` for "only the latest matters," `mergeMap` for "all matter, in parallel," `concatMap` for "all matter, in order," `exhaustMap` for "ignore new while busy."
- Always handle errors with `catchError` in HTTP pipelines to avoid an unhandled error silently breaking the whole stream.

## 11. Common Mistakes

- Using `mergeMap` for sequential dependent calls, causing race conditions where responses can arrive out of order.
- Forgetting that `Subject` doesn't replay history — late subscribers miss earlier emissions (use `BehaviorSubject`/`ReplaySubject` instead if that's needed).
- Subscribing inside `ngOnInit` without ever unsubscribing, causing memory leaks across component re-creation.
- Nesting `.subscribe()` calls instead of composing operators — reintroduces the same "callback hell" RxJS is meant to solve.

## 12. Comparison Table: Promise vs Observable

| Aspect | Promise | Observable |
|---|---|---|
| Values emitted | Exactly one | Zero, one, or many over time |
| Eager/Lazy | Eager (executes immediately on creation) | Lazy (executes only on subscribe) |
| Cancellable? | No | Yes (`unsubscribe()`) |
| Operators | None built-in | Rich operator library (`map`, `switchMap`, `retry`, etc.) |
| Built into JS? | Yes (native) | No (requires RxJS library) |
