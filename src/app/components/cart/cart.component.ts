import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { CartItem, OrderItem } from '../../models/product.model';
import { AsyncPipe } from '@angular/common';
import { selectCart } from '../../store/cart/selectors/cart.selectors';
import { removeFromCart } from '../../store/cart/actions/cart.actions';
import { placeOrder } from '../../store/order/actions/order.actions';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass',
})
export class CartComponent {
  cart$: Observable<CartItem[]>;
  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(selectCart);
    this.store
      .select(selectCart)
      .subscribe((cart) => localStorage.setItem('cart', JSON.stringify(cart)));
  }

  removeFromCart(cartItem: CartItem) {
    this.store.dispatch(removeFromCart({ cartItem }));
  }

  placeOrder() {
    this.cart$.subscribe((order: OrderItem[]) => {
      this.store.dispatch(placeOrder({ order }));
    });
  }
}
