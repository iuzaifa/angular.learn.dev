import { Component } from '@angular/core';

@Component({
  selector: 'app-function-call-on-button-click',
  imports: [],
  templateUrl: './function-call-on-button-click.html',
  styleUrl: './function-call-on-button-click.css',
})
export class FunctionCallOnButtonClick {
  
  test : string = "working!";
  
  helloWorld() {
    console.log("Hello World!! " + this.test)
  }

  handleClick () {
    let x = "!!";
    console.log("hi there " + x);
    this.helloWorld();
  }
}
