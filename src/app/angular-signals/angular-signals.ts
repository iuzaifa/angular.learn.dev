import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-angular-signals',
  imports: [],
  templateUrl: './angular-signals.html',
  styleUrl: './angular-signals.css',
})
export class AngularSignals {


  count = signal(10)
  value : number = 34;

  name = signal("ABu Huaod")

  increment(){
    this.count.set(this.count() + 60)
  }

  updateName(){
    this.name.set("Abu Huzaifa")
  }



  // languages = signal(["java", "springboot", "react", "angular"])
  // newLanguage = "";


  // addlanguages(val : string){
  //   if(!val.trim()) return;

  //   this.languages.update( i => [
  //     ...i,
  //     val
  //   ])

  //   this.newLanguage = '';

  // }


  numbers = signal([34,6,79,0,54,77,78])
  newNum : number = 0;

  updateNumbers(n : number){
    
    if(n < 0) return;
    this.numbers.update(num => [
      ...num,
      n
    ])
    this.newNum = 0;
  }
  

}
