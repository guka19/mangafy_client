import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  mangaId: string;
  quantity: number;
}

interface CartContextType {
  cartSize: number;
  cartItems: CartItem[] | null;
  updateCartSize: () => void;
  addToCart: (mangaId: string, quantity: number) => void;
  updateCartItem: (mangaId: string, quantity: number) => void;
  removeFromCart: (mangaId: string) => void;
  setCart: (cart: any) => void; // Add this line
  clearCart: () => void; // Add this line
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartSize, setCartSize] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);

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
      setCartItems(data.items);

      const size = data.items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      setCartSize(size);
    } catch (error) {
      console.error("Failed to update cart size", error);
    }
  };

  const addToCart = async (mangaId: string, quantity: number) => {
    try {
      const response = await fetch("http://localhost:3000/carts/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({ mangaId, quantity })
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }
      await updateCartSize(); // Refresh cart size and items after adding
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const updateCartItem = async (mangaId: string, quantity: number) => {
    try {
      const response = await fetch("http://localhost:3000/carts/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({ mangaId, quantity })
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }
      await updateCartSize(); // Refresh cart size and items after updating
    } catch (error) {
      console.error("Failed to update cart item", error);
    }
  };

  const removeFromCart = async (mangaId: string) => {
    try {
      const response = await fetch("http://localhost:3000/carts/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({ mangaId })
      });

      if (!response.ok) {
        throw new Error("Failed to remove from cart");
      }
      await updateCartSize(); // Refresh cart size and items after removal
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const setCart = (cart: any) => {
    setCartItems(cart.items);
    setCartSize(cart.items.reduce((total: number, item: CartItem) => total + item.quantity, 0));
  };

  const clearCart = async () => {
    try {
      const response = await fetch("http://localhost:3000/carts/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
      setCart({ items: [] });
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  useEffect(() => {
    // Polling every 5 seconds (adjust as necessary)
    const intervalId = setInterval(updateCartSize, 5000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <CartContext.Provider value={{ cartSize, cartItems, updateCartSize, addToCart, updateCartItem, removeFromCart, setCart, clearCart }}>
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
