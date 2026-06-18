# Forms

## 1. What is it?

**Definition:** Angular provides two form-building approaches — **Template-Driven Forms** (form logic mostly in the template, using directives like `ngModel`) and **Reactive Forms** (form logic explicitly defined in the component class using `FormGroup`/`FormControl` objects).

**Purpose:** To capture, validate, and manage user input in a structured, type-safe (Reactive) or quick-and-simple (Template-driven) way.

## 2. Why is it used?

- Every real app needs forms — login, registration, checkout, search, settings.
- Solves the problem of manually wiring `value`/`input` event listeners and validation logic for every field.
- Reactive Forms specifically solve the problem of testing form logic in isolation (no DOM needed) and handling complex, dynamic, or highly interdependent validation.

## 3. When should we use it?

- **Template-driven forms** — small, simple forms (a contact form, a single search box) where minimal logic is needed and most validation is static.
- **Reactive forms** — medium-to-large forms, dynamic forms (fields added/removed at runtime via `FormArray`), forms needing complex cross-field validation, or forms that must be unit-tested without rendering the DOM. Most production Angular apps default to Reactive Forms.

## 4. How does it work? (Internal workflow)

- **Template-driven:** `[(ngModel)]` creates an implicit `FormControl` behind the scenes for each bound input, all grouped automatically under an implicit `NgForm` directive on the `<form>` tag. Angular tracks value/validity via this hidden control tree, but the **source of truth lives in the template**.
- **Reactive:** You explicitly construct `FormControl`/`FormGroup`/`FormArray` instances in the component class. The template only *binds* to this pre-built tree via `formControlName`/`formGroup`/`formArrayName` — the **source of truth lives in the component**, making it synchronous, testable, and predictable.

## 5. Syntax & Complete Examples

### Template-Driven Forms

```typescript
// login.component.ts
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  onSubmit() {
    console.log(this.credentials);
  }
}
```

```html
<!-- login.component.html -->
<form #loginForm="ngForm" (ngSubmit)="onSubmit()">
  <input
    name="email"
    [(ngModel)]="credentials.email"
    required
    email
    #email="ngModel"
  />
  <div *ngIf="email.invalid && email.touched">Enter a valid email.</div>

  <input
    name="password"
    type="password"
    [(ngModel)]="credentials.password"
    required
    minlength="6"
  />

  <button type="submit" [disabled]="loginForm.invalid">Login</button>
</form>
```

### Reactive Forms

```typescript
// registration.component.ts
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phones: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(this.fb.control('', Validators.required));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
```

```html
<!-- registration.component.html -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="name" placeholder="Name" />
  <div *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
    Name is required (min 2 characters).
  </div>

  <input formControlName="email" placeholder="Email" />
  <input formControlName="password" type="password" placeholder="Password" />

  <div formArrayName="phones">
    <div *ngFor="let phone of phones.controls; let i = index">
      <input [formControlName]="i" placeholder="Phone {{ i + 1 }}" />
      <button type="button" (click)="removePhone(i)">Remove</button>
    </div>
  </div>
  <button type="button" (click)="addPhone()">Add phone</button>

  <button type="submit" [disabled]="form.invalid">Register</button>
</form>
```

### Custom Validators

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// synchronous custom validator
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasSpaces = (control.value || '').includes(' ');
    return hasSpaces ? { noSpaces: true } : null;
  };
}

// cross-field validator (e.g. password match), applied at the FormGroup level
export function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordsMismatch: true };
}

// usage
this.form = this.fb.group(
  {
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  },
  { validators: passwordsMatchValidator }
);
```

**Async custom validator (e.g., checking username availability via API):**

```typescript
export function uniqueUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) =>
    userService.checkUsername(control.value).pipe(
      map(isTaken => (isTaken ? { usernameTaken: true } : null))
    );
}
```

## 6. Example

Covered fully above — login (template-driven) and registration with dynamic phone fields (reactive).

## 7. Advantages

| Template-Driven | Reactive |
|---|---|
| Less boilerplate for simple forms | Fully synchronous, testable without DOM |
| Familiar, HTML-centric | Strong typing (with `FormGroup<T>` typed forms) |
| Quick to prototype | Scales well to complex/dynamic forms (`FormArray`) |

## 8. Disadvantages

| Template-Driven | Reactive |
|---|---|
| Harder to unit test (needs `TestBed`/DOM) | More boilerplate for simple forms |
| Async by nature (change detection-driven), harder to reason about complex validation timing | Steeper learning curve for beginners |
| Doesn't scale well to deeply dynamic forms | Requires explicit value/structure sync between class and template |

## 9. Interview Questions

**Beginner:**
1. What's the main difference between Template-driven and Reactive forms? — *Template-driven forms keep the source of truth in the template via `ngModel`; Reactive forms build the form model explicitly in the component class using `FormGroup`/`FormControl`.*
2. What does `Validators.required` do? — *Marks a control invalid if its value is empty/null.*

**Intermediate:**
3. What is `FormArray` used for? — *Managing a dynamic, variable-length list of `FormControl`/`FormGroup` instances (e.g., adding/removing phone numbers or addresses at runtime).*
4. How do you implement a cross-field validator (e.g., confirm-password matching)? — *Attach a custom validator function to the parent `FormGroup` (not an individual control), since it needs access to multiple sibling controls' values.*

**Advanced:**
5. How would you implement an async validator that checks username availability against an API, and what should you watch out for? — *Implement `AsyncValidatorFn` returning an `Observable<ValidationErrors | null>` (e.g. mapping an API response); watch out for firing an API call on every keystroke — combine with `debounceTime`/`distinctUntilChanged` upstream, and Angular automatically marks the control `PENDING` until the observable resolves.*
6. What are typed Reactive Forms (`FormGroup<T>`) and why were they introduced? — *Since Angular 14, `FormBuilder`/`FormGroup` can be strongly typed so `form.value` and `form.get('x')` are type-checked at compile time, preventing typos and type mismatches that the untyped API allowed silently.*

## 10. Best Practices

- Default to Reactive Forms for anything beyond a trivial form — better testability and scalability.
- Use `FormBuilder` to reduce boilerplate when constructing `FormGroup`s.
- Use typed forms (`FormGroup<T>`) for compile-time safety.
- Debounce async validators that hit an API.
- Use `markAllAsTouched()` on submit to reveal validation errors for untouched fields.

## 11. Common Mistakes

- Mixing `ngModel` and `formControlName` on the same form — Angular will throw an error; pick one approach per form.
- Forgetting to import `ReactiveFormsModule`/`FormsModule` in a standalone component's `imports`.
- Not unsubscribing from `form.valueChanges`/`statusChanges` subscriptions, causing memory leaks.
- Attaching a cross-field validator to a child control instead of the parent `FormGroup`, where it can't see sibling values.

## 12. Comparison Table: Template-Driven vs Reactive Forms

| Aspect | Template-Driven | Reactive |
|---|---|---|
| Source of truth | Template (`ngModel`) | Component class (`FormGroup`) |
| Setup style | Implicit, directive-based | Explicit, code-based |
| Scalability | Good for simple forms | Good for simple and complex/dynamic forms |
| Testability | Requires DOM/TestBed | Fully testable without DOM |
| Type safety | Limited | Strong (with typed forms) |
| Best for | Quick prototypes, simple forms | Production apps, dynamic/complex forms |
