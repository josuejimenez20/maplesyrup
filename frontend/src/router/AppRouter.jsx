import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Login } from "../components/login/Login";
import NotFound from "./not-found/NotFound";
import { NavBar } from "../components/shared/molecules/NavBar";
import { Home } from "../components/home/Home";
import { About } from "../components/about/About";

import { UserInformation } from "../components/user/UserInformation";
import { UltimateUser } from "../components/ultimateUser/UltimateUser";

import { SellTopProducts } from "../components/sellTops/SellTopProducts";
import { ListNewProducts } from "../components/ListNewProducts/ListNewProducts";
import { SalesProducts } from "../components/SalesProducts/SalesProducts";
import { BuyProducts } from "../components/buyProducts/BuyProducts";
import { PaypalPayment } from "../components/buyProducts/PaypalPayment";
import { MessageSuccessPayment } from "../components/buyProducts/MessageSuccessPayment";
import { BuyShoppingCartProducts } from "../components/buyProducts/BuyShoppingCartProducts";


export function AppRouter() {
  return (<>

    <NavBar />

    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="/SellTop" element={<SellTopProducts />} />
      <Route path="/NewsProducts" element={<ListNewProducts />} />
      <Route path="/OfferProducts" element={<SalesProducts />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/About/*" element={<About />} />
      <Route path="/BuyProducts/:id_product" element={<BuyProducts />} />
      <Route path="/PaypalPaymentOneProduct/:id_product/:count" element={<PaypalPayment />} />
      <Route path="/PaypalPaymentShoppingCart" element={<BuyShoppingCartProducts />} />
      <Route path="/PaypalPaymentOneProduct/MessageSuccess" element={<MessageSuccessPayment />} />
      <Route path="/User/:id_user" element={<UserInformation />} />
      <Route path="/UltimateUser/*" element={<UltimateUser />} />
    </Routes>
  </>);
}
