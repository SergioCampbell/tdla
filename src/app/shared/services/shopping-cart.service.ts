import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interface/product.interface";

@Injectable({providedIn: 'root'})

export class ShoppingCartService {
    products: Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable()
    }

    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable()
    }

    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable()
    }

    private calculateTotal(): void {
        const total = this.products.reduce( (actual, product) => actual += (product.price * product.quantity), 0);
        this.totalSubject.next(total)
    }

    private quantityProducts(): void {
        const quantity = this.products.reduce((actual, product) => actual += product.quantity, 0);
        this.quantitySubject.next(quantity)
    }

    private addToCart(product: Product): void {
        const isProductInCart = this.products.find(({ id }) => id === product.id)

        // if the first element is equal to the product with the same id
        if(isProductInCart) {
            isProductInCart.quantity += 1;
        } else {
            //if the product id is not the same 
            this.products.push({ ...product, quantity: 1 })
        }

        //this.products.push(product);
        this.cartSubject.next(this.products)
    }

    updateCart(product: Product): void {
        this.addToCart(product);
        this.quantityProducts();
        this.calculateTotal();
    }

    resetCart(): void {
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
        this.products = [];
    }

}