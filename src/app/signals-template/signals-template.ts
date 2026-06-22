import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals-template',
  imports: [],
  templateUrl: './signals-template.html',
  styleUrl: './signals-template.css',
})
export class SignalsTemplate {

  count = signal<number>(0);
  isSignup = signal<boolean>(false);


  role = signal<'admin' | 'user'>('user');
  features = signal<String[]>([
    "Dashboard",
    "Profile",
    "Setting",
  ])

  makeAdmin() {
    this.role.set('admin');
    this.features.set([
      "Dashboard",
      "Profile",
      "Setting",
      "Admin Panel",
      "User Management"
    ])
  }

  makeUaer() {
    this.role.set('user');
    this.features.set([
      "Dashboard",
      "Profile",
      "Setting",
    ])
  }




}
