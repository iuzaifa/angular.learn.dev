# TypeScript for Angular

Angular is built with and for TypeScript. These are the language features used constantly in real Angular codebases.

## Variables & Data Types

```typescript
let count: number = 5;
const name: string = "Abu";
let isActive: boolean = true;
let tags: string[] = ["a", "b"];
let user: { id: number; name: string };
let anything: any; // avoid in production code
let value: unknown; // safer alternative to any
```

## Interfaces

**Definition:** A compile-time-only contract describing the shape of an object. Erased at runtime — zero JS output cost.

```typescript
interface User {
  id: number;
  name: string;
  email?: string; // optional property
}

const u: User = { id: 1, name: "Abu" };
```

## Classes

```typescript
class Person {
  constructor(private id: number, public name: string) {}

  greet(): string {
    return `Hello, ${this.name}`;
  }
}
```

## Enums

```typescript
enum Role {
  Admin = "ADMIN",
  User = "USER",
}

const r: Role = Role.Admin;
```

## Generics

**Purpose:** Write reusable, type-safe functions/classes that work across multiple types without losing type information.

```typescript
function identity<T>(value: T): T {
  return value;
}

class ApiResponse<T> {
  constructor(public data: T, public status: number) {}
}

const res = new ApiResponse<User>({ id: 1, name: "Abu" }, 200);
```

## Access Modifiers

| Modifier | Visibility |
|---|---|
| `public` (default) | Accessible everywhere |
| `private` | Only within the declaring class |
| `protected` | Declaring class + subclasses |
| `readonly` | Assignable once (constructor or declaration) |

## Decorators

**Definition:** Special functions prefixed with `@` that attach metadata to classes, properties, or methods. Angular's entire API surface (`@Component`, `@Injectable`, `@Input`, `@Output`) is built on decorators.

```typescript
@Component({
  selector: "app-user",
  template: `<p>{{ name }}</p>`,
})
export class UserComponent {
  @Input() name!: string;
  @Output() selected = new EventEmitter<void>();
}
```

## Optional Chaining (`?.`)

```typescript
const city = user?.address?.city; // undefined instead of throwing if address is null/undefined
```

## Nullish Coalescing (`??`)

```typescript
const displayName = user.name ?? "Guest"; // only falls back on null/undefined, not on "" or 0
```

## Type Assertions

```typescript
const input = document.getElementById("email") as HTMLInputElement;
// or
const input = <HTMLInputElement>document.getElementById("email");
```

## Comparison Table: `interface` vs `type`

| Aspect | `interface` | `type` |
|---|---|---|
| Extending | `extends` keyword, supports declaration merging | Intersection (`&`) |
| Unions | Not directly supported | Supported natively |
| Use in Angular | Preferred for object shapes/DTOs | Preferred for unions, tuples, mapped types |

## Best Practices

- Avoid `any`; prefer `unknown` and narrow with type guards.
- Use `interface` for DTOs/API response shapes consumed across the app.
- Enable `strict: true` in `tsconfig.json` for real type safety.

## Common Mistakes

- Using `any` to "make the error go away" instead of fixing the type.
- Forgetting `!` (definite assignment) or proper initialization for `@Input()` properties, causing `undefined` errors.
- Confusing `??` with `||` — `||` also triggers on `0`, `""`, and `false`, which is often wrong for defaults.

## Quick Interview Q&A

**Q1 (Beginner): What's the difference between `??` and `||`?**
A: `??` only falls back when the left side is `null` or `undefined`; `||` falls back on any falsy value, including `0`, `""`, and `false`.

**Q2 (Intermediate): Why are decorators important in Angular?**
A: They attach the metadata Angular's compiler needs to understand a class's role (component, service, injectable, input/output binding) — without them, Angular wouldn't know how to wire dependency injection or templates.

**Q3 (Advanced): How do generics improve type safety in a typical Angular service?**
A: A generic API service method like `get<T>(url: string): Observable<T>` lets each call site specify the expected response shape, so consumers get compile-time-checked data instead of `any`, catching shape mismatches before runtime.
