import { Component } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  imports: [],
  templateUrl: './event-binding.html',
  styleUrl: './event-binding.css',
})
export class EventBinding {
  
  count : number = 0;
  increment() {
    this.count++;
  }

  showEvent(e : any) {
    console.log(e)
  }


  username='';
  updateUsername (value : string) {
    this.username = value;
  }

  // handleSubmit(e : any) {
  //   e.preventDefault();
  //   console.log(e , "Submited Form")
  // }
  handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  console.log(event);
}


}
