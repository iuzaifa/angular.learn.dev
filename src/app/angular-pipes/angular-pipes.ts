import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-pipes',
  imports: [CommonModule],
  templateUrl: './angular-pipes.html',
  styleUrl: './angular-pipes.css',
})
export class AngularPipes {

  fname = "abu";
  lnane = 'huzaifa';
  
  today = new Date();

  fruits = ['Apple', 'Mango', 'Orange'];

  user = {
  name: 'Abu',
  age: 25
  };


  name = "Abu Huzaifa"

  usd: number = 100; // 1.05 $
  inr: number = 100;
  usdToInr: number = 95; // rate 



}
