# Templates

## What is it?

**Definition:** An Angular template is HTML extended with Angular-specific syntax (interpolation, bindings, directives) that declaratively describes how a component's UI should look and behave.

**Purpose:** Separates "what the UI looks like and reacts to" from "how the component's logic works," while keeping both tightly and efficiently connected through data binding.

## Why is it used / problem it solves

Without a templating system, you'd manually write `document.createElement`/`element.addEventListener` calls to keep the DOM in sync with data — error-prone and verbose. Angular templates let you *declare* the relationship between data and DOM, and the framework keeps them in sync.

## Interpolation

```html
<p>Hello, {{ userName }}!</p>
<p>Total: {{ price * quantity }}</p>
```

Embeds an expression's string value into the DOM text content. Expressions must be side-effect-free (no assignments).

## Property Binding

```html
<img [src]="imageUrl" [alt]="imageAlt" />
<button [disabled]="isLoading">Submit</button>
```

Binds a DOM element property (not just an HTML attribute) to a component expression — one-way, from component to view.

## Event Binding

```html
<button (click)="onSave()">Save</button>
<input (input)="onSearch($event.target.value)" />
```

Binds a DOM event to a component method — one-way, from view to component.

## Two-Way Binding

```html
<input [(ngModel)]="userName" />
```

Syntactic sugar combining property binding and event binding (`[ngModel]` + `(ngModelChange)`); requires `FormsModule`. Keeps a form control and a component property in sync in both directions.

## Template Reference Variables

```html
<input #emailInput type="email" />
<button (click)="log(emailInput.value)">Log email</button>
```

`#name` creates a local reference to a DOM element (or directive/component) usable elsewhere in the same template.

## `ng-template`

```html
<ng-template #loading>
  <p>Loading...</p>
</ng-template>
```

Defines a chunk of template that is **not rendered by default** — only rendered when explicitly referenced (e.g., via `*ngIf...else`, `ngTemplateOutlet`, or a structural directive).

## `ng-container`

```html
<ng-container *ngIf="isLoggedIn">
  <app-dashboard></app-dashboard>
</ng-container>
```

A logical grouping element that's never rendered to the DOM itself — useful for applying a structural directive without introducing an extra wrapper `<div>`.

## `ng-content`

```html
<!-- card.component.html -->
<div class="card">
  <ng-content></ng-content>
</div>

<!-- usage -->
<app-card><p>Projected content</p></app-card>
```

Enables **content projection** — lets a parent inject arbitrary markup into a designated slot inside a child component's template (similar to "slots" in other frameworks).

## Comparison Table: Binding Types

| Binding | Syntax | Direction |
|---|---|---|
| Interpolation | `{{ value }}` | Component → View |
| Property binding | `[prop]="value"` | Component → View |
| Event binding | `(event)="handler()"` | View → Component |
| Two-way binding | `[(ngModel)]="value"` | Both |

## Best Practices

- Use `[ngClass]`/`[ngStyle]` (or signal-based class bindings) instead of string-concatenating classes in templates.
- Prefer `ng-container` over extra `<div>` wrappers purely for structural directives — keeps the DOM clean.
- Keep template expressions simple; move computed logic into the component class or a `computed()` signal.

## Common Mistakes

- Calling a method directly in an interpolation that does heavy work (e.g., `{{ getTotal() }}`) — this re-runs on every change-detection cycle. Cache the value or use `computed()`/pipes instead.
- Forgetting `FormsModule` import when using `[(ngModel)]`, causing a template parse error.
- Using `*ngIf` and `*ngFor` on the same element (not allowed directly) instead of wrapping with `ng-container` or `ng-template`.

## Quick Interview Q&A

**Q1 (Beginner): What's the difference between interpolation and property binding?**
A: Interpolation (`{{ }}`) inserts a string into text content; property binding (`[ ]`) binds directly to a DOM element property and can accept any type, not just strings.

**Q2 (Intermediate): Why would you use `ng-container` instead of a `<div>`?**
A: `ng-container` doesn't render any actual DOM element, so it lets you apply a structural directive (like `*ngIf`) without adding an unnecessary wrapper element that could break CSS layout or semantics.

**Q3 (Advanced): What's the difference between `ng-template` and `ng-content`?**
A: `ng-template` defines a template fragment that's rendered only when explicitly invoked (e.g. by `*ngIf...else` or `ngTemplateOutlet`); `ng-content` is a projection slot where a *parent* component injects markup into a *child* component's view.
