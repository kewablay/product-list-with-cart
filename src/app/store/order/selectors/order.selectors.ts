import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectOrder = createSelector(
  (state: AppState) => state.order,
  (order) => order.order
);
