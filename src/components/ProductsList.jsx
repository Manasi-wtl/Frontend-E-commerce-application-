import React, { useState } from "react";
import "../pages/CSS/ProductList.css";

const ProductsList = ({ products, onEditProduct, onDeleteProduct }) => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditedProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct({});
  };

  const handleSaveEdit = () => {
    onEditProduct(editedProduct);
    setEditingProductId(null);
    setEditedProduct({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Size</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                {editingProductId === product.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="category"
                        value={editedProduct.category}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="size"
                        value={editedProduct.size}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      {product.image instanceof File ? (
                        <img
                          src={URL.createObjectURL(product.image)}
                          alt={product.name}
                          width="50"
                        />
                      ) : (
                        <img
                          src={product.image}
                          alt={product.name}
                          width="50"
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>Rs {product.price}</td>
                    <td>{product.size}</td>
                    <td>
                      {product.image instanceof File ? (
                        <img
                          src={URL.createObjectURL(product.image)}
                          alt={product.name}
                          width="50"
                        />
                      ) : (
                        <img
                          src={product.image}
                          alt={product.name}
                          width="50"
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEditClick(product)}>
                        Edit
                      </button>
                      <button onClick={() => onDeleteProduct(product.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductsList;
