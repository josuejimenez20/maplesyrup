import React from "react";
import { Routes, Route } from 'react-router-dom';
import { LoginUser } from "../../components/login/LoginUser";
import { RegisterUser } from "../../components/login/RegisterUser";

export function LoginRoute() {
  return (
    <>
      <Routes>
        <Route path="/LoginUser" element={<LoginUser />} />
        <Route path="/Register" element={<RegisterUser />} />
      </Routes>
    </>
  );
}
