import { Component, signal } from '@angular/core';
import { single } from 'rxjs';
import { arrRemove } from 'rxjs/internal/util/arrRemove';

interface Userlist {
  name : string,
  username: string,
  email: string,
  address : string,
  phone : string,
  pincode : number
}


@Component({
  selector: 'app-signal-datatypes',
  imports: [],
  templateUrl: './signal-datatypes.html',
  styleUrl: './signal-datatypes.css',
})
export class SignalDatatypes {

  num = signal<number>(765);
  name = signal<string>("Angular");
  isAdmin = signal<boolean>(false);

  nums = signal<number[]>([5,6,7,8,9]);

  updateNums(){
    this.nums.update(arr => [
      ...arr,
      345,678,8,9,0
    ])
  }

  setNums(){
    this.nums.set([4,6,7,8,9,0,7,6,5,5,])
  }




  names = signal<string[]>(["ali", "huzaifa", "aman", "ahamad"]);

  user = signal<{name : string, email : string , age : number, }>({
    name : "Jone Doe",
    email: "example@gmail.com",
    age : 45
  })

  users = signal<{name : string, email : string , age : number, }[]>([
    {
    name: "Ali",
    email: "ali@example.com",
    age: 45
    },
    {
      name: "John Doe",
      email: "john@example.com",
      age: 32
    },
    {
      name: "Sara Khan",
      email: "sara@example.com",
      age: 28
    },
    {
      name: "Ahmed",
      email: "ahmed@example.com",
      age: 40
    },
    {
      name: "Fatima",
      email: "fatima@example.com",
      age: 35
    }
  ])


  userlist = signal<Userlist>({
      name: "Ali",
      username: "ali123",
      email: "ali@example.com",
      address: "Lucknow",
      phone: "9876543210",
      pincode: 226001
    
  })

  userlists = signal<Userlist[]>([
    {
      name: "Ali",
      username: "ali123",
      email: "ali@example.com",
      address: "Lucknow",
      phone: "9876543210",
      pincode: 226001
    },
    {
      name: "John Doe",
      username: "john123",
      email: "john@example.com",
      address: "Delhi",
      phone: "9876543211",
      pincode: 110001
    }
  ])




}
