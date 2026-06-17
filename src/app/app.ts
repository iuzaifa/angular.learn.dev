import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterpolationComponent } from './topics/interpolation/interpolation';
import { Login } from './topics/components/login/login';
import { Signin } from "./topics/components/signin/Signin";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InterpolationComponent, Login, Signin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  protected readonly title = signal('angular-learn-dev');
}
