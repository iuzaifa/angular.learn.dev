# Components

## 1. What is it?

**Definition:** A component is the fundamental UI building block in Angular — a TypeScript class decorated with `@Component`, paired with an HTML template and (optionally) styles, that controls a region of the screen.

**Purpose:** To encapsulate UI structure, presentation, and behavior into a reusable, testable, composable unit.

## 2. Why is it used?

- Breaks complex UIs into manageable, independently testable pieces.
- Enables reuse across pages/apps (e.g., a `ButtonComponent`, `UserCardComponent`).
- Provides a clean separation between template (view), class (logic), and styles.
- Solves the problem of unmanageable, duplicated DOM-manipulation code in large apps.

## 3. When should we use it?

- Any time you need a distinct, reusable piece of UI — forms, cards, modals, navigation bars, data tables.
- Use **smart (container) components** for pages that fetch data/manage state, and **dumb (presentational) components** for pure UI that only receives `@Input()`s and emits `@Output()`s — a pattern used heavily in production dashboards and design systems.

## 4. How does it work? (Internal workflow)

1. Angular's compiler reads the `@Component` metadata (selector, template, styles).
2. It generates Ivy instructions that describe how to create and update the component's DOM.
3. When the component's selector is matched in a parent template (or it's the bootstrapped root), Angular instantiates the class, resolves its constructor dependencies via DI, and runs lifecycle hooks in order.
4. Change detection (Zone.js-triggered or signal-triggered) re-evaluates bindings and patches only the changed DOM nodes — not a full re-render.

### Lifecycle Hook Order

| Order | Hook | Fires when |
|---|---|---|
| 1 | `ngOnChanges` | Before `ngOnInit`, and whenever an `@Input()` value changes |
| 2 | `ngOnInit` | Once, after the first `ngOnChanges` |
| 3 | `ngDoCheck` | On every change-detection run |
| 4 | `ngAfterContentInit` | Once, after content (ng-content) projected into the component is initialized |
| 5 | `ngAfterContentChecked` | After every check of projected content |
| 6 | `ngAfterViewInit` | Once, after the component's own view (and child views) are initialized |
| 7 | `ngAfterViewChecked` | After every check of the component's view |
| 8 | `ngOnDestroy` | Just before the component is destroyed — cleanup subscriptions, timers, listeners here |

## 5. Syntax

**Basic (standalone, modern Angular):**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: `<h1>Hello, {{ name }}!</h1>`,
  styles: [`h1 { color: teal; }`]
})
export class GreetingComponent {
  name = 'Angular';
}
```

**Advanced (with Input/Output, lifecycle, ViewChild):**

```typescript
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) userName!: string;
  @Output() cardClicked = new EventEmitter<string>();
  @ViewChild('cardEl') cardElement!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    // setup, e.g. subscribe to a service
  }

  ngOnDestroy() {
    // cleanup, e.g. unsubscribe
  }

  onClick() {
    this.cardClicked.emit(this.userName);
  }
}
```

## 6. Example

**Simple example — Parent to Child communication (`@Input()`):**

```typescript
// child.component.ts
@Component({ selector: 'app-child', standalone: true, template: `<p>{{ message }}</p>` })
export class ChildComponent {
  @Input() message = '';
}

// parent.component.html
<app-child [message]="'Hello from parent'"></app-child>
```

**Real-world example — Child to Parent communication (`@Output()`):**

```typescript
// child.component.ts
@Component({
  selector: 'app-product-item',
  standalone: true,
  template: `<button (click)="add()">Add to cart</button>`
})
export class ProductItemComponent {
  @Input() productId!: number;
  @Output() addedToCart = new EventEmitter<number>();
  add() { this.addedToCart.emit(this.productId); }
}

// parent.component.html
<app-product-item [productId]="101" (addedToCart)="onAdd($event)"></app-product-item>
```

```typescript
// parent.component.ts
onAdd(productId: number) {
  this.cartService.add(productId);
}
```

**Sibling communication** (two components that don't share a direct parent-child relationship) is done through a shared service with an `Observable`/`Subject`, since `@Input`/`@Output` only work across direct parent-child boundaries:

```typescript
@Injectable({ providedIn: 'root' })
export class CartEventsService {
  private cartUpdated = new Subject<number>();
  cartUpdated$ = this.cartUpdated.asObservable();
  notify(productId: number) { this.cartUpdated.next(productId); }
}
```

**Standalone Components:** Since Angular 14 (default since v17), components can declare `standalone: true` and import what they need directly (`imports: [CommonModule, FormsModule]`) — no `NgModule` required.

```typescript
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `<li *ngFor="let item of items">{{ item }}</li>`
})
export class ListComponent {
  items = ['a', 'b', 'c'];
}
```

**Dynamic Components:** Created at runtime rather than declared in a template — common for modals, toast notifications, and plugin-style UIs.

```typescript
@Component({ selector: 'app-host', template: `<ng-container #vcr></ng-container>` })
export class HostComponent {
  @ViewChild('vcr', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  loadComponent() {
    this.vcr.clear();
    this.vcr.createComponent(AlertComponent);
  }
}
```

## 7. Advantages

- Encapsulation of template, logic, and styles in one cohesive unit.
- Reusability across the app and across projects (especially with standalone components/libraries).
- Easier unit testing — a component's class can be tested independently of the DOM via TestBed.
- Clear, declarative composition (`<app-child>` reads like real HTML).

## 8. Disadvantages

- Overly granular components can lead to excessive `@Input()`/`@Output()` wiring ("prop drilling") for deep trees.
- Sibling/cross-tree communication requires extra architecture (shared services, state management) — not as simple as in some other frameworks.
- Standalone migration of a legacy NgModule-based app can require significant refactoring effort.

## 9. Interview Questions

**Beginner:**
1. What is a component in Angular, and what three things make it up? — *Decorator metadata, template, and class (logic); optionally styles.*
2. How do you pass data from a parent to a child component? — *`@Input()` decorator with property binding `[prop]="value"`.*

**Intermediate:**
3. What's the difference between `@Input()` and `@Output()`? — *`@Input()` receives data into a component from its parent; `@Output()` emits events from child to parent via `EventEmitter`.*
4. How do siblings communicate if they don't share a direct parent-child relationship? — *Through a shared injectable service exposing an `Observable`/`Subject`.*
5. What's the order of `ngOnChanges` vs `ngOnInit`? — *`ngOnChanges` fires first (and on every input change), `ngOnInit` fires once right after the first `ngOnChanges`.*

**Advanced:**
6. How do standalone components affect Angular's compilation and tree-shaking? — *Each standalone component declares its own dependencies directly, allowing the Ivy compiler to tree-shake unused imports per-component rather than per-module, often producing smaller bundles.*
7. How would you dynamically render a component whose type isn't known until runtime? — *Use `ViewContainerRef.createComponent()` with the component class (and `@Input`s set on the returned `ComponentRef.setInput()`), typically inside an `ng-container` or a dedicated host directive.*
8. What problems can arise from deeply nested `@Input`/`@Output` chains, and how do you fix them? — *"Prop drilling" makes refactors brittle and ties unrelated components together; fix with a shared state service, NgRx/signals-based store, or content projection to flatten the hierarchy.*

## 10. Best Practices

- Prefer standalone components for all new code (Angular's recommended default since v17).
- Keep components "dumb" where possible — push data-fetching/business logic into services.
- Use `OnPush` change detection for presentational components to reduce unnecessary checks.
- Always unsubscribe from manually-created subscriptions in `ngOnDestroy` (or use `async` pipe / `takeUntilDestroyed()`).
- Mark required inputs explicitly: `@Input({ required: true })`.

## 11. Common Mistakes

- Forgetting to unsubscribe from Observables in `ngOnDestroy`, causing memory leaks.
- Doing heavy logic inside templates (e.g., calling a method on every binding) instead of computed/cached values.
- Using `@Input`/`@Output` for state that's really shared across unrelated parts of the app instead of a service or store.
- Mutating an `@Input()` object directly inside the child (breaks the parent's data flow expectations and can cause subtle bugs with `OnPush`).

## 12. Comparison Tables

**Component vs Directive**

| Aspect | Component | Directive |
|---|---|---|
| Has a template? | Yes | No (attaches behavior to existing elements) |
| Decorator | `@Component` | `@Directive` |
| Use case | Renders UI | Modifies behavior/appearance of existing DOM |
| Example | `<app-user-card>` | `appHighlight`, `*ngIf` |

**Standalone Components vs NgModule-based Components**

| Aspect | Standalone | NgModule-based |
|---|---|---|
| Declares dependencies | Directly via `imports: []` on the component | Via a parent `NgModule`'s `declarations`/`imports` |
| Boilerplate | Less | More (need a module per feature) |
| Default since | Angular 17 (CLI scaffolds standalone by default) | Pre-v14 standard |
| Tree-shaking granularity | Per-component | Per-module |
