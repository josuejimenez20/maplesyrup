import axios from 'axios';
import {
    fetchPaymentProducts,
    fetchPaymentProductsFailure,
    fetchPaymentProductsSuccess
} from "../../slices/managmentProducts/products/paymentProductsSlice";

// Function for get all products
// The function will have a param for get product for parts

export const purchasePayment = (data_payment) => async (dispatch) => {

    try {
        dispatch(fetchPaymentProducts());
        const response = await axios.post(`http://localhost:3001/api/paypal/payment`, data_payment);
        console.log(response);

        dispatch(fetchPaymentProductsSuccess(true));
    } catch (error) {
        dispatch(fetchPaymentProductsFailure(error));
    }


}