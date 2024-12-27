import axios from 'axios';
import {
    fetchProductsByWord,
    fetchProductsByWordFailure,
    fetchProductsByWordSuccess,
} from "../../../../redux/slices/managmentProducts/products/editProduct/listProductByWord";

export const GetListProductByWord = (word) => async (dispatch) => {    

    try {
        dispatch(fetchProductsByWord());
        const { data } = await axios.get(`http://localhost:3001/api/products/searchProductsByWord/${word}`);
        dispatch(fetchProductsByWordSuccess(data.data));
    } catch (error) {
        dispatch(fetchProductsByWordFailure(error));
    }


}