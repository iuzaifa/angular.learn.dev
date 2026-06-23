import { Component } from '@angular/core';
import { Child } from '../child/child';

@Component({
  selector: 'app-input-signal',
  imports: [Child],
  templateUrl: './input-signal.html',
  styleUrl: './input-signal.css',
})
export class InputSignal {

  // parent

  username:string=":Angular Parent ?..."

  users:string = "hello"

  
}
