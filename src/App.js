import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="App">
        <Header cartItemsCount={cartItems.length} user={user} />
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route
            path="/products/:category"
            element={<ProductPage addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                updateQuantity={updateCartQuantity}
                removeItem={removeFromCart}
                clearCart={clearCart}
                user={user}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfilePage user={user} setUser={setUser} />}
          />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
