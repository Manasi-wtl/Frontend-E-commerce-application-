// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";

// const Orders = () => {
//   const { products, currency } = useContext(ShopContext);

//   // Ensure products is an array before using slice
//   const orderItems = Array.isArray(products) ? products.slice(1, 4) : [];

//   return (
//     <div className="border-t pt-16">
//       <div className="text-2xl">
//         <h1>MY ORDERS</h1>
//       </div>

//       <div>
//         {orderItems.map((item, index) => (
//           <div
//             key={index}
//             className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//           >
//             <div className="flex items-start gap-6 text-sm">
//               <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
//               <div>
//                 <p className="sm:text-base font-medium">{item.name}</p>
//                 <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
//                   <p className="text-lg">
//                     {currency}
//                     {item.price}
//                   </p>
//                   <p>Quantity: 1</p>
//                   <p>Size: M</p>
//                 </div>
//                 <p className="mt-2">
//                   Date: <span className="text-gray-400">25, July, 2024</span>
//                 </p>
//               </div>
//             </div>
//             <div className="md:w-1/2 flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="min-w-2" h-2 rounded-full bg-green-500></p>
//                 <p className="text-sm md:text-base"></p>
//               </div>
//               <button className="border px-4 py-2 text-sm font-medium rounded-sm">
//                 Track Order
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { orderData } = useContext(ShopContext);

  if (!orderData) return <div>No order data available</div>;

  const { address, amount, paymentMethod, items } = orderData;

  return (
    <div className="order-page">
      <h1>Order Summary</h1>
      <h2>Shipping Address</h2>
      <p>{address.firstName} {address.lastName}</p>
      <p>{address.street}, {address.city}, {address.state}, {address.zipcode}, {address.country}</p>
      <p>{address.phone}</p>
      <p>{address.email}</p>

      <h2>Payment Method</h2>
      <p>{paymentMethod}</p>

      <h2>Order Details</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>

      <h2>Total Amount: {amount}</h2>
    </div>
  );
};

export default Orders;
