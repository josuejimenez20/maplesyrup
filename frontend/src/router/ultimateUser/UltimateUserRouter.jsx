import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AddProducts } from "../../components/ultimateUser/products/AddProducts";
import SearchProduct from "../../components/ultimateUser/products/edit/SearchProduct";
import { EditProductForm } from "../../components/ultimateUser/products/edit/EditProductForm";


export function UltimateUserRouter() {
    return (<>
        <Routes>
            <Route path="/AddProducts" element={<AddProducts />} />
            <Route path="/edit-product" element={<SearchProduct />} />
            <Route path="/edit-product/:id_product" element={<EditProductForm />} />
            {/* <Route path="/Register" element={<RegisterUser />} /> */}
        </Routes>
    </>);
}
