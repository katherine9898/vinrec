import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [ subtotal, setSubtotal ] = useState(0);

  // Add item to cart
  const addToCart = (newItem) => {
    setCart((currentItems ) => {
      if (currentItems.find((item) => item.vinylRecordId === newItem.vinylRecordId) == null) {
        return [...currentItems, newItem];
      } else {
        return currentItems.map((item) => {
          if (item.vinylRecordId === newItem.vinylRecordId) {
            return { ...item, quantity: item.quantity + newItem.quantity, totalPrice: item.totalPrice + newItem.totalPrice };
          } else {
            return item;
          }
        });
      }
    });

    setSubtotal((prev) => prev + newItem.totalPrice);
    setShowCart(true);
    
  };

  // Remove item from cart
  const removeFromCart = (record) => {
    setCart((currentItems) => {
      return currentItems.filter((item) => item.vinylRecordId !== record.vinylRecordId);
    });
    setSubtotal((prev) => prev - record.totalPrice);
  };

  // Update item in cart
  const updateCart = (id, quantity) => {
    setCart((currentItems) => {
      return currentItems.map((item) => {
        if (item.vinylRecordId === id) {
          setSubtotal((prev) => prev + ( item.currentPrice * quantity ) - item.totalPrice);
          return { ...item, quantity: quantity, totalPrice: item.currentPrice * quantity };
        } else {
          return item;
        }
      });
    });
  };
  
  const handleResetCart = () => {
    setCart([]);
    setSubtotal(0);
  };

  return (
    <StateContext.Provider 
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        showCart,
        setShowCart,
        subtotal,
        handleResetCart
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);