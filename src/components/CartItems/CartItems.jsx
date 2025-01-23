<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, { useContext, useEffect, useState } from "react";
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
<<<<<<< HEAD
  const { cartItems, removeFromCart, getTotalCartAmount, all_product, products } = useContext(ShopContext);
=======
  const { cartItems, removeFromCart, getTotalCartAmount, products } = useContext(ShopContext);
  const [localCartItems, setLocalCartItems] = useState(cartItems); // Local state to trigger re-renders
  const [localProducts, setLocalProducts] = useState(products); // Local state for products
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
  const navigate = useNavigate();
  
  console.log(products)
  console.log(cartItems)
  console.log(typeof products)
  console.log(typeof cartItems)

  // Sync local state with context changes
  useEffect(() => {
    setLocalCartItems(cartItems);
    setLocalProducts(products);
  }, [cartItems, products]); // Trigger updates whenever cartItems or products change

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
<<<<<<< HEAD
      {
      // Object.entries(cartItems).map(([productId, { quantity, size }]) => {
      //   const product = Object.entries(products).map((p) => p._id === (productId)); 
      
      cartItems.map((cartItem) => {
        const { productId, quantity, size } = cartItem;
      
        // Find the corresponding product in the products array
        const product = products.find((p) => p._id === productId);

        console.log("Product ID from cartItems:", typeof productId, productId);
        console.log("Product ID from cartItems:", typeof product, product);
=======
      {localCartItems.map((cartItem) => {
        const { productId, quantity, size } = cartItem;

        // Find the corresponding product in the products array
        const product = localProducts.find((p) => p._id === productId);

>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
        if (!product) {
          console.warn(`Product with ID ${productId} not found.`);
          return null;
        }

        return (
<<<<<<< HEAD
          <div key={productId} className="cartitem">
=======
          <div key={`${productId}-${size}`} className="cartitem">
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
            <img src={product.images[0]} alt={product.name} />
            <p>{product.name}</p>
            <p>Rs {product.price}</p>
            <p>{quantity}</p>
            <p>{size}</p>
            <p>Rs {quantity * product.price}</p>
<<<<<<< HEAD
            <button onClick={() => removeFromCart(productId,size)}>Remove</button>
=======
            <button onClick={() => removeFromCart(productId, size)}>Remove</button>
>>>>>>> 8455e46024ef807530d2b4b829cc5ef72ab4da18
          </div>
        );
      })}
      <hr />
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
