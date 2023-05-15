import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './pages/product-list/ProductList';
import AddProducts from './pages/add-product/AddProduct';
import NotFound from './components/not-found/NotFound';

function RouteHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}> </Route>
        <Route path="/product" element={<AddProducts />}> </Route>
        <Route path="/product/:id" element={<AddProducts />}> </Route>
        <Route path="/not-found" element={<NotFound />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteHandler;
