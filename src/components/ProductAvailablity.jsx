import React, { useState } from 'react';
//need to work without useState
const ProductAvailablity = () => {
  const products = [
    { id: 1, name: 'Laptop', stock: 5 },
    { id: 2, name: 'Mobile', stock: 0 },
    { id: 3, name: 'Watch', stock: 10 },
  ];
  const [filteredProduct, setFilteredProduct] = useState(products);

  const handleShowAll = () => {
    setFilteredProduct(products);
  };

  const handleShowInStock = () => {
    const inStock = products.filter((p) => p.stock > 0);
    setFilteredProduct(inStock);
  };

  const handleShowOutOfStock = () => {
    const outOfStock = products.filter((p) => p.stock === 0);
    setFilteredProduct(outOfStock);
  };

  return (
    <>
      <button onClick={handleShowAll}>Show All</button>
      <button onClick={handleShowInStock}>Show In Stock</button>
      <button onClick={handleShowOutOfStock}>Show Out of Stock</button>

      <ul>
        {filteredProduct.map((product) => (
          <li key={product.id}>
            {product.name} - {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </li>
        ))}
      </ul>
    </>
  );
};
export default ProductAvailablity;
// Requirements:-
// Laptop - In Stock
// Mobile - Out of Stock
// Watch - In Stock
// Use conditional rendering and event handling to filter products.
