# Routing

## 1. What is it?

**Definition:** The Angular Router is a built-in module that maps URL paths to components, enabling navigation between different views in a single-page application without full page reloads.

**Purpose:** To give SPAs the URL-driven navigation, deep-linking, and browser history behavior users expect from multi-page websites, while keeping the app a single page load.

## 2. Why is it used?

- Enables bookmarkable, shareable URLs for different app states/views.
- Supports browser back/forward navigation naturally.
- Solves the problem of organizing large apps into independently loadable, navigable sections (with lazy loading for performance).
- Enables access control via guards (e.g., redirect unauthenticated users to login).

## 3. When should we use it?

- Any app with more than one "page"/view — dashboards, e-commerce, admin panels, content sites.
- **Lazy loading** specifically when a feature area is large and not needed on initial load (e.g., an admin section most users never visit).
- **Guards** when certain routes require authentication/authorization or need to block navigation away from unsaved forms.
- **Resolvers** when a component needs data to be ready *before* the route activates (avoiding loading spinners inside the component itself).

## 4. How does it work? (Internal workflow)

1. The router matches the current URL against the configured route table (array of `Route` objects), in order, top to bottom.
2. For a matched route, it runs any configured **guards** (`canActivate`, `canDeactivate`, etc.) — if any returns `false`/a redirect `UrlTree`, navigation is cancelled/redirected.
3. It runs any **resolvers** to pre-fetch data, waiting for them to complete before activating the route.
4. It loads the component (lazily, if `loadComponent`/`loadChildren` is used — a separate JS chunk is fetched).
5. The component is instantiated and inserted into the matching `<router-outlet>`.

## 5. Syntax

**Basic route configuration (standalone, modern Angular):**

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '**', component: NotFoundComponent }, // wildcard, must be last
];
```

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
```

```html
<!-- app.component.html -->
<router-outlet></router-outlet>
```

**Child routes:**

```typescript
{
  path: 'settings',
  component: SettingsComponent,
  children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'security', component: SecurityComponent },
  ]
}
```

**Lazy loading (standalone):**

```typescript
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
}
// or a single lazy component:
{ path: 'reports', loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent) }
```

**Route guards (functional, modern Angular):**

```typescript
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.createUrlTree(['/login']);
};

// usage
{ path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
```

**Resolver (functional):**

```typescript
import { ResolveFn } from '@angular/router';

export const userResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  return userService.getUser(route.paramMap.get('id')!);
};

// usage
{ path: 'users/:id', component: UserDetailComponent, resolve: { user: userResolver } }
```

```typescript
// consuming resolved data in the component
constructor(private route: ActivatedRoute) {
  this.route.data.subscribe(({ user }) => this.user = user);
}
```

**Route parameters & query parameters:**

```typescript
// reading a route param (e.g. /users/42)
this.route.paramMap.subscribe(params => this.userId = params.get('id'));

// reading query params (e.g. /products?category=shoes&sort=price)
this.route.queryParamMap.subscribe(params => this.category = params.get('category'));

// navigating with both
this.router.navigate(['/users', 42], { queryParams: { tab: 'orders' } });
```

## 6. Example

**Simple example:** Navigating to a user detail page via `routerLink`:

```html
<a [routerLink]="['/users', user.id]">{{ user.name }}</a>
```

**Real-world example:** An e-commerce admin panel where `/admin` is lazy-loaded (`loadChildren`) only for admin users, protected by `authGuard` + a `roleGuard`, and `/admin/products/:id` uses a resolver to pre-fetch the product so the edit form renders with data already populated instead of showing a loading spinner inside the component.

## 7. Advantages

- Declarative, centralized navigation configuration.
- Lazy loading dramatically reduces initial bundle size for large apps.
- Guards/resolvers centralize cross-cutting navigation concerns (auth, data pre-fetch) instead of duplicating checks inside every component.

## 8. Disadvantages

- Route configuration can become complex/deeply nested in large apps.
- Resolvers can delay navigation if the underlying API call is slow (user sees nothing until it resolves, unless handled carefully).
- Guard logic split across many small functions can be harder to trace without good naming/documentation.

## 9. Interview Questions

**Beginner:**
1. What is `<router-outlet>`? — *A placeholder directive where the router renders the component matching the currently active route.*
2. How do you define a wildcard/404 route? — *`{ path: '**', component: NotFoundComponent }`, placed last in the routes array since the router matches top-to-bottom.*

**Intermediate:**
3. What's the difference between route parameters and query parameters? — *Route params (`:id`) are part of the URL path and typically identify a resource; query params (`?key=value`) are optional, named, and typically used for filters/sorting/pagination.*
4. How does lazy loading improve performance? — *It splits a feature's code into a separate bundle/chunk that's only downloaded when the user navigates to that route, reducing the initial bundle size and time-to-interactive.*

**Advanced:**
5. How would you prevent a user from leaving a route with unsaved form changes? — *Implement a `canDeactivate` guard that checks the form's dirty state and, if dirty, prompts the user for confirmation before allowing navigation away.*
6. What's the execution order of guards and resolvers, and why does it matter? — *`canActivate`/`canActivateChild` guards run first (can block/redirect entirely); only if they pass do resolvers run to fetch data; only after resolvers complete does the component actually instantiate — this ordering ensures unauthorized users never trigger unnecessary data fetches.*

## 10. Best Practices

- Use functional guards/resolvers (`CanActivateFn`, `ResolveFn`) — the modern, simpler API over class-based guards.
- Lazy-load every feature module/route that isn't needed on initial load.
- Keep the wildcard (`**`) route last, and redirect logic explicit (`redirectTo`) rather than relying on fallthrough behavior.
- Use `paramMap`/`queryParamMap` (Observable) over snapshot-only access when a component might stay alive across param changes (e.g., navigating between `/users/1` and `/users/2` without destroying the component).

## 11. Common Mistakes

- Reading route params via `route.snapshot.paramMap` only, missing updates when navigating between sibling routes that reuse the same component instance.
- Forgetting `provideRouter(routes)` in `app.config.ts` (standalone apps), causing routing to silently not work.
- Placing the wildcard route before other specific routes, causing it to swallow all navigation.
- Not handling resolver errors — an unhandled rejected resolver can leave navigation stuck.

## 12. Comparison Table: Guard Types

| Guard | Purpose |
|---|---|
| `canActivate` | Controls whether a route can be entered |
| `canActivateChild` | Controls whether child routes of a route can be entered |
| `canDeactivate` | Controls whether the user can navigate away from the current route |
| `canMatch` | Controls whether a route config is even considered a match (useful for feature-flagging entire route trees) |
| `resolve` | Not a guard, but runs alongside them to pre-fetch data before activation |
