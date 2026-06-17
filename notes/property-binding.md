````md
# Property Binding in Angular

## What is Property Binding?

Property Binding allows you to bind data from a component (TypeScript) to an HTML element property.

It updates the DOM property dynamically whenever the component data changes.

---

## Why Use Property Binding?

- Pass data from Component → View
- Dynamically update UI
- Avoid hardcoded values
- Keep HTML and TypeScript connected

---

## Syntax

```html
[property]="value"
````

Example:

```html
<img [src]="imageUrl">
```

---

## Simple Example

### TypeScript

```ts
title = "Welcome to Angular";
```

### HTML

```html
<h2 [textContent]="title"></h2>
```

### Output

```text
Welcome to Angular
```

---

## Property Binding Example

### TypeScript

```ts
isDisabled = true;
```

### HTML

```html
<button [disabled]="isDisabled">
  Submit
</button>
```

If `isDisabled = true`, the button becomes disabled.

---

# Class Binding

Used to add or remove CSS classes dynamically.

### TypeScript

```ts
isActive = true;
```

### HTML

```html
<div [class.active]="isActive">
  Status
</div>
```

### CSS

```css
.active {
  background: rebeccapurple;
  color: white;
}
```

---

# Style Binding

Used to apply CSS styles dynamically.

### TypeScript

```ts
textColor = "red";
```

### HTML

```html
<h2 [style.color]="textColor">
  Angular
</h2>
```

Output:

```text
Angular (Red Color)
```

---

# Property Binding with Signals

### TypeScript

```ts
import { signal } from '@angular/core';

username = signal('Huzaifa');
```

### HTML

```html
<h2 [textContent]="username()"></h2>
```

Output:

```text
Huzaifa
```

### Update Signal

```ts
this.username.set('Abbas');
```

UI updates automatically.

---

# Interview Definition

Property Binding is a one-way data binding technique that transfers data from a component class to an HTML element property using square brackets `[]`.

---

# Summary

```text
Property Binding = [property]="value"

Class Binding    = [class.className]="condition"

Style Binding    = [style.property]="value"

Signals          = signal() + signal()
```

```
```
