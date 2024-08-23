import { createAction, props } from '@ngrx/store';
import { OrderItem } from '../../../models/product.model';

// in the future placeOrder can be async that way we add an effect and add loading and success actions
export const placeOrder = createAction(
  '[Order] Place Order',
  props<{ order: OrderItem[] }>()
);
