import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  lable = input<string>();
  clicked = output<string>();

  onClick() {
    console.log("Button Clicked on Chlid")
    this.clicked.emit("Button Clicked Successfuly!")
  }


}
