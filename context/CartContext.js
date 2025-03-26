import React, { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product])
  }

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item, index) => index !== id))
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
