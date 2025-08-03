import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, selectedSize) => {
    console.log("Adding to cart:", product.name, "Size:", selectedSize);
    console.log("ADD TO CART:", product, selectedSize);
    const existing = cartItems.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...product, size: selectedSize, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (productId, size, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
