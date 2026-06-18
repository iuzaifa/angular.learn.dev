# Angular Fundamentals

## 1. What is Angular?

**Definition:** Angular is an open-source, TypeScript-based front-end framework maintained by Google, used for building single-page applications (SPAs) with a component-based architecture.

**Purpose:** Provides a complete, opinionated platform — routing, forms, HTTP client, dependency injection, testing utilities — so teams don't have to assemble these from separate libraries.

## 2. Features of Angular

| Feature | What it gives you |
|---|---|
| Component-based architecture | Reusable, encapsulated UI building blocks |
| Two-way data binding | UI and model stay in sync automatically |
| Dependency Injection (DI) | Loosely coupled, testable services |
| RxJS integration | First-class reactive/async data handling |
| Angular CLI | Scaffolding, build, test, lint in one tool |
| Ahead-of-Time (AOT) compilation | Faster rendering, smaller runtime errors |
| Signals (v16+) | Fine-grained reactivity without Zone.js overhead |
| Standalone Components (v14+/v17 default) | No NgModules required |
| Built-in security | Auto-sanitization against XSS |

## 3. Angular Architecture

Angular apps are built from these core building blocks:

- **Modules (NgModule)** — group related components/services (optional since standalone components became default).
- **Components** — control a portion of the UI (template + class + styles).
- **Templates** — HTML with Angular syntax (binding, directives).
- **Services** — reusable business logic/data-access, injected via DI.
- **Directives** — modify DOM behavior/appearance.
- **Pipes** — transform data for display.
- **Router** — maps URLs to components.

Data flow: **Browser event → Component → Service (if needed) → Change Detection → DOM update.**

## 4. Angular Folder Structure (typical CLI-generated project)

```
my-app/
├── src/
│   ├── app/
│   │   ├── core/            # singleton services, guards, interceptors
│   │   ├── shared/           # reusable components, pipes, directives
│   │   ├── features/         # feature modules/components (lazy-loaded)
│   │   ├── app.component.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

## 5. Angular Project Structure (conceptual layering)

- **Core layer** — app-wide singletons (auth service, interceptors, guards).
- **Shared layer** — dumb/presentational components, common pipes/directives used everywhere.
- **Feature layer** — domain-specific modules (e.g., `orders`, `users`), ideally lazy-loaded.

This layering keeps bundles small (via lazy loading) and prevents circular dependencies.

## 6. Angular Compilation Process: JIT vs AOT

| Aspect | JIT (Just-in-Time) | AOT (Ahead-of-Time) |
|---|---|---|
| When compiled | In the browser, at runtime | At build time, on the server/CI |
| Bundle size | Larger (ships compiler) | Smaller (no compiler shipped) |
| Startup performance | Slower | Faster |
| Template error detection | At runtime | At build time |
| Default in production builds | No | Yes |

**How AOT works internally:** the Angular compiler reads components/templates → generates JavaScript instruction sets (Ivy instructions) → produces optimized, tree-shakeable output → bundler (esbuild/webpack) packages it.

## 7. Angular Rendering Process

1. `main.ts` bootstraps the root component via `bootstrapApplication()` (standalone) or `platformBrowserDynamic().bootstrapModule()` (NgModule-based).
2. Angular builds the component tree starting from the root.
3. Change detection runs (Zone.js-based or signal-based) to check for state changes.
4. Templates are compiled into render functions (Ivy) that directly manipulate the DOM.
5. On data change, only affected DOM nodes are updated (incremental DOM patching, not full re-render).

## Best Practices

- Use standalone components for new projects (default since Angular 17+).
- Keep `core`/`shared`/`feature` separation to enable lazy loading.
- Always run production builds with AOT (`ng build` defaults to AOT + production optimizations).

## Common Mistakes

- Putting all components in one flat folder — hurts scalability.
- Mixing business logic into components instead of services — hurts testability.
- Not enabling lazy loading for feature areas, bloating the initial bundle.

## Quick Interview Q&A

**Q1 (Beginner): What is Angular and how is it different from AngularJS?**
A: Angular is a complete rewrite of AngularJS using TypeScript and a component-based architecture, with better performance, mobile support, and a different change-detection model.

**Q2 (Beginner): What are the building blocks of an Angular application?**
A: Modules, components, templates, services, directives, pipes, and the router.

**Q3 (Intermediate): What's the difference between JIT and AOT compilation?**
A: JIT compiles templates in the browser at runtime; AOT compiles them at build time, producing smaller bundles and faster startup, and catching template errors during the build.

**Q4 (Intermediate): Why does Angular recommend a core/shared/feature folder structure?**
A: It separates singleton app-wide services (core), reusable dumb components (shared), and domain logic (feature), enabling lazy loading and avoiding circular dependencies.

**Q5 (Advanced): How does Ivy change Angular's compilation and rendering model compared to the older View Engine?**
A: Ivy generates more localized, tree-shakeable instructions per component (instead of large monolithic bundles), enabling smaller bundles, faster compilation, and easier debugging, while also being the foundation for features like standalone components and improved AOT.
