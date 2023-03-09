import axios from 'axios';
import {
    fetchNewUser,
    fetchNewUserSuccess,
    fetchNewFaulire
} from "../../slices/users/newUserSlice";

// Login users
// params: Data

export const loginUser = (data) => async (dispatch) => {

    try {
        dispatch(fetchNewUser());
        const response = await axios.post('http://localhost:3001/api/login/verificate', data);
        console.log(response);
        dispatch(fetchNewUserSuccess(response.data.response));
    } catch (error) {
        dispatch(fetchNewFaulire("Error al ingresar, el ususario no existe, por favor intente nuevamente"));
    }
}