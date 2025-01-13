import { useState, useContext, createContext, useEffect } from "react";
import React from "react";
import axios from "axios";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  async function orderAdd(existingCartItem){
    // console.log(existingCartItem)
    // const [{_id, name, price}] = existingCartItem
    // await axios.post('http://localhost:3001/orders', {existingCartItem})
  }

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
    console.log(cart)
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
