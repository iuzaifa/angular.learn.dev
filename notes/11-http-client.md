# HTTP Client

## 1. What is it?

**Definition:** `HttpClient` (from `@angular/common/http`) is Angular's built-in service for making HTTP requests, returning `Observable`s for every call, with built-in support for interceptors, typed responses, and testing utilities.

**Purpose:** To provide a consistent, testable, Observable-based way to communicate with backend APIs, with cross-cutting concerns (auth headers, error handling, logging) centralized via interceptors instead of repeated per-call.

## 2. Why is it used?

- Nearly every real app needs to talk to a backend (REST APIs, GraphQL endpoints, etc.).
- Solves the problem of repeating boilerplate (headers, error handling, auth tokens) on every single request by centralizing it in interceptors.
- Observable-based API integrates naturally with RxJS operators for retries, cancellation, combining multiple calls, etc.

## 3. When should we use it?

- Any CRUD interaction with a backend service — fetching lists, submitting forms, updating/deleting records.
- **Interceptors** when you need consistent behavior across all/many requests: attaching JWT tokens, global error handling, loading indicators, logging.
- **Resolvers + HttpClient** combo when data must be ready before a route activates (see Routing notes).

## 4. How does it work? (Internal workflow)

1. Calling `http.get/post/put/patch/delete()` returns a **cold Observable** — the actual HTTP request is not sent until something subscribes to it.
2. The request passes through the configured **interceptor chain** (each interceptor can modify the request, the response, or short-circuit with an error) before reaching the network.
3. On response, the same interceptor chain runs in reverse on the way back, then the Observable emits the (typed) response and completes.
4. If nobody subscribes (e.g., `async` pipe, `.subscribe()`), the request **never fires** — a common gotcha for beginners.

## 5. Syntax

**Setup (standalone apps):**

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))]
};
```

**GET / POST / PUT / PATCH / DELETE:**

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private base = '/api/users';
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.base);
  }

  getOne(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }

  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.base, user);
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.base}/${id}`, user);
  }

  patch(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.base}/${id}`, changes);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
```

**Functional interceptor (modern Angular):**

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(cloned);
};
```

**Error handling interceptor:**

```typescript
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
```

**Authentication flow (JWT, end-to-end):**

```typescript
// login → store token → attach token on every request → handle 401 by redirecting
login(credentials: Credentials) {
  return this.http.post<{ token: string }>('/api/auth/login', credentials).pipe(
    tap(res => localStorage.setItem('token', res.token))
  );
}
```

## 6. Example

**Simple example:** Fetching and displaying a user list with the `async` pipe (no manual subscribe needed):

```html
<li *ngFor="let user of (userService.getAll() | async)">{{ user.name }}</li>
```

**Real-world example:** A dashboard that calls `getAll()` on init, shows a loading spinner via a `loading$` BehaviorSubject toggled in `tap()`/`finalize()`, and surfaces errors via a shared `errorInterceptor` that triggers a toast notification — so individual components never need their own try/catch for HTTP errors.

## 7. Advantages

- Observable-based — composes naturally with RxJS for retries, cancellation (`takeUntil`), combining calls (`forkJoin`), and more.
- Interceptors centralize cross-cutting concerns instead of duplicating logic per call.
- Strongly typed responses (`http.get<User[]>(...)`) catch shape mismatches early.
- Built-in testing utilities (`HttpClientTestingModule`/`provideHttpClientTesting()`) make mocking API calls in unit tests straightforward.

## 8. Disadvantages

- Cold Observable semantics can trip up beginners (forgetting to subscribe = request never sent).
- Interceptor chains can become hard to trace/debug when many are stacked.
- Manual error handling still needs per-feature nuance (a global interceptor can't always know the "right" UX response for every error).

## 9. Interview Questions

**Beginner:**
1. Why does `HttpClient` return an `Observable` instead of a `Promise`? — *Observables are cancellable, composable with RxJS operators (retry, combine, transform), and support multiple emissions — useful for things like polling, which a one-shot Promise can't do natively.*
2. What happens if you call `http.get()` but never subscribe? — *Nothing — the request is never actually sent, since `HttpClient` Observables are cold/lazy.*

**Intermediate:**
3. What is an HTTP interceptor used for? — *Intercepting outgoing requests/incoming responses to apply cross-cutting logic like attaching auth headers, logging, or global error handling, without modifying every individual service call.*
4. How would you handle a global 401 Unauthorized response? — *In an error interceptor, check `error.status === 401`, then clear stored credentials and redirect to the login route.*

**Advanced:**
5. How would you implement automatic token refresh when a request fails with 401 due to an expired JWT? — *In the error interceptor, catch the 401, call a refresh-token endpoint, then retry the original request with the new token (often using `switchMap`), while guarding against multiple simultaneous refresh calls (e.g., with a shared `BehaviorSubject` flag).*
6. How do you cancel an in-flight HTTP request in Angular? — *Since `HttpClient` returns Observables, simply unsubscribing cancels the underlying XHR/fetch request — commonly done via `takeUntil(destroy$)` or by switching to a new request with `switchMap`, which auto-unsubscribes the previous one.*

## 10. Best Practices

- Centralize auth/error/logging logic in interceptors rather than duplicating it in every service.
- Always type your HTTP calls (`http.get<T>()`).
- Use `forkJoin` for parallel independent calls and `switchMap` for dependent sequential calls.
- Clean up subscriptions (or use the `async` pipe) to avoid leaking HTTP subscriptions.

## 11. Common Mistakes

- Forgetting to subscribe and assuming the request fired.
- Putting auth-token logic inside every individual service instead of a shared interceptor.
- Not handling `HttpErrorResponse` distinctly from successful responses, causing unhandled promise/observable rejections.
- Triggering duplicate/racing requests on fast user typing (e.g. search-as-you-type) without `debounceTime`/`switchMap`.

## 12. Comparison Table: PUT vs PATCH vs POST

| Method | Purpose | Idempotent? |
|---|---|---|
| `POST` | Create a new resource | No |
| `PUT` | Replace an entire resource | Yes |
| `PATCH` | Partially update a resource | Generally yes (depends on backend) |
| `DELETE` | Remove a resource | Yes |
