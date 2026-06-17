import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterpolationComponent } from './interpolation/interpolation';
import { Login } from './components/login/login';
import { Signin } from './components/signin/Signin';
import { PropertyBind } from './property-bind/property-bind';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InterpolationComponent, Login, Signin, PropertyBind],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  protected readonly title = signal('angular-learn-dev');
}
