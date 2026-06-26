import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-lazy-loading',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './lazy-loading.html',
  styleUrl: './lazy-loading.css',
})
export class LazyLoading {}
