import { CartState } from './cart/reducers/cart.reducers';
import { OrderState } from './order/reducers/order.reducers';
import { ProductsState } from './products/reducers/products.reducers';

export interface AppState {
  products: ProductsState;
  cart: CartState;
  order: OrderState;
}
