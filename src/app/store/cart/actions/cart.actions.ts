import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../../models/product.model";


export const addToCart = createAction('[Cart] Add To Cart', props<{ cartItem: CartItem }>());
export const removeFromCart = createAction('[Cart] Remove From Cart', props<{ cartItem: CartItem }>());
export const clearCart = createAction('[Cart] Clear Cart');