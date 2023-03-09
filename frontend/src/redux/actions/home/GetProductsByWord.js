import axios from 'axios';
import {
    fetchProducts,
    fetchProductsFailure,
    fetchProductsSuccess,
} from "../../slices/managmentProducts/products/listProductsSlice";

// Function for get all products
// The function will have a param for get product for parts

export const GetProductsByWord = (word) => async (dispatch) => {

    try {
        dispatch(fetchProducts());
        const { data } = await axios.get(`http://localhost:3001/api/products/searchProductsByWord/${word}`);
        dispatch(fetchProductsSuccess(data.response));
    } catch (error) {
        dispatch(fetchProductsFailure(error));
    }


}