import { Component } from '@angular/core';

@Component({
  selector: 'app-events-demo',
  imports: [],
  templateUrl: './events-demo.html',
  styleUrl: './events-demo.css',
})
export class EventsDemo {

  handleClick() {
    console.log("Clicked Button")
  }

  onTyping(e : any) {
    console.log("typing... ", e.target.value)
    
  }

  onKeyUp (e : any) {
    console.log("Working" , e.key )
  }

  OnHover() {
    console.log("Hover cursor at the box")
  }

  onLeave(){
    console.log("Leave cursor at the box")
  }
  
  focusEvent() {
  console.log("Focus Event Triggered");
}

  blurEvent() {
    console.log("Blur Event Triggered");
  }

}
