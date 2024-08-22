import { createAction, props } from '@ngrx/store';
import { Products } from '../../../models/product.model';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Products[] }>()
);
export const loadProductsError = createAction(
  '[Products] Load Products Error',
  props<{ error: any }>()
);
