import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
    <a [routerLink]="['/']"><span>My Store </span></a>
     <span class="spacer"></span>
      <app-cart (click)="goToCheckout()" class="mouseHover"></app-cart>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
constructor(private router: Router) { }

    goToCheckout(): void {
      this.router.navigate(['/checkout'])
    }

}
