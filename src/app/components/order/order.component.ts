import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { OrderItem } from '../../models/product.model';
import { selectOrder } from '../../store/order/selectors/order.selectors';
import { AsyncPipe } from '@angular/common';
import { clearCart } from '../../store/cart/actions/cart.actions';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass',
})
export class OrderComponent {
  order$: Observable<OrderItem[]>;
  constructor(private store: Store<AppState>) {
    this.order$ = this.store.select(selectOrder);

    this.store
      .select(selectOrder)
      .subscribe((order) => console.log('order:', order));
  }

  startNewOrder() {
    // close order modal
    this.store.dispatch(clearCart());
  }
}
