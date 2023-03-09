import React from "react";
import { Routes, Route } from 'react-router-dom';
import { HomeProducts } from "../../components/home/HomeProducts";
import { SellTopProducts } from "../../components/sellTops/SellTopProducts";
import { ListNewProducts } from "../../components/ListNewProducts/ListNewProducts";
import { SalesProducts } from "../../components/SalesProducts/SalesProducts";
import NotFound from "../not-found/NotFound";

export function HomeRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeProducts />}></Route>
                <Route path="/SellTop" element={<SellTopProducts />} />
                <Route path="/NewsProducts" element={<ListNewProducts />} />
                <Route path="/OfferProducts" element={<SalesProducts />} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    );
}
