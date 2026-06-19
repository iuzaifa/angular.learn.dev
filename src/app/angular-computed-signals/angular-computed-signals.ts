import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-angular-computed-signals',
  imports: [],
  templateUrl: './angular-computed-signals.html',
  styleUrl: './angular-computed-signals.css',
})
export class AngularComputedSignals {

  count = signal(19);
  doubleCount = computed(() => this.count() * 2);


  firstName = signal('Abu');
  lastName = signal('Huzaifa');


  fullName = computed(() => 
    `${this.firstName()}  ${this.lastName()}`
  
  );

  numbers = signal([10, 20, 30, 40]);

  total = computed(() => 
    this.numbers().reduce((sum, num) => sum + num, 0)
  );


  users = signal([
    { name: 'Ali' },
    { name: 'Ahmed' },
    { name: 'Sara' }
  ]);

  userCount = computed(() => 
    this.users().length
  );

  



  isUsers = signal([
    { name: 'Ali', active: true },
    { name: 'Ahmed', active: false },
    { name: 'Sara', active: true }
  ]);

  filterUsers = computed(()=>

    this.isUsers().filter(user => user.active)
  
  );

}
