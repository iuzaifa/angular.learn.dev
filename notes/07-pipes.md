# Pipes

## 1. What is it?

**Definition:** A pipe is a simple function, decorated with `@Pipe`, used in templates with the `|` syntax to transform a value for display without changing the underlying data.

**Purpose:** To keep display-formatting logic out of component classes and templates, in a reusable, declarative, composable form.

## 2. Why is it used?

- Avoids repeating formatting logic (dates, currency, text case) in every component that needs it.
- Keeps templates readable: `{{ price | currency }}` vs. manually formatting in the class.
- Solves the problem of re-running expensive transformations on every change-detection cycle — **pure pipes** only re-run when their input reference changes.

## 3. When should we use it?

- Formatting dates, numbers, currency, percentages for display — use built-in pipes (`date`, `currency`, `percent`, `number`).
- Filtering/sorting lists for display, truncating text, custom business-specific formatting — use custom pipes.
- Use `async` pipe whenever displaying an `Observable`/`Promise` directly in a template (auto-subscribes/unsubscribes).

## 4. How does it work? (Internal workflow)

- Angular registers the pipe's `transform()` method as the implementation invoked wherever `| pipeName` appears in a template expression.
- **Pure pipes** (default) are only re-invoked when Angular detects the *input reference* has changed (primitive value change, or new object/array reference) — not on every change-detection cycle, regardless of internal mutation.
- **Impure pipes** (`pure: false`) re-run on *every* change-detection cycle, regardless of whether the input changed — necessary for pipes that need to react to internal mutations (e.g., filtering a mutated array), but expensive.

## 5. Syntax

**Basic — built-in pipes:**

```html
<p>{{ today | date:'mediumDate' }}</p>
<p>{{ price | currency:'INR' }}</p>
<p>{{ ratio | percent:'1.2' }}</p>
<p>{{ name | uppercase }}</p>
<p>{{ longText | slice:0:100 }}</p>
<p>{{ user$ | async }}</p>
```

**Chaining pipes:**

```html
<p>{{ amount | currency:'INR' | uppercase }}</p>
```

**Advanced — custom pipe:**

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20, trail = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit) + trail : value;
  }
}
```

```html
<p>{{ description | truncate:50 }}</p>
```

## 6. Example

**Simple example:** Formatting a date for display:

```html
<p>{{ order.createdAt | date:'dd MMM yyyy, hh:mm a' }}</p>
```

**Real-world example:** A custom `filterByStatus` pipe used in an order-management dashboard to display only "Pending" orders in a table, combined with the `async` pipe to subscribe directly to a live `Observable<Order[]>` from a service:

```html
<tr *ngFor="let order of (orders$ | async | filterByStatus:'PENDING')">
  <td>{{ order.id }}</td>
  <td>{{ order.total | currency:'INR' }}</td>
</tr>
```

## 7. Advantages

- Encourages reusable, declarative formatting logic.
- Pure pipes are highly performant — cached/skipped unless input reference changes.
- `async` pipe removes the need for manual `subscribe()`/`unsubscribe()` boilerplate in components.

## 8. Disadvantages

- Impure pipes can hurt performance if used carelessly (run every CD cycle).
- Overusing pipes for complex business logic in templates can make logic harder to test/trace compared to keeping it in the component/service.
- Filtering/sorting pipes operating on large arrays can become a performance bottleneck since they re-run on every reference change of the array.

## 9. Interview Questions

**Beginner:**
1. What is a pipe used for? — *Transforming a value for display in a template without altering the underlying data.*
2. Name three built-in Angular pipes. — *`date`, `currency`, `uppercase` (also `lowercase`, `percent`, `slice`, `async`, `json`).*

**Intermediate:**
3. What's the difference between a pure and an impure pipe? — *A pure pipe re-runs only when its input reference changes; an impure pipe re-runs on every change-detection cycle regardless of whether the input actually changed.*
4. Why is the `async` pipe useful? — *It subscribes to an `Observable`/`Promise` directly in the template, automatically unsubscribing when the component is destroyed, removing manual subscription management.*

**Advanced:**
5. Why would a filter/sort pipe on an array sometimes "stop working" after mutating the array in place? — *Pure pipes only re-run when the *reference* changes; mutating an array in place (e.g., `push()`) keeps the same reference, so Angular skips re-running the pipe. Fix by creating a new array reference (e.g., spread `[...array]`) or making the pipe impure (at a performance cost).*
6. Why does Angular generally discourage filtering/sorting via pipes in large lists? — *Pure pipes re-run on every new array reference and impure pipes re-run every CD cycle; for large datasets this can be expensive — it's often better to filter/sort in the component/service and expose the already-processed data, or use a memoized signal/computed value.*

## 10. Best Practices

- Default to pure pipes; only use impure pipes when truly necessary.
- Use the `async` pipe instead of manual subscriptions wherever a component just needs to display stream data.
- For expensive filtering/sorting on large datasets, do it in the component/service (or a `computed()` signal) rather than in a pipe.

## 11. Common Mistakes

- Mutating an array/object in place and expecting a pure pipe to detect the change.
- Putting heavy computation inside a pipe's `transform()` without memoization, causing repeated expensive work.
- Forgetting to mark a custom pipe `standalone: true` (or declare it in a module) before using it in a standalone component's `imports`.

## 12. Comparison Table: Pure vs Impure Pipes

| Aspect | Pure Pipe (default) | Impure Pipe |
|---|---|---|
| Re-run trigger | Input reference change | Every change-detection cycle |
| Performance | Efficient | Expensive for large/frequent updates |
| Declaration | `@Pipe({ name: 'x' })` | `@Pipe({ name: 'x', pure: false })` |
| Typical use case | Formatting (date, currency) | Filtering a mutated array, real-time recalculation |
