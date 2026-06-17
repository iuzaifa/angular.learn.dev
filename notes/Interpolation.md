### What is Interpolation?

In Angular, **Interpolation** is a way to pass data from your TypeScript code (the logic side) to your HTML template (the visual side). It allows you to display dynamic text on your web page.

Angular uses **Double Curly Braces `{{ }}**`—often called the **"Mustache Syntax"**—to identify interpolation.

---

### Code Example

#### 1. TypeScript Logic (`app.component.ts`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  projectName: string = 'Angular Learning';
  userCartCount: number = 3;
  currentUser: string = 'huzaifa';

  getGreeting(): string {
    return 'Welcome back';
  }
}

```

#### 2. HTML Template (`app.component.html`)

```html
<!-- 1. Displaying a simple string variable -->
<h1>Project: {{ projectName }}</h1>

<!-- 2. Displaying a string and calling a TypeScript function -->
<p>{{ getGreeting() }}, {{ currentUser }}!</p>

<!-- 3. Doing a basic mathematical calculation on the fly -->
<p>Items in your cart next round: {{ userCartCount + 1 }}</p>

<!-- 4. Using a standard JavaScript string method -->
<p>Username in Uppercase: {{ currentUser.toUpperCase() }}</p>

```s