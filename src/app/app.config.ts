import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productsReducer } from './store/products/reducers/products.reducers';
import { ProductsEffects } from './store/products/effects/products.effects';
import { provideHttpClient } from '@angular/common/http';
import { cartReducer } from './store/cart/reducers/cart.reducers';
import { orderReducer } from './store/order/reducers/order.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(ProductsEffects),
    provideState({
      name: 'products',
      reducer: productsReducer,
    }),
    provideHttpClient(),
    provideState({
      name: 'cart',
      reducer: cartReducer,
    }),
    provideState({
      name: 'order',
      reducer: orderReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
