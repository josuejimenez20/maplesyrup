import axios from 'axios';
import {
    fetchPaymentProducts,
    fetchPaymentProductsFailure,
    fetchPaymentProductsSuccess
} from "../../slices/managmentProducts/products/paymentProductsSlice";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

// Function for get all products
// The function will have a param for get product for parts

export const purchasePayment = (data_payment) => async (dispatch) => {

    try {
        dispatch(fetchPaymentProducts());
        const response = await axios.post(`${apiEndpoint}/paypal/payment`, data_payment);

        dispatch(fetchPaymentProductsSuccess(true));
    } catch (error) {
        dispatch(fetchPaymentProductsFailure(error));
    }


}