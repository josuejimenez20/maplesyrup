import { combineReducers } from "redux";

import { ProductsReducer } from "./products/index";
import { ShoppingCartSliceReducer } from "./shoppingCart/index";
import { UsersReducer } from "./users/index";

export const ProductsManagmentReducer = combineReducers({
    products: ProductsReducer.reducer,
    shopping_cart: ShoppingCartSliceReducer.reducer,
    users: UsersReducer.reducer,
});