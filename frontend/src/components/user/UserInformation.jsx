import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GetInformationUser } from "../../redux/actions/user/GetInformationUser";
import { UserEditForm } from "./UserEditForm";
import { MessageError } from "../shared/molecules/AlertMessages";


export function UserInformation() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error, userData
    } = useSelector((state) => state.users.information);

    const { loading: loadingEditUser, error: errorEditUser,
        success: sucessInformationUser
    } = useSelector((state) => state.users.edit);

    useEffect(() => {
        const id_user = localStorage.getItem('id_user');
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        dispatch(GetInformationUser(id_user, email, password));
    }, [])

    useEffect(() => {

        if (sucessInformationUser) {
            localStorage.removeItem('id_user');
            localStorage.removeItem('names');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('i-s-pa-ss');
            localStorage.removeItem('XMW-183DM');
            navigate('/login/LoginUser');
            window.location.reload();
        }
    }, [sucessInformationUser])

    return (<>
        {
            <UserEditForm />
        }
    </>);
}
