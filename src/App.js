import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Product from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Login from "./components/LoginPage/Login";
import Footer from "./components/Footer/Footer";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/ecommerce/api/products.json")
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, []);

  return (
    <>
      <Header cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="/Home" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product cart={cart} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
