import axios from 'axios';
import {
    fetchNewUser,
    fetchNewUserSuccess,
    fetchNewFaulire
} from "../../slices/users/newUserSlice";

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const loginUser = (data) => async (dispatch) => {

    try {
        dispatch(fetchNewUser());
        const response = await axios.post(`${apiEndpoint}/login/verify`, data);
        dispatch(fetchNewUserSuccess(response.data.response));
    } catch (error) {
        dispatch(fetchNewFaulire("Error al ingresar, el ususario no existe, por favor intente nuevamente"));
    }
}