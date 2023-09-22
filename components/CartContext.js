import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const generateLocalId = () => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomSuffix}`;
  };

  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const storedCart = JSON.parse(ls.getItem("cart"));
      console.log("Stored Cart:", storedCart);
      setCartProducts(storedCart);
    }
  }, [ls]);

  function addProduct(productId, scent, decoration) {
    const existingProductIndex = cartProducts.findIndex(
      (item) =>
        item.productId === productId &&
        item.selectedScent === scent &&
        item.selectedDecoration === decoration
    );

    if (existingProductIndex !== -1) {
      const updatedCartProducts = cartProducts.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartProducts(updatedCartProducts);
    } else {
      setCartProducts((prev) => [
        ...prev,
        {
          localId: generateLocalId(),
          productId,
          selectedScent: scent,
          selectedDecoration: decoration,
          quantity: 1,
        },
      ]);
    }
  }

  function updateQuantity(localId, newQuantity) {
    if (newQuantity <= 0) {
      removeProduct(localId);
      return;
    }
    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item.localId === localId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function removeProduct(localId) {
    setCartProducts((prevCart) =>
      prevCart.filter((item) => item.localId !== localId)
    );
  }

  function clearCart() {
    console.log("Clearing cart");
    setCartProducts([]);
    if (ls) {
      ls.removeItem("cart"); // Clear cart data from local storage
    }
  }

  console.log("Current Cart:", cartProducts);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        updateQuantity,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
