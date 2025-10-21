import React, { createContext, useState, useContext, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product, size) => {
    setCart((prev) => [...prev, { ...product, size }]);
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev; // already in wishlist
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Memoize value to optimize context propagation
  const value = useMemo(() => ({
    cart,
    wishlist,
    addToCart,
    addToWishlist,
    removeFromWishlist,
  }), [cart, wishlist]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
