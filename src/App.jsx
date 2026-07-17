import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}&accept-language=en`
          );
          const data = await response.json();
          setLocation({
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              "Unknown",
            state: data.address.state || "Unknown",
          });
        } catch (err) {
          console.warn("Geolocation reverse failed:", err);
        }
      },
      (err) => console.warn("Geolocation denied:", err.message)
    );
  }, []);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        {/* Unified Navbar with auth built-in */}
        <Navbar location={location} />

        {/* Page Routes */}
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/cart"     element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
};

export default App;