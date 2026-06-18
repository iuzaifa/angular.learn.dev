import { Component } from '@angular/core';

@Component({
  selector: 'app-get-set-value',
  imports: [],
  templateUrl: './get-set-value.html',
  styleUrl: './get-set-value.css',
})
export class GetSetValue {

  name : string = '';
  city : string = "";

  update(val : string){
    if  (val.length >= 25){
      return alert("Getting over the value and value should be 20 chars ")
    }
    this.name  = val;
  }

  email : string = "";
  getEmail(val : string) {
    this.email = val;
  }

}
