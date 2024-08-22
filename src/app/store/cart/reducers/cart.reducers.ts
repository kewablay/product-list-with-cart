import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../../models/product.model';
import { addToCart, clearCart, removeFromCart } from '../actions/cart.actions';

export interface CartState {
  cart: CartItem[];
}

export const initialState: CartState = {
  cart: [],
};

// export const initialState: CartState = JSON.parse(
//   localStorage.getItem('cart') ??
//     JSON.stringify({
//       cart: [],
//     })
// ) 



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

export const cartReducer = createReducer(
  initialState,
  on(addToCart, addItemToCart),
  on(removeFromCart, (state, { cartItem }) => ({
    ...state,
    cart: state.cart.filter(
      (singleCartItem) => cartItem.id !== singleCartItem.id
    ),
  })),
  on(clearCart, (state) => ({ ...state, cart: [] }))
);
