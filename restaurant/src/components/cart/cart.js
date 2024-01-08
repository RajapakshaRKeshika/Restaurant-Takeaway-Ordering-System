import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import NavigationBar from '../navigation/navigation';
import './cart.css'; // Ensure this CSS file is updated with new styles
import Footer from '../footer/footer';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [email, setEmail] = useState(false);

  useEffect(() => {
    const cart = Cookies.get('cart');
    const user = Cookies.get('userSession');

    if (cart) {
      setCartItems(JSON.parse(cart));
    }

    
    if (user) {
        setEmail(user);
      }
  
  }, []);

  const removeFromCart = (itemName) => {
    const newCartItems = cartItems.filter(item => item !== itemName);
    setCartItems(newCartItems);
    Cookies.set('cart', JSON.stringify(newCartItems), { expires: 7 });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      customerName: name,
      deliveryAddress: address,
      orderItems: cartItems,
      email:email
    };

    // Replace with your actual POST request URL and logic
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setOrderSuccess(true);
        setCartItems([]);
        Cookies.remove('cart');
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="checkout-container">
        <h1>Checkout</h1>
        {!orderSuccess ? (
          <>
            <ul className="cart-items-list">
              {cartItems.map((itemName, index) => (
                <li key={index}>
                  {itemName}
                  <button onClick={() => removeFromCart(itemName)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="customer-info-form">
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <button type="submit">Place Order</button>
              </form>
            </div>
          </>
        ) : (
          <div className="order-success-message">
            Order placed successfully!
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Cart;
