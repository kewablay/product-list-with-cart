import { createReducer, on } from '@ngrx/store';
import { OrderItem } from '../../../models/product.model';
import { initialState } from '../../products/reducers/products.reducers';
import { placeOrder } from '../actions/order.actions';

export interface OrderState {
  order: OrderItem[];
}

export const InitialState: OrderState = {
  order: [],
};

export const orderReducer = createReducer(
  initialState,
  on(placeOrder, (state, { order }) => {
    return { ...state, order };
  })
);
