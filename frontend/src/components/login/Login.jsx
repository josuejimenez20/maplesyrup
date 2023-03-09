import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { LoginRoute } from "../../router/login/LoginRoute";
import { MessageError } from '../shared/molecules/AlertMessages';

export function Login() {

  const navigate = useNavigate();

  const { loading, success, error, userData } = useSelector((state) => state.users.new);

  const { id_user_encrypted, names, email, password } = userData;

  // Root Permission
  // "Root Permission" give us access for others secctions and actions
  // If we want an user to have the "Root Permission"
  // We must add id of user en "rootList"
  // DON'T CHANGE the variable name or structure
  const rootList = ["950e6631-b174-421c-a6d2-c509a9248035"];

  useEffect(() => {
    if (success && rootList.includes(userData.id_user_encrypted)) {
      localStorage.setItem('XMW-183DM', 'XMW-193DM');
    }
  }, [success, userData])

  // End Root Permission

  useEffect(() => {
    if (success && userData) {

      localStorage.setItem('id_user', id_user_encrypted);
      localStorage.setItem('names', names);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('i-s-pa-ss', "X294-FDJKSDF-FIHSHFSD");

      window.location.reload();
    }

  }, [success, userData])

  if (success && userData) {
    navigate('/home');

  }

  return (
    <>
      <LoginRoute />
    </>
  );
}