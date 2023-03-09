import axios from 'axios';
import {
    fetchNewUser,
    fetchNewUserSuccess,
    fetchNewFaulire
} from "../../slices/users/newUserSlice";

// Register users
// params: Data

export const RegisterNewUser = (data) => async (dispatch) => {

    try {

        dispatch(fetchNewUser());

        const response = await axios.post('http://localhost:3001/api/users/new', data);

        console.log(response);

        dispatch(fetchNewUserSuccess(response.data));

    } catch (error) {
        dispatch(fetchNewFaulire("Error al registrar el usuario, intente nuevamente"));
    }


}