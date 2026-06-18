import { Component } from '@angular/core';

@Component({
  selector: 'app-if-else-flow-hide-show-toggle',
  imports: [],
  templateUrl: './if-else-flow-hide-show-toggle.html',
  styleUrl: './if-else-flow-hide-show-toggle.css',
})
export class IfElseFlowHideShowToggle {

  isLoggedIn : boolean = true;
  marks: number = 78;
  toggle : boolean = true;

  handleToggle(){
    this.toggle = !this.toggle;
  }
}
