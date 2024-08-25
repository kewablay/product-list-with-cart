import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, Dessert } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadProducts } from '../../store/products/actions/products.actions';
import { selectProducts } from '../../store/products/selectors/products.selectors';
import { AsyncPipe } from '@angular/common';
import {
  addToCart,
  decreaseItemQuantity,
  removeFromCart,
} from '../../store/cart/actions/cart.actions';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { selectCart } from '../../store/cart/selectors/cart.selectors';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe, ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.sass',
})
export class ProductListComponent {
  products$!: Observable<Dessert[]>;

  isInCart: boolean = false;
  loading$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {
    console.log('Product list component created');
    // this.products$ = this.store.select((state) => state.products.products);
    this.products$ = this.store.select(selectProducts);
    this.store
      .select('products')
      .subscribe((data) => this.localStorageService.setItem('products', data)); // ;
    // this.loading$ = this.store.select((state) => state.products.loading);
    console.log('Products: ', this.products$);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    // Set products to local storage
    this.products$.subscribe((products) => {
      localStorage.setItem('products', JSON.stringify(products));
    });
  }

  addToCart(product: Dessert, $index: number) {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      itemTotalPrice: product.price,
      id: $index,
    };
    this.store.dispatch(addToCart({ cartItem }));
  }

  DecreaseQuantity(productName: string) {
    // const cartItem: CartItem = { ...product, quantity: 1,itemTotalPrice: product.price, id: $index };
    this.store.dispatch(decreaseItemQuantity({ productName }));
  }
}
