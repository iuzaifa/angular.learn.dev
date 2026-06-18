# Dependency Injection (DI)

## 1. What is it?

**Definition:** Dependency Injection is a design pattern (built into Angular's core) where a class declares its dependencies (typically services) via its constructor, and the framework's **injector** supplies (injects) instances of those dependencies at runtime, rather than the class creating them itself.

**Purpose:** To decouple classes from the concrete creation of their dependencies, making code more modular, reusable, and testable (dependencies can be swapped/mocked easily).

## 2. Why is it used?

- Avoids `new ServiceClass()` scattered throughout the app — centralizes how/when objects are created.
- Enables easy unit testing — inject mock services instead of real ones in `TestBed`.
- Solves the problem of managing shared state/logic (e.g., auth status, HTTP client config) consistently across many unrelated components.

## 3. When should we use it?

- Any cross-cutting concern: HTTP communication, authentication state, logging, caching, form validation logic shared across multiple components.
- Singleton services (e.g., a `CartService` that must be the same instance across the whole app) — provide them `providedIn: 'root'`.
- Scoped/feature-specific services that should get a fresh instance per route/component subtree — provide them in a specific component's or route's `providers` array.

## 4. How does it work? (Internal workflow)

1. Angular builds a hierarchical tree of **injectors**: a root (platform) injector, module injectors, and per-component injectors.
2. When a class requests a dependency (via constructor parameter or `inject()` function), Angular's injector looks up the requested **token** (usually the class itself, or an `InjectionToken`).
3. The injector walks up the injector tree from the requesting component until it finds a **provider** registered for that token (or throws `NullInjectorError` if none found).
4. Once resolved, the instance is cached per injector scope — so the same injector returns the same instance on subsequent requests (singleton-per-injector behavior).

## 5. Syntax

**Basic — injectable service:**

```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) // singleton, app-wide
export class CartService {
  private items: string[] = [];
  add(item: string) { this.items.push(item); }
}
```

**Constructor injection:**

```typescript
@Component({ selector: 'app-cart', standalone: true, template: `...` })
export class CartComponent {
  constructor(private cartService: CartService) {}
}
```

**Modern `inject()` function (works outside constructors too, e.g. in functional guards):**

```typescript
import { inject } from '@angular/core';

export class CartComponent {
  private cartService = inject(CartService);
}
```

**Advanced — Injection Tokens (for non-class dependencies, e.g. config values):**

```typescript
import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

// providing it (e.g., in app.config.ts)
providers: [
  { provide: API_BASE_URL, useValue: 'https://api.example.com' }
]

// consuming it
export class ApiService {
  private baseUrl = inject(API_BASE_URL);
}
```

**Advanced — scoped providers (component-level, fresh instance per component tree):**

```typescript
@Component({
  selector: 'app-feature',
  standalone: true,
  providers: [FeatureScopedService], // new instance for this component subtree
  template: `...`
})
export class FeatureComponent {}
```

## 6. Example

**Simple example:** Injecting `HttpClient` into a service:

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers() { return this.http.get<User[]>('/api/users'); }
}
```

**Real-world example:** Multi-environment API configuration using an `InjectionToken`, so the same `ApiService` code works against different base URLs in dev/staging/production without modification — just swap the provider value per environment config.

## 7. Advantages

- Promotes loose coupling — classes depend on abstractions/tokens, not concrete implementations.
- Drastically simplifies unit testing (swap real services for mocks/stubs in `TestBed.configureTestingModule`).
- Hierarchical injection allows fine-grained control over instance scope (app-wide singleton vs. per-feature vs. per-component).

## 8. Disadvantages

- Can be confusing for beginners — implicit "magic" of where an instance actually comes from in a complex injector hierarchy.
- Overusing component-level `providers` for what should be app-wide singletons can lead to unexpected multiple instances and inconsistent state.
- Circular dependencies between services throw runtime errors that can be tricky to debug.

## 9. Interview Questions

**Beginner:**
1. What is Dependency Injection? — *A pattern where a class's dependencies are provided by an external injector rather than created internally by the class itself.*
2. What does `providedIn: 'root'` do? — *Registers the service with the application's root injector, making it a singleton available everywhere without needing to list it in a `providers` array.*

**Intermediate:**
3. What's the difference between providing a service in `root` vs. in a component's `providers` array? — *`root` gives one app-wide singleton instance; a component-level provider creates a new instance scoped to that component and its children, useful for per-feature isolated state.*
4. Why would you use an `InjectionToken` instead of a class for DI? — *For non-class values (strings, config objects, interfaces with no runtime representation) that can't be used as a DI token by themselves — `InjectionToken` gives them a unique, type-safe identity for the injector.*

**Advanced:**
5. How does Angular's hierarchical injector resolve a dependency, and what happens if it's not found? — *It searches the requesting injector, then walks up the parent injector chain (component → module → platform/root); if no provider is found anywhere in the chain, it throws a `NullInjectorError`.*
6. How would you provide different implementations of the same service token for testing vs. production? — *Use `{ provide: AbstractToken, useClass: MockService }` in the testing module's `providers`, overriding the production `{ provide: AbstractToken, useClass: RealService }` — common via `TestBed.overrideProvider()`.*

## 10. Best Practices

- Default to `providedIn: 'root'` for true app-wide singletons.
- Use `InjectionToken` for configuration values/interfaces, not classes pretending to be tokens.
- Prefer constructor injection (or `inject()`) over manually instantiating dependencies — even in utility/helper classes that need Angular services.
- Keep services focused (single responsibility) — split a bloated "god service" into smaller, composable ones.

## 11. Common Mistakes

- Re-providing a service at the component level "just in case," accidentally creating multiple instances and losing shared state.
- Forgetting to provide an `InjectionToken`'s value anywhere, causing a `NullInjectorError` at runtime.
- Creating circular dependencies between two services that inject each other directly.

## 12. Comparison Table: Provider Scopes

| Scope | Declaration | Instance lifetime |
|---|---|---|
| Root/app-wide singleton | `@Injectable({ providedIn: 'root' })` | One instance for the whole app |
| Module-level | Listed in an `NgModule`'s `providers` | One instance per module load (legacy pattern) |
| Component-level | Listed in a component's `providers` | New instance per instantiation of that component subtree |
| Route-level | Listed in a route's `providers` (standalone routing) | New instance per matched route activation |
