import { Component, signal } from '@angular/core';
import { isActive } from '@angular/router';

@Component({
  selector: 'app-todo-aap',
  imports: [],
  templateUrl: './todo-aap.html',
  styleUrl: './todo-aap.css',
})
export class TodoAap {

  newtask = signal<string>('');

  todos = signal<{task : string, isActive : boolean}[]>([
    {task  : "Hell", isActive : false}
  ]);

  addNewTodo () {
    const text = this.newtask().trim();
    if(text === '') return;

    this.todos.update(list => [
      ...list,
      {task : text, isActive : false  }
    ])
    this.newtask.set('')
    
  }

  toggleTodo(index : number ){
    this.todos.update(list => 
      list.map((item, i ) => i === index ? {...item , isActive : !item.isActive} : item)
    )
  }

  deleteTodo(index : number ){
    this.todos.update(list => 
      list.filter((_, i ) => i !== index)
    )
  }

}
