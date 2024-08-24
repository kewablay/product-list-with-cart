import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseListItemComponent } from "../base-list-item/base-list-item.component";
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [BaseListItemComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.sass'
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;
  @Output() removeFromCart = new EventEmitter<CartItem>();

  handleRemoveCartItem(cartItem: CartItem) {
    this.removeFromCart.emit(cartItem);
  }
}
