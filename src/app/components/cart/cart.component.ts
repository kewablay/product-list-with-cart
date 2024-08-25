import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { CartItem, OrderItem } from '../../models/product.model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import {
  selectCart,
  selectCartTotal,
} from '../../store/cart/selectors/cart.selectors';
import { removeFromCart } from '../../store/cart/actions/cart.actions';
import { placeOrder } from '../../store/order/actions/order.actions';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ModalService } from '../../services/modalService/modal.service';
import { ModalComponent } from '../modal/modal.component';
import { OrderComponent } from '../order/order.component';
import { LocalStorageService } from '../../services/localStorageService/local-storage.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    CartItemComponent,
    ModalComponent,
    OrderComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass',
})
export class CartComponent {
  cart$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  isModalOpen: boolean = false;
  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
    private localStorageService: LocalStorageService
  ) {
    this.cart$ = this.store.select(selectCart);
    this.cartTotal$ = this.store.select(selectCartTotal);

    this.store
      .select(selectCart)
      .subscribe((cart) => localStorage.setItem('cart', JSON.stringify(cart)));

    this.store
      .select(selectCartTotal)
      .subscribe((cartTotal) =>
        this.localStorageService.setItem('cartTotal', cartTotal)
      );
    // check whether the order modal is open
    this.isModalOpen = this.modalService.isModalOpen('orderModal');
  }

  removeFromCart(cartItem: CartItem) {
    console.log('removing item : ', cartItem.name);

    this.store.dispatch(removeFromCart({ cartItem }));
  }

  placeOrder() {
    this.modalService.openModal('orderModal');
    this.isModalOpen = this.modalService.isModalOpen('orderModal');
    
    this.cart$.subscribe((order: OrderItem[]) => {
      this.store.dispatch(placeOrder({ order }));
    });
  }

  handleCloseModal() {
    this.modalService.closeModal('orderModal');
    this.isModalOpen = this.modalService.isModalOpen('orderModal');

    console.log(
      'is order modal open: ',
      this.modalService.isModalOpen('orderModal')
    );
  }
}
