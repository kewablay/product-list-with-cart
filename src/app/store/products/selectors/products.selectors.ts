import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { ProductsState } from '../reducers/products.reducers';

export const selectProducts = createSelector(
  (state: AppState) => state.products,
  (products:ProductsState) => products.products
);