import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { CartState } from '../reducers/cart.reducers';

export const selectCart = createSelector(
  (state: AppState) => state.cart,
  (cart: CartState) => cart.cart
);
