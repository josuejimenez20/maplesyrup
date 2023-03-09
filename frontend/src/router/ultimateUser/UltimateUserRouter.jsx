import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AddProducts } from "../../components/ultimateUser/products/AddProducts";


export function UltimateUserRouter() {
    return (<>
        <Routes>
            <Route path="/AddProducts" element={<AddProducts />} />
            {/* <Route path="/Register" element={<RegisterUser />} /> */}
        </Routes>
    </>);
}
