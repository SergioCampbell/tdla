import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: ` <div class="container">
    <h1 class="title">Thank you!</h1>
    <p class="content">Your order is on the way!</p>
    <span>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit minima
      dolorem omnis nihil, obcaecati numquam! Corporis reprehenderit architecto
      velit culpa repudiandae, corrupti, ipsa dolor consectetur veritatis
      mollitia cum quisquam possimus!
    </span>
  </div>`,
  styleUrls: ['./thank-you-page.component.scss'],
})
export class ThankYouPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
