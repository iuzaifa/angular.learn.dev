import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { EventBinding } from './event-binding/event-binding';
// import { FunctionCallOnButtonClick } from './function-call-on-button-click/function-call-on-button-click';
// import { Signin } from "./components/signin/Signin";
// import { InterpolationComponent } from './interpolation/interpolation';
// import { Login } from './components/login/login';
// import { PropertyBind } from './property-bind/property-bind';
// import { DataTypes } from './data-types/data-types';
// import { EventsDemo } from './events-demo/events-demo';
import { CounterApp } from './counter-app/counter-app';
import { GetSetValue } from './get-set-value/get-set-value';


@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, InterpolationComponent, Login, Signin, PropertyBind , EventBinding, FunctionCallOnButtonClick],
  // imports: [RouterOutlet, DataTypes, EventsDemo CounterApp],
  imports: [RouterOutlet, GetSetValue],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  protected readonly title = signal('angular-learn-dev');
}
