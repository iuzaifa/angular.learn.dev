import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalDatatypes } from "./signal-datatypes/signal-datatypes";
// import { AngularSignals } from "./angular-signals/angular-signals";
// import { EventBinding } from './event-binding/event-binding';
// import { FunctionCallOnButtonClick } from './function-call-on-button-click/function-call-on-button-click';
// import { Signin } from "./components/signin/Signin";
// import { InterpolationComponent } from './interpolation/interpolation';
// import { Login } from './components/login/login';
// import { PropertyBind } from './property-bind/property-bind';
// import { DataTypes } from './data-types/data-types';
// import { EventsDemo } from './events-demo/events-demo';
// import { CounterApp } from './counter-app/counter-app';
// import { GetSetValue } from './get-set-value/get-set-value';
// import { AngularStyling } from './angular-styling/angular-styling';
// import { IfElseFlowHideShowToggle } from './if-else-flow-hide-show-toggle/if-else-flow-hide-show-toggle';
// import { ElseIfFlow } from "./else-if-flow/else-if-flow";
// import { SwitchCase } from "./switch-case/switch-case";
// import { AngularLoops } from "./angular-loops/angular-loops";
// import { AngularLoopContextualVars } from "./angular-loop-contextual-vars/angular-loop-contextual-vars";


@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, InterpolationComponent, Login, Signin, PropertyBind , EventBinding, FunctionCallOnButtonClick],
  // imports: [RouterOutlet, DataTypes, EventsDemo CounterApp, GetSetValue, AngularStyling, IfElseFlowHideShowToggle, ElseIfFlow],
  // imports: [RouterOutlet, DataTypes, EventsDemo CounterApp, GetSetValue, AngularStyling, IfElseFlowHideShowToggle ,ElseIfFlow],
  // imports: [RouterOutlet, SwitchCase, AngularLoops, AngularLoopContextualVars, AngularSignals],
  imports: [RouterOutlet, SignalDatatypes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  protected readonly title = signal('angular-learn-dev');
}
