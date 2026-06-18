import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-case',
  imports: [],
  templateUrl: './switch-case.html',
  styleUrl: './switch-case.css',
})
export class SwitchCase {


  tab : string = "home"

  categories : string = "na"

  undateCategories(val : string){
    this.categories = val.toLocaleLowerCase().trim();
  }
}
