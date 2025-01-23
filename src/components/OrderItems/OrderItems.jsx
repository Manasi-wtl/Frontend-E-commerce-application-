import React, { useContext, useEffect, useState } from "react";
import "./OrderItems.css";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../config";
import axios from "axios";

const OrderItems = () => {
  const { products, token, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      // console.log(token)
      const token = localStorage.getItem("token"); // Get token from storage
      console.log(token);
      if (!token) {
        return null;
      }

      const response = await axios.get(BASEURL + "/api/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      console.log(products);
      setOrderData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
    console.log(orderData);
  }, []);

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {orderData.map((order) =>
        order.items.map((Item) => {
          const { productId, quantity, size } = Item;

          // Find the corresponding product in the products array
          const product = products.find((p) => p._id === productId);

          console.log("Product ID from order data:", productId);
          console.log("Product found:", product);

          if (!product) {
            console.warn(`Product with ID ${productId} not found.`);
            return null;
          }

          return (
            <div key={productId} className="cartitem">
              <img src={product.images[0]} alt={product.name} />
              <p>{product.name}</p>
              <p>Rs {product.price}</p>
              <p>{quantity}</p>
              <p>{size}</p>
              <p>Rs {quantity * product.price}</p>
              <button>Return</button>
            </div>
          );
        })
      )}
      <hr />
    </div>
  );
};

export default OrderItems;
