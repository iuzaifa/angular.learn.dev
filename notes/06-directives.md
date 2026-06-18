# Directives

## 1. What is it?

**Definition:** A directive is a class decorated with `@Directive` that attaches behavior or appearance changes to existing DOM elements (unlike a component, it has no own template).

**Purpose:** To reuse and encapsulate DOM manipulation logic — adding/removing elements, changing styles/classes, or listening to events — without writing a full component.

## 2. Why is it used?

- Avoids repeating the same DOM-manipulation logic (tooltips, highlight-on-hover, permission-based visibility) across many components.
- Lets you conditionally render or repeat DOM structure declaratively (`*ngIf`, `*ngFor`) instead of imperative `if`/`for` in TypeScript.
- Solves the problem of tightly coupling presentation logic (e.g. "show this only if user is admin") to specific components — directives make it reusable and declarative.

## 3. When should we use it?

- **Structural directives** — whenever you need to conditionally add/remove or repeat DOM elements (lists, conditional panels).
- **Attribute directives** — whenever you need to change appearance/behavior of an existing element without adding a new one (highlight, auto-focus, permission-based disabling).
- **Custom directives** — when the same DOM-manipulation pattern shows up in 3+ places across the app (e.g., a `appHasRole` directive used on buttons/menu items across an admin dashboard).

## 4. How does it work? (Internal workflow)

- **Attribute directives** are instantiated on the host element they're applied to; Angular injects `ElementRef` (DOM reference) and/or `Renderer2` (safe DOM API) into the constructor, and the directive manipulates the host element directly.
- **Structural directives** work by manipulating a `TemplateRef` and a `ViewContainerRef`: the directive decides whether/how many times to call `viewContainerRef.createEmbeddedView(templateRef)`. The `*` syntax (`*ngIf`) is sugar that Angular desugars into an `<ng-template>` with the directive applied.

```html
<!-- *ngIf="cond" desugars to: -->
<ng-template [ngIf]="cond">
  ...
</ng-template>
```

## 5. Syntax

**Built-in structural directives (classic):**

```html
<div *ngIf="isVisible">Shown conditionally</div>
<li *ngFor="let item of items; let i = index; trackBy: trackByFn">{{ i }}: {{ item }}</li>
<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">Active</p>
  <p *ngSwitchDefault>Unknown</p>
</div>
```

**Modern Angular control flow (v17+, replaces `*ngIf`/`*ngFor`/`*ngSwitch`):**

```html
@if (isVisible) {
  <div>Shown conditionally</div>
} @else {
  <div>Hidden state</div>
}

@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>No items</li>
}

@switch (status) {
  @case ('active') { <p>Active</p> }
  @default { <p>Unknown</p> }
}

@defer (on viewport) {
  <app-heavy-widget></app-heavy-widget>
} @placeholder {
  <p>Scroll to load…</p>
} @loading (minimum 500ms) {
  <p>Loading…</p>
}
```

**Custom attribute directive:**

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
```

**Custom structural directive:**

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]', standalone: true })
export class UnlessDirective {
  private hasView = false;
  constructor(private templateRef: TemplateRef<unknown>, private vcr: ViewContainerRef) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.vcr.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.vcr.clear();
      this.hasView = false;
    }
  }
}
```

## 6. Example

**Simple example:** `*appHighlight` directive applied to a card on hover (above).

**Real-world example:** A `appHasRole` structural directive used across an admin dashboard to show/hide buttons based on the logged-in user's role — avoids repeating `*ngIf="authService.hasRole('ADMIN')"` everywhere and centralizes the access-check logic in one place, so a future change to role logic only needs one edit.

## 7. Advantages

- DRY — write DOM logic once, reuse on any element via an attribute.
- Keeps templates declarative and readable.
- The new `@if`/`@for`/`@switch`/`@defer` block syntax is built into the template compiler (not directive-based under the hood) — faster and with better type-checking than the old structural directives.

## 8. Disadvantages

- Custom structural directives have a steeper learning curve (`TemplateRef`/`ViewContainerRef` APIs).
- Overusing many small custom attribute directives can fragment behavior across many files, making it harder to trace what affects a given element.
- `*ngIf`/`*ngFor` syntax cannot be combined on the same host element directly (needs `ng-container`).

## 9. Interview Questions

**Beginner:**
1. What's the difference between a component and a directive? — *A component has its own template; a directive only adds behavior/appearance to an existing element.*
2. What are the three types of directives in Angular? — *Component (technically a directive with a template), structural, and attribute.*

**Intermediate:**
3. How does `*ngFor` with `trackBy` improve performance? — *Without `trackBy`, Angular re-creates DOM nodes for the whole list on any change by default identity comparison; `trackBy` lets Angular match items by a stable key (e.g. `id`), updating only changed nodes instead of destroying/recreating the whole list.*
4. What does the `*` prefix on `*ngIf` actually do? — *It's syntactic sugar that Angular desugars into an `<ng-template>` element with the directive's input bound, using `TemplateRef`/`ViewContainerRef` under the hood.*

**Advanced:**
5. How would you build a custom structural directive similar to `*ngIf`? — *Inject `TemplateRef` and `ViewContainerRef`, then conditionally call `createEmbeddedView()`/`clear()` based on an `@Input()` setter, as shown in the `appUnless` example.*
6. How does the new `@defer` block improve performance over manually lazy-loading a component? — *`@defer` is compiler-integrated: it splits the deferred content into a separate chunk automatically, supports multiple trigger conditions (viewport, interaction, idle, timer), and provides built-in placeholder/loading/error states — without manual dynamic-import wiring.*

## 10. Best Practices

- Prefer the new `@if`/`@for`/`@switch` block syntax for new code — better type narrowing and performance than `*ngIf`/`*ngFor`.
- Always provide `track` (or `trackBy` in legacy `*ngFor`) for lists bound to dynamic data.
- Keep custom directives focused on one concern (single responsibility), just like services.

## 11. Common Mistakes

- Forgetting `trackBy`/`track` on large `*ngFor`/`@for` lists, causing unnecessary full re-renders.
- Mutating the host element's style/DOM directly via `ElementRef.nativeElement` instead of using `Renderer2` — breaks server-side rendering (no real DOM) and bypasses Angular's sanitization.
- Trying to put `*ngIf` and `*ngFor` on the same element instead of using `ng-container` or splitting into nested elements.

## 12. Comparison Tables

**Structural vs Attribute Directives**

| Aspect | Structural | Attribute |
|---|---|---|
| Changes DOM structure? | Yes (adds/removes elements) | No (changes existing element's look/behavior) |
| Syntax marker | `*` prefix (legacy) or `@if`/`@for`/`@switch` blocks | `[appName]` |
| Example | `*ngIf`, `*ngFor`, `@if`, `@for` | `appHighlight`, `ngClass`, `ngStyle` |

**Legacy Structural Directives vs Modern Control Flow**

| Aspect | `*ngIf` / `*ngFor` / `*ngSwitch` | `@if` / `@for` / `@switch` |
|---|---|---|
| Implementation | Directives (`NgIf`, `NgForOf`) | Built into the template compiler |
| Type narrowing | Limited | Improved, more precise |
| Performance | Good | Better (more optimized codegen) |
| Required import | `CommonModule` | None — built-in syntax |
| Angular version | All versions | v17+ (stable) |
