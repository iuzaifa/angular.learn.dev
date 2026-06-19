import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-angular-effect',
  imports: [],
  templateUrl: './angular-effect.html',
  styleUrl: './angular-effect.css',
})
export class AngularEffect {

  // count = signal(0);

  // constructor() {
  //   effect(() => {
  //     console.log('Count Changed:', this.count());
  //   });
  // }

  // increment() {
  //   this.count.update(value => value + 1)
  // }


  isMode = signal(false);
  message = signal("== ")

  constructor() {
    effect(() => {
      if(this.isMode()){
        document.body.style.background = 'black'
        document.body.style.color = 'white'
        document.body.className = "hello"
      }else {
         document.body.style.background = 'white'
          document.body.style.color = 'black'
          
      }
    })


    effect(() => {
      if(this.message()){
        setTimeout(() => {
          this.message.set("")
        }, 2000)

      }

    })
  }

  

  toggleBtn() {
    this.isMode.update(mode => !mode)
  }

  updateText(){
    this.message.set("Click updated some text")
  }



}
