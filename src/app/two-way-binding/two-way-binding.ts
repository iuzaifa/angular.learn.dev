import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way-binding',
  imports: [FormsModule],
  templateUrl: './two-way-binding.html',
  styleUrl: './two-way-binding.css',
})
export class TwoWayBinding {

  username = "huzaifa";
  cardText: string = 'Hello Angular.....!';
  bgColor: string = '#3498db';
  textColor: string = '#ffffff';
}
