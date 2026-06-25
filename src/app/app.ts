import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Card } from "./card/card";
import { Button } from "./button/button";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from "./form-field/form-field";
// import { SignalDatatypes } from "./signal-datatypes/signal-datatypes";
// import { AngularComputedSignals } from "./angular-computed-signals/angular-computed-signals";
// import { AngularEffect } from "./angular-effect/angular-effect";
// import { AngularPipes } from "./angular-pipes/angular-pipes";
// import { SignalDe } from "./signal-de/signal-de";
// import { TwoWayBinding } from './two-way-binding/two-way-binding';
// import { TodoAap } from "./todo-aap/todo-aap";
// import { SignalsTemplate } from "./signals-template/signals-template";
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
// import { InputSignal } from "./input-signal/input-signal";
// import { Counter } from './core/store/counter';
// import { UserStore } from './core/store/UserStore';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet, InterpolationComponent, Login, Signin, PropertyBind , EventBinding, FunctionCallOnButtonClick],
  // imports: [RouterOutlet, DataTypes, EventsDemo CounterApp, GetSetValue, AngularStyling, IfElseFlowHideShowToggle, ElseIfFlow],
  // imports: [RouterOutlet, DataTypes, EventsDemo CounterApp, GetSetValue, AngularStyling, IfElseFlowHideShowToggle ,ElseIfFlow],
  // imports: [RouterOutlet, SwitchCase, AngularPipes ,AngularLoops, AngularLoopContextualVars, AngularSignals, SignalDatatypes,AngularComputedSignals, AngularEffect],
  // imports: [RouterOutlet,TwoWayBinding,TodoAap, SignalsTemplate,InputSignal],
  // imports: [Card, Button FormField],
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  protected readonly title = signal('angular-learn-dev');
  
  
  form = new FormGroup({
    name:new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  submit(){
    console.log(this.form.value)
  }
  
  
  // message = ""
  // saveData(msg:string) {
  //   console.log(this.message)
  //   this.message = msg
  // }
  // constructor(public counterStore : Counter){}
  // reset () {
  //   this.counterStore.count.set(0)
  // }
}
