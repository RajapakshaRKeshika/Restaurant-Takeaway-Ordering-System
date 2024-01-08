import React from 'react';
import Cookies from 'js-cookie';
import './card.css'; // Ensure this CSS file is updated with new styles

const printCartToConsole = () => {
  const cart = Cookies.get('cart'); // Get the cart cookie

  if (cart) {
    const cartItems = JSON.parse(cart); // Parse the cookie string to an array
    console.log('Cart Items:', cartItems); // Log the cart items to the console
  } else {
    console.log('No items in cart.');
  }
};
const addToCart = (productid) => {
  if (!productid) {
    console.error('Product ID is undefined or null, not adding to cart');
    return;
  }
  printCartToConsole();
  // Get the current cart, if it exists, or initialize a new array
  let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];

  // Check if the product already exists in the cart
  const productExists = cart.find((id) => id === productid);

  if (!productExists) {
    // Add the new product ID to the cart array
    cart.push(productid);
  } else {
    console.log('Product already in cart');
  }

  // Save the updated cart back to the cookie
  Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
};
const ItemCard = ({ productid,name, price, imageUrl }) => {
  
  return (
  
    <div className="grid-container">
      <img src={`http://localhost:5000/uploads/${imageUrl}`} alt={name} className="item-image" />
      <div className="grid-itemt">
        <div className="item-info">
          <h3>{name}</h3>
          <p>{price}</p>
        </div>
        <div className="item-add">
          <button className="add-button" onClick={() => addToCart(name)}>+</button>
        </div>
      </div>
    </div>
  

  );
};

export default ItemCard;
