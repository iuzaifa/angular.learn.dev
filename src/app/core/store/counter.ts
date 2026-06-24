import { Injectable, signal } from '@angular/core';



@Injectable({
    providedIn : 'root'
})



export class Counter {

    count = signal(0);

    increment() {
        this.count.update( val => val + 1)
    }

    decrement() {
        this.count.update( val => val - 1)
    }


}
