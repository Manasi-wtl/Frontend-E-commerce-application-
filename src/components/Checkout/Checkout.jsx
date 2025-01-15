import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import razorpay from "../Assets/razorpay_logo.png";
import stripe from "../Assets/stripe_logo.png";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, getTotalCartAmount, setOrderData } = useContext(ShopContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
    email: "",
  });

  const [selectedPayment, setSelectedPayment] = useState(""); // Track selected payment option

  const deliveryFree = 0; // Fixed delivery charge
  const subtotal = getTotalCartAmount();
  const totalAmount = subtotal + deliveryFree;

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    try {
      const orderData = {
        address: formData,
        amount: totalAmount,
        paymentMethod: selectedPayment,
        items: cartItems
      };
      setOrderData(orderData)
      navigate('/orders')

      console.log(orderData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmitHandler}>
      {/* Left Section: Shipping Address and Payment Method */}
      <div className="form-left">
        {/* Payment Method */}
        <div className="payment-method">
          <h2 className="section-title">Payment Options</h2>
          <div className="payment-options">
            <div
              className={`payment-option ${
                selectedPayment === "stripe" ? "selected" : ""
              }`}
              onClick={() => handlePaymentSelect("stripe")}
            >
              <img src={stripe} alt="Stripe" className="payment-logo" />
              <span className="payment-text">Stripe</span>
            </div>
            <div
              className={`payment-option ${
                selectedPayment === "razorpay" ? "selected" : ""
              }`}
              onClick={() => handlePaymentSelect("razorpay")}
            >
              <img src={razorpay} alt="Razorpay" className="payment-logo" />
              <span className="payment-text">Razorpay</span>
            </div>
            <div
              className={`payment-option ${
                selectedPayment === "cod" ? "selected" : ""
              }`}
              onClick={() => handlePaymentSelect("cod")}
            >
              <span className="payment-text">Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="shipping-address">
          <h2 className="section-title">Shipping Address</h2>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              className="form-input"
              placeholder="First Name"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              className="form-input"
              placeholder="Last Name"
              onChange={onChangeHandler}
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="form-input"
            placeholder="Email Address"
            onChange={onChangeHandler}
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            className="form-input"
            placeholder="Phone Number"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="street"
            value={formData.street}
            className="form-input"
            placeholder="Street Address"
            onChange={onChangeHandler}
          />
          <div className="form-row">
            <input
              type="text"
              name="city"
              value={formData.city}
              className="form-input"
              placeholder="City"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              className="form-input"
              placeholder="State"
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              className="form-input"
              placeholder="Zipcode"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              className="form-input"
              placeholder="Country"
              onChange={onChangeHandler}
            />
          </div>
        </div>
      </div>

      {/* Right Section: Cart Totals */}
      <div className="form-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-item">
            <span>Subtotal:</span>
            <span>Rs {subtotal}</span>
          </div>
          <div className="cart-total-item">
            <span>Shipping Fee:</span>
            <span>Rs {deliveryFree}</span>
          </div>
          <div className="cart-total-item">
            <span>Total:</span>
            <span>Rs {totalAmount}</span>
          </div>
        </div>
        <button type="submit" className="submit-button" onClick={() =>navigate('/orders')}>
          PLACE ORDER
        </button>
      </div>
    </form>
  );
};

export default Checkout;
