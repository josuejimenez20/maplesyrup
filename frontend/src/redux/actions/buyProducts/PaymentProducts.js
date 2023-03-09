import axios from 'axios';
import {
    fetchPaymentProducts,
    fetchPaymentProductsFailure,
    fetchPaymentProductsSuccess
} from "../../slices/managmentProducts/products/paymentProductsSlice";

// Function for get all products
// The function will have a param for get product for parts

export const PaymentProductsNotificationUser = (data_payment) => async (dispatch) => {

    console.log(data_payment);

    try {
        dispatch(fetchPaymentProducts());
        // const { data } = await axios.get(`http://localhost:3001/api/users/information/${id_user}}/${email}/${password}`);
        dispatch(fetchPaymentProductsSuccess(true));
    } catch (error) {
        dispatch(fetchPaymentProductsFailure(error));
    }


}