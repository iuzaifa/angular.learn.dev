import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-property-bind',
  imports: [],
  templateUrl: './property-bind.html',
  styleUrl: './property-bind.css',
})
export class PropertyBind {
  imagesrc: string = "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  isDisable = false;
  username="huzaifa";
  isActive=true;
  boxWidth = 100;
  bgColor = "green"
  count = signal(10);

}
