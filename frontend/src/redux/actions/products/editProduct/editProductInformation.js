import axios from 'axios';
import {
    fetchEditProductInformation,
    fetchEditProductInformationFailure,
    fetchEditProductInformationSuccess,
} from "../../../../redux/slices/managmentProducts/products/editProduct/editProductInformationSlice";

export const editProductInformation = (data) => async (dispatch) => {

    try {
        dispatch(fetchEditProductInformation());
        const response = await axios.post(`http://localhost:3001/api/products/edit-product-information`, data);
        dispatch(fetchEditProductInformationSuccess(true));
    } catch (error) {
        dispatch(fetchEditProductInformationFailure(error));
    }
}