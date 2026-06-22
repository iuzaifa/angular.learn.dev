import { Component, signal , computed} from '@angular/core';

@Component({
  selector: 'app-signal-de',
  imports: [],
  templateUrl: './signal-de.html',
  styleUrl: './signal-de.css',
})
export class SignalDe {

  count = signal<number>(0)
  name = signal<string>("Angular")


  update() {
    this.count.set(50)
  }


  price = signal(100);
  quantity = signal(2);

  totalAmount = computed(() => this.price() * this.quantity());

  incresePrice = computed(() => this.price() * 2)

  updateTotal() {
    this.price.set(this.incresePrice())
  }
  
}
