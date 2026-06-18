# Angular CLI

## What is Angular CLI?

**Definition:** The Angular CLI (`@angular/cli`) is the official command-line tool for creating, developing, testing, building, and deploying Angular applications.

**Purpose:** Removes manual config/boilerplate work — scaffolds files with the right structure, wires up build tooling (esbuild/Vite for new projects), and enforces consistent project conventions across teams.

## Why is it used?

- Eliminates manual webpack/build configuration.
- Generates boilerplate for components, services, modules, etc. with correct imports.
- Bundled testing, linting, and production-build optimization out of the box.
- Used in virtually every real-world Angular project — a non-negotiable interview topic.

## Common CLI Commands

| Purpose | Command |
|---|---|
| Create a project | `ng new project-name` |
| Run dev server | `ng serve` |
| Run on custom port | `ng serve --port 4201` |
| Build (dev) | `ng build` |
| Build (production) | `ng build --configuration production` |
| Generate component | `ng generate component name` / `ng g c name` |
| Generate service | `ng g s name` |
| Generate module | `ng g m name` |
| Generate directive | `ng g d name` |
| Generate pipe | `ng g p name` |
| Generate guard | `ng g guard name` |
| Generate interface | `ng g interface name` |
| Generate class | `ng g class name` |
| Generate enum | `ng g enum name` |
| Generate environment files | `ng generate environments` |
| Run unit tests | `ng test` |
| Run e2e tests | `ng e2e` |
| Lint | `ng lint` |
| Update Angular/deps | `ng update` |
| Check CLI/Angular version | `ng version` |
| Add a package (with schematics) | `ng add package-name` |
| Create a library | `ng generate library library-name` |
| Build a library | `ng build library-name` |

## When should we use it?

- Always, for project creation and scaffolding — manual file creation is error-prone and inconsistent.
- `ng add` specifically when adding Angular-aware packages (Angular Material, NgRx, PWA support) since it also runs setup schematics, not just `npm install`.

## Best Practices

- Use `ng generate --dry-run` to preview generated files before committing.
- Commit `angular.json` changes deliberately — review diffs when CLI updates touch build config.
- Use `--skip-tests` only for throwaway prototypes, not production code.
- Prefer `ng update` over manual `package.json` edits for Angular core packages — it runs migration schematics automatically.

## Common Mistakes

- Manually editing generated boilerplate structure instead of using `--flat`, `--skip-import`, etc. flags to control output.
- Forgetting `--configuration production` and shipping an unoptimized dev build.
- Running `ng update` packages out of order (Angular recommends updating one major version at a time).

## Quick Interview Q&A

**Q1 (Beginner): What does `ng serve` do differently from `ng build`?**
A: `ng serve` compiles in memory and serves the app with live-reload for development; `ng build` writes optimized output files to disk for deployment.

**Q2 (Beginner): What's the shorthand for generating a component?**
A: `ng g c component-name`.

**Q3 (Intermediate): What's the difference between `ng add` and `npm install`?**
A: `npm install` only fetches the package; `ng add` installs it and runs its Angular schematic to wire up configuration automatically (e.g., adding imports, updating `angular.json`).

**Q4 (Intermediate): How do you generate a library inside an Angular workspace?**
A: `ng generate library library-name`, which scaffolds a publishable, independently buildable package within the same workspace.

**Q5 (Advanced): What happens internally when you run `ng build --configuration production`?**
A: The CLI invokes the configured builder (esbuild-based in modern Angular), performs AOT compilation, tree-shaking, minification, dead-code elimination, and bundle-budget checks, then writes hashed output files for cache-busting.
