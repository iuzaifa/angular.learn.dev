import { Component } from '@angular/core';

@Component({
  selector: 'app-else-if-flow',
  imports: [],
  templateUrl: './else-if-flow.html',
  styleUrl: './else-if-flow.css',
})
export class ElseIfFlow {

  status : string = "processing"
  marks : number = -1;

  age : number = 0;

  updateAge(val : number){
    this.age = val
  }

  updateSection : string = "home"

}
