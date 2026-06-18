import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-loops',
  imports: [],
  templateUrl: './angular-loops.html',
  styleUrl: './angular-loops.css',
})
export class AngularLoops {

  items : string [] = ["Java", "Spring Boot", "React", "Angular", "Typescript", "PostgresSQL", "MySQL"]

 users = [
  {
    name: "Abbas",
    email: "abbas@example.com",
    age: 24,
    address: "Lucknow"
  },
  {
    name: "Ali",
    email: "ali@example.com",
    age: 28,
    address: "Delhi"
  },
  {
    name: "Ahmed",
    email: "ahmed@example.com",
    age: 22,
    address: "Mumbai"
  },
  {
    name: "Fatima",
    email: "fatima@example.com",
    age: 26,
    address: "Hyderabad"
  },
  {
    name: "Ayesha",
    email: "ayesha@example.com",
    age: 21,
    address: "Pune"
  },
  {
    name: "Zain",
    email: "zain@example.com",
    age: 30,
    address: "Bangalore"
  },
  {
    name: "Hamza",
    email: "hamza@example.com",
    age: 27,
    address: "Kolkata"
  },
  {
    name: "Sara",
    email: "sara@example.com",
    age: 23,
    address: "Chennai"
  },
  {
    name: "Usman",
    email: "usman@example.com",
    age: 32,
    address: "Jaipur"
  },
  {
    name: "Maryam",
    email: "maryam@example.com",
    age: 25,
    address: "Bhopal"
  }];

  fruits : string [] = ["Apple", "Mango", "Orange", "Pea", "Pomegrenate", "Banana"]

  handleRemoveItem(index : number){
    this.fruits.splice(index, 1);
  }

  handleRemoveCard(index : number){
    this.users.splice(index, 1);
  }


  numberslist : number [] = [34, 5, 76,99, 95,34 ,67]

}
