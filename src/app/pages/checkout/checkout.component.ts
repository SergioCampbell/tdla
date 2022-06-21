import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/interface/order.interface';
import { Store } from 'src/app/shared/interface/store.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/interface/product.interface';
import { ProductsService } from '../products/services/products.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };
  cart: Product[] = []
  isDelivery = false;
  stores: Store[] = []

  constructor(private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productSvc: ProductsService) {
      this.checkIfCartIsEmpty()
    }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
    
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log("saved", formData);
    const data: Order = {
      ...formData,
      data: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap( res => console.log('order -> ', res)),
      switchMap(({id: orderId}) => {
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({details, orderId})
      }),
      tap(() => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(() => this.shoppingCartSvc.resetCart()))
    .subscribe()
  }

  private getStores(): void {
    this.dataSvc.getStores()
    .pipe(
      tap((stores: Store[]) => this.stores = stores))
    .subscribe()
  }

  private getCurrentDay(): string  {
    return new Date().toLocaleDateString()
  }

  private prepareDetails(): Details[] {
    const details: Details[] = []
    this.cart.forEach( (product: Product) => {
      const { id: productId, name:productName, quantity:quantity, stock} = product;
      const updateStock = (stock - quantity); //we update the stock value in "backend"

      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap( () => details.push({ productId, productName, quantity })
        )
      )
      .subscribe()

      details.push({ productId, productName, quantity });
    })

    return details

  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((product: Product[]) => this.cart = product)
    )
    .subscribe()
  }

  //check if cart is empty and redirect to home
  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => {
        if(Array.isArray(products) && !products.length){
          this.router.navigate(['/products']);
        }
      })
    )
    .subscribe()
  }

}
