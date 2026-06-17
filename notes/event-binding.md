````md
# Event Binding in Angular

## 1. What is Event Binding?

Event Binding allows communication from the **View (HTML)** to the **Component (TypeScript)** when a user performs an action.

Examples:
- Click
- Input
- Change
- Submit
- Keyup

---

## 2. Why Use Event Binding?

- Handle user actions
- Update component data
- Execute methods
- Make UI interactive

---

## 3. Basic Syntax

```html
(event)="method()"
````

Example:

```html
<button (click)="save()">
  Save
</button>
```

---

## 4. Simple Click Example

### TypeScript

```ts
count = 0;

increment() {
  this.count++;
}
```

### HTML

```html
<button (click)="increment()">
  Increment
</button>

<p>{{ count }}</p>
```

Output:

```text
0 → 1 → 2 → 3 ...
```

---

## 5. Using $event

`$event` contains information about the event that occurred.

### HTML

```html
<button (click)="showEvent($event)">
  Click Me
</button>
```

### TypeScript

```ts
showEvent(event: Event) {
  console.log(event);
}
```

---

## 6. Input Event

### HTML

```html
<input
  type="text"
  (input)="updateUsername($any($event.target).value)"
/>
```

### TypeScript

```ts
username = '';

updateUsername(value: string) {
  this.username = value;
}
```

### Display

```html
<p>{{ username }}</p>
```

---

## 7. Event Binding with Signals

### TypeScript

```ts
import { signal } from '@angular/core';

username = signal('');
```

### HTML

```html
<input
  type="text"
  (input)="username.set($any($event.target).value)"
/>

<p>{{ username() }}</p>
```

### Output

```text
User types → Signal updates → UI updates automatically
```

---

## Interview Definition

Event Binding is a one-way data binding technique that transfers data from the View (HTML) to the Component (TypeScript) using events.

---

## Summary

```text
(click)="method()"

(input)="method($event)"

$event → Event Object

Signals:
(input)="signal.set(value)"

Event Binding = View → Component
```

```
```
