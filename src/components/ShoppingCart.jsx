import React, { useState, useCallback } from 'react';

const products = [
  { id: 1, name: 'Laptop', price: 50000 },
  { id: 2, name: 'Mobile', price: 30000 },
  { id: 3, name: 'Watch', price: 5000 },
];

const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div className="block">
      <h3>{product.name}</h3>
      <p>Price: Rs{product.price.toLocaleString()}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
});

export default function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h3>Products List</h3>
      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <div>
        <h3>Cart Summary</h3>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: Rs {totalPrice.toLocaleString()}</p>
      </div>
    </div>
  );
}

// Create a shopping cart
// Tasks
// Display all products.
// Create a ProductCard child component.
// Add "Add to Cart" button.
// Use  useCallback() to memorize the add-to-cart function.
// Use React.memo() on ProductCard.
// Display:
// Total Items in Cart
// Total Price
// Verify that ProductCard doesn't re-render unnecessarily.
