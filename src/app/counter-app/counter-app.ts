import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-app',
  imports: [],
  templateUrl: './counter-app.html',
  styleUrl: './counter-app.css',
})
export class CounterApp {

  counter : number = 0;

  handleIncrement(){
    this.counter++;
  }
  handleDecrement() {
    // if  (this.counter > 0) {
    //   this.counter--;
    // }
    if (this.counter === 0){
      return alert("Already has " + this.counter)
    }
  }
  handleReset() {
    this.counter = 0;
  }

  handelCounter(value : string) {
    if(value === "increase") {
      this.counter++

    }else if (value === "decrease"){
      if(this.counter === 0) {
        return alert("Already has " + this.counter)
      }
      this.counter--;

    }else{
      this.counter = 0;
    }
  }


}
