import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../../models/product.model';
import { DataService } from '../../services/dataService/data.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadProducts } from '../../store/products/actions/products.actions';
import { selectProducts } from '../../store/products/selectors/products.selectors';
import { AsyncPipe } from '@angular/common';
import { addToCart } from '../../store/cart/actions/cart.actions';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.sass',
})
export class ProductListComponent {
  products$!: Observable<Products[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    console.log('Product list component created');
    // this.products$ = this.store.select((state) => state.products.products);
    this.products$ = this.store.select(selectProducts);
    this.store
      .select('products')
      .subscribe((data) => console.log('data: ', data)); // ;
    // this.loading$ = this.store.select((state) => state.products.loading);
    console.log('Products: ', this.products$);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    // Subscribe to products$ observable
    this.products$.subscribe((products) => {
      console.log('Products in oninit:', products);
      localStorage.setItem('products', JSON.stringify(products));
    });
  }

  addToCart(product: any, $index: number) {
    const cartItem = {...product, quantity: 1, id: $index};
    console.log('Product added to cart: ', cartItem);
    this.store.dispatch(addToCart({ cartItem }));
  }
}
