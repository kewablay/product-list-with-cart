import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../../models/product.model';
import { addToCart, clearCart, removeFromCart } from '../actions/cart.actions';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';

export interface CartState {
  cart: CartItem[];
}

const localStorageService = new LocalStorageService();

export const initialState: CartState = {
  cart: localStorageService.getItem('cart') || [],
};

const addItemToCart = (
  state: CartState,
  { cartItem }: { cartItem: CartItem }
) => {
  // get the item index
  const itemIndex = state.cart.findIndex(
    (singleCartItem) => singleCartItem.id === cartItem.id
  );
  // if item does not exist then add the item to cart
  if (itemIndex === -1) {
    return {
      ...state,
      cart: [...state.cart, cartItem],
    };
  } else {
    // else increment the quantity of the item in cart
    const updatedItem = {
      ...state.cart[itemIndex],
      quantity: state.cart[itemIndex].quantity + 1,
    };
    return {
      ...state,
      cart: state.cart.map((singleCartItem, index) =>
        index === itemIndex ? updatedItem : singleCartItem
      ),
    };
  }
};

const clearCartItems = (state: CartState) => {
  localStorageService.removeItem('cart');
  return { ...state, cart: [] };
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, addItemToCart),
  on(removeFromCart, (state, { cartItem }) => ({
    ...state,
    cart: state.cart.filter(
      (singleCartItem) => cartItem.id !== singleCartItem.id
    ),
  })),
  on(clearCart, clearCartItems)
);
