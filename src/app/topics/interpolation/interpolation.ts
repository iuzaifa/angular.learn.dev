import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component ({
    selector : "app-interpolation",
    standalone : true,
    templateUrl : "./interpolation.html"
})

export class InterpolationComponent  {
    
  myVariable = "Hello testing InterpolationComponent"

  name =  "Angular dev";

  isactive = false;
  getMessage () {
    return "Hello Angular "
  }

  myFunction () {
    const name  = "noting here to do "
    return name;
  }

  calc () {
    const x = 23;
    const y = 4;

    return x + y;
  }

  calc2 (x : number, y : number ){
    return x + y;
  }

  testSignal = signal("Angular Tutorial signal");

}