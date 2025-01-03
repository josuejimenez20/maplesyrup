import axios from 'axios';
import {
    fetchNewUser,
    fetchNewUserSuccess,
    fetchNewFaulire
} from "../../slices/users/newUserSlice";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const RegisterNewUser = (data) => async (dispatch) => {

    try {

        dispatch(fetchNewUser());

        const response = await axios.post(`${apiEndpoint}/users/new`, data);
        dispatch(fetchNewUserSuccess(response.data));

    } catch (error) {
        dispatch(fetchNewFaulire("Error al registrar el usuario, intente nuevamente"));
    }


}