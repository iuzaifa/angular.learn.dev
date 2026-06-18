import { Component } from '@angular/core';

@Component({
  selector: 'app-data-types',
  imports: [],
  templateUrl: './data-types.html',
  styleUrl: './data-types.css',
})
export class DataTypes {
  count: number = 5; // not assignable as like count = "any type of data "; 
  name: string = "Angular"; // not assignable as like name = 30; 

  isActive: boolean = true;
  tags: string[] = ["a", "b"];
  user: { id: number; name: string } = {
    id: 1,
    name: 'Angular'
  };
  anything: any; // avoid in production code
  value: unknown; // safer alternative to any

 


  sum(x : number , y : number ){
    // return alert(x + y)
    return x + y
  }



 

  sum2( a: number | null = null, b: number | null = null){
    if  (a === null || b === null){
      return null
    }
    return a + b;
  }


}
