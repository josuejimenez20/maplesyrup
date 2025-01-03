import axios from 'axios';
import {
    fetchProductsByWord,
    fetchProductsByWordFailure,
    fetchProductsByWordSuccess,
} from "../../../../redux/slices/managmentProducts/products/editProduct/listProductByWord";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const GetListProductByWord = (word) => async (dispatch) => {    

    try {
        dispatch(fetchProductsByWord());
        const { data } = await axios.get(`${apiEndpoint}/products/searchProductsByWord/${word}`);
        dispatch(fetchProductsByWordSuccess(data.data));
    } catch (error) {
        dispatch(fetchProductsByWordFailure(error));
    }


}