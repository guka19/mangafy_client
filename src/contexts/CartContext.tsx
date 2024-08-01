import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  mangaId: string;
  quantity: number;
}

interface CartContextType {
  cartSize: number;
  updateCartSize: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartSize, setCartSize] = useState(0);

  const updateCartSize = async () => {
    try {
      const response = await fetch("http://localhost:3000/carts/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      const size = data.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      setCartSize(size);
    } catch (error) {
      console.error("Failed to update cart size", error);
    }
  };

  useEffect(() => {
    // Polling every 5 seconds (adjust as necessary)
    const intervalId = setInterval(updateCartSize, 5000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <CartContext.Provider value={{ cartSize, updateCartSize }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
