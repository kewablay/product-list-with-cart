import { createReducer, on } from '@ngrx/store';
import { Products } from '../../../models/product.model';
import {
  loadProducts,
  loadProductsError,
  loadProductsSuccess,
} from '../actions/products.actions';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';

export interface ProductsState {
  products: Products[];
  loading: boolean;
  error: string | null;
}

const localStorageService = new LocalStorageService()

export const initialState: ProductsState = {
  products: localStorageService.getItem('products') || [],
  loading: false,
  error: null,
}

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state: ProductsState) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state: ProductsState, { products }) => ({
    ...state,
    loading: false,
    products: products,
  })),
  on(loadProductsError, (state: ProductsState, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
