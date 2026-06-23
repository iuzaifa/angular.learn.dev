import { Component, input, signal } from '@angular/core';
import { InputSignal } from '../input-signal/input-signal';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {

  //  child 

  name=input('')

  nameofUsers= input("")



}
