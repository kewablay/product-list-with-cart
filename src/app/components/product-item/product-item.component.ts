import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CartItem, Dessert } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { selectCart } from '../../store/cart/selectors/cart.selectors';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.sass',
})
export class ProductItemComponent {
  @Output() addToCart = new EventEmitter<any>();
  @Output() decreaseQuantity = new EventEmitter<any>();
  @Input() product!: Dessert;
  cart$!: Observable<CartItem[]>;
  isInCart: boolean = false;
  quantity: number = 0;

  constructor(private store: Store<AppState>) {
    console.log('Product item component created');
    this.cart$ = this.store.select(selectCart);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this['product']) {
      this.cart$.subscribe((cart) => {
        const itemInCart = cart.find((item) => item.name === this.product.name);
        if (itemInCart) {
          this.isInCart = true;
          this.quantity = itemInCart.quantity;
        } else {
          this.isInCart = false;
          this.quantity = 0;
        }
      });
    }
  }

  handleAddToCart(product: Dessert) {
    this.addToCart.emit(product);
  }

  handleDecreaseQuantity(product: Dessert) {
    this.decreaseQuantity.emit(product.name);
  }
}
