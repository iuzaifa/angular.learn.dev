```markdown
# Angular Component - Quick Notes

## 🔹 What is a Component?
A **Component** is the basic building block of Angular that controls a part of the UI using **HTML + CSS + TypeScript**.

Examples: Navbar, Login Form, Dashboard, Footer

---

## 🔹 Why Use Components?
- Reusable
- Maintainable
- Organized
- Testable

---

## 🔹 How to Create
```bash
ng g c user
```

Generated Files:
- user.component.ts  
- user.component.html  
- user.component.css  
- user.component.spec.ts  

Usage:
```html
<app-user></app-user>
```

---

## 🔹 How to Manage
- Data Binding → `{{name}}`, `[src]`, `(click)`  
- Parent → Child → `@Input()`  
- Child → Parent → `@Output()`  
- Lifecycle Hooks → `ngOnInit()`

---

## 🔹 Example
**user.component.ts**
```ts
export class UserComponent {
  name = "Huzaifa";
}
```

**user.component.html**
```html
<h2>{{name}}</h2>
```

Output:
```
Huzaifa
```

---

## 🔹 Standalone vs Module-Based

### Standalone Component
```ts
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {}
```
- Declared with `standalone: true`
- Imports handled inside component
- No `NgModule` required
- Best for **new Angular apps (v14+)**

---

### Module-Based Component
```ts
@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule],
  exports: [UserComponent]
})
export class UserModule {}
```
- Declared inside `NgModule`
- Dependencies managed at module level
- More boilerplate
- Common in **legacy projects**

---

## 🔹 Differences

| Aspect          | Standalone | Module-Based |
|-----------------|------------|--------------|
| Declaration     | `standalone: true` | Inside `NgModule` |
| Dependencies    | Imported in component | Imported in module |
| Boilerplate     | Minimal | More |
| Best for        | New apps | Legacy apps |

---

## Formula
```
Component = HTML + CSS + TypeScript Logic
```
```
Standalone = Component + Direct Imports
Module-Based = Component + NgModule
```
```

---

This file is **minimal, structured, and interview-ready**.  

Would you like me to also prepare a **real-world folder structure comparison** (standalone vs module-based project) so you can directly see how files are organized?


```
# Angular Component - Interview Quick Notes

## 🔹 [Selector](ca://s?q=Angular_Component_Selector)
**Q:** What is a selector?  
**A:** Custom HTML tag to render a component.  
Example: `<app-user></app-user>`

---

## 🔹 [Component](ca://s?q=Angular_Component_Definition)
**Q:** What is a component?  
**A:** UI block = HTML + CSS + TS logic.  
Formula: `Component = Template + Styles + Logic`

---

## 🔹 [Component Tree](ca://s?q=Angular_Component_Tree)
**Q:** What is a component tree?  
**A:** Hierarchy of components: Root → Parent → Child.

---

## 🔹 [Form Building](ca://s?q=Angular_Form_Building)
**Q:** How to build forms?  
**A:**  
- Template-driven → `FormsModule`  
- Reactive → `ReactiveFormsModule`  

Example:
```ts
form = new FormGroup({ name: new FormControl('') });

```