import { CartItem, Products } from '../models/product.model';
import { ProductsState } from './products/reducers/products.reducers';

export interface AppState {
  products: ProductsState
  cart: any;
}
