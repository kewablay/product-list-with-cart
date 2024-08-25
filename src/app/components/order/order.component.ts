import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { OrderItem } from '../../models/product.model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { clearCart } from '../../store/cart/actions/cart.actions';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { OrderItemComponent } from '../order-item/order-item.component';
import { selectCartTotal } from '../../store/cart/selectors/cart.selectors';
import { selectOrder } from '../../store/order/selectors/order.selectors';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, CartItemComponent, OrderItemComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass',
})
export class OrderComponent {
  order$: Observable<OrderItem[]>;
  orderTotal$: Observable<number>;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private store: Store<AppState>) {
    this.order$ = this.store.select(selectOrder);
    this.orderTotal$ = this.store.select(selectCartTotal);
  }

  startNewOrder() {
    this.store.dispatch(clearCart());
    // close order modal
    this.closeModal.emit();
  }
}
