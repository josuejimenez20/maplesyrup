import { combineReducers } from "redux";

import { listProductsSlice } from "./listProductsSlice";
import { listInformationProductSlice } from "./listInformationProduct";
import { paymentProductsSlice } from "./paymentProductsSlice";
import { newProductSlice } from "./newProduct";
import { listProductByWordSlice } from "./editProduct/listProductByWord"
import { GetProductInformationByIdSlice } from "./editProduct/getProductInformationByIdSlice"
import { editProductInformationSlice } from "./editProduct/editProductInformationSlice"


export * from './listProductsSlice'
export * from './paymentProductsSlice'

export const ProductsReducer = combineReducers({
    list: listProductsSlice.reducer,
    productInformation: listInformationProductSlice.reducer,
    paymentProduct: paymentProductsSlice.reducer,
    new: newProductSlice.reducer,
    listEdit: listProductByWordSlice.reducer,
    editProductInformation: GetProductInformationByIdSlice.reducer,
    editInformation: editProductInformationSlice.reducer
});