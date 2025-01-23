import React, { createContext, useEffect, useState, useCallback } from "react";
import all_product from "../components/Assets/all_product";
import axios from "axios";
import { BASEURL } from "../config";
<<<<<<< HEAD
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
=======
import { jwtDecode } from "jwt-decode";
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18

const delivery_fee = 0;

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

<<<<<<< HEAD
  const addToCart = async (productId, size) => {
    if (token) {
      try {
        // Optimistically update the cart state
        setCartItems((prevItems) => {
          const updatedItems = [...prevItems];
          const existingItem = updatedItems.find((item) => item.productId === productId);

          if (existingItem) {
            existingItem.quantity += 1;
            existingItem.size = size;
          } else {
            updatedItems.push({ productId, quantity: 1, size });
          }

          return updatedItems;
        });

        // Make API call to add to cart
        const response = await axios.post(
          BASEURL + '/api/cart/add',
          { productId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Response:', response.data);
        await getTotalCartItems(token); // Fetch updated cart from the server

      } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
          console.error('API Error:', error.response.data);
        }
=======
  // Function to validate and set token
  const validateToken = () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decodedToken = jwtDecode(savedToken);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp > currentTime) {
          setToken(savedToken); // Set valid token
        } else {
          console.error("Token has expired.");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
      }
    }
  };

<<<<<<< HEAD
  const getTotalCartAmount = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId); // Find product by ID
      if (product) {
        total += product.price * cartItem.quantity; // Calculate price for item
      }
      return total;
    }, 0);
  };

  const getTotalCartItems = useCallback(async (token) => {
    if (token) {
      try {
        const response = await axios.get(
          BASEURL + '/api/cart/',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Cart Items:', response.data.items);
        const items = response.data.items;
        setCartItems(items);

        // Calculate the total number of items
        const totalItems = items.reduce((total, { quantity }) => total + quantity, 0);

        return { items, totalItems };
      } catch (error) {
        console.log('Failed to fetch cart items:', error);
        return { items: [], totalItems: 0 };
      }
    } else {
      console.log('No token provided.');
      return { items: [], totalItems: 0 };
    }
  }, []);

  const removeFromCart = useCallback(async (productId, size) => {
    if (token) {
      try {
        const response = await axios.post(
          BASEURL + '/api/cart/remove',
          { productId, size },
          { headers: { Authorization:` Bearer ${token}` } }
        );
        console.log('Response:', response.data);
        await getTotalCartItems(token);
      } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
          console.error('API Error:', error.response.data);
        }
      }
    }
  }, [token, getTotalCartItems]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && savedToken) {
      setToken(savedToken);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getTotalCartItems(token);
    }
  }, [token, getTotalCartItems]);

=======
  // Validate token on component mount
  useEffect(() => {
    validateToken();
  }, []);

  // Fetch products from API
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
  const getProducts = async () => {
    try {
      const response = await axios.get(BASEURL + "/api/products");
      if (response.status === 200) {
<<<<<<< HEAD
        setProducts(response.data.products); // Update state with fetched products
        // console.log("Fetched products:", response.data.products); // Log the fetched data
=======
        setProducts(response.data.products);
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
      } else {
        console.error("Failed to fetch products. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    getProducts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Log products whenever they update
  useEffect(() => {
    // console.log("Updated products:", products);
  }, [products]); // Runs whenever products changes

  // Function to calculate total number of items in the cart
  const calculateTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
=======
  // Fetch total cart items
  const getTotalCartItems = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get(BASEURL + "/api/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Failed to fetch cart items:", error.message);
        if (error.response) {
          console.error("API Error:", error.response.data);
        }
      }
    } else {
      console.error("No token provided.");
    }
  }, [token]);

  // Add item to cart
  const addToCart = async (productId, size) => {
    if (token) {
      try {
        const response = await axios.post(
          BASEURL + "/api/cart/add",
          { productId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Add to cart response:", response.data);
        await getTotalCartItems();
      } catch (error) {
        console.error("Error adding to cart:", error.message);
        if (error.response) {
          console.error("API Error:", error.response.data);
        }
      }
    } else {
      console.error("No token found. Please log in.");
    }
  };

  // Remove item from cart
  const removeFromCart = useCallback(
    async (productId, size) => {
      if (token) {
        try {
          const response = await axios.post(
            BASEURL + "/api/cart/remove",
            { productId, size },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("Remove from cart response:", response.data);
          await getTotalCartItems();
        } catch (error) {
          console.error("Error removing from cart:", error.message);
          if (error.response) {
            console.error("API Error:", error.response.data);
          }
        }
      }
    },
    [token, getTotalCartItems]
  );

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      if (product) {
        total += product.price * cartItem.quantity;
      }
      return total;
    }, 0);
  };

  // Calculate total number of items in cart
  const calculateTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (token) {
      getTotalCartItems();
    }
  }, [token, getTotalCartItems]);

  useEffect(() => {
    getProducts();
  }, []);
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18

  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
<<<<<<< HEAD
    getTotalCartItems, // Add this to the context value
    calculateTotalCartItems, // Added custom logic here
=======
    calculateTotalCartItems,
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
    all_product,
    searchTerm,
    setSearchTerm,
    delivery_fee,
    setCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider


