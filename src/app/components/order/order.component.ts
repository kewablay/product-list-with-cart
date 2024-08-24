import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { OrderItem } from '../../models/product.model';
import { selectOrder } from '../../store/order/selectors/order.selectors';
import { AsyncPipe } from '@angular/common';
import { clearCart } from '../../store/cart/actions/cart.actions';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { OrderItemComponent } from "../order-item/order-item.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [AsyncPipe, CartItemComponent, OrderItemComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass',
})
export class OrderComponent {
  order$: Observable<OrderItem[]>;
  @Output() closeModal = new EventEmitter<void>()

  constructor(private store: Store<AppState>) {
    this.order$ = this.store.select(selectOrder);

    this.store
      .select(selectOrder)
      .subscribe((order) => console.log('order:', order));
  }

  startNewOrder() {
    // close order modal
    this.store.dispatch(clearCart());
    this.closeModal.emit();
  }
}
