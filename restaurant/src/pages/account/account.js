import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './account.css'; // Make sure your CSS file is styled appropriately

const Account = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      const userEmail = Cookies.get('userSession'); // Retrieve the user's email from the cookie
      console.log(userEmail)
      try {
        const response = await fetch('http://localhost:5000/api/orders/');
        if (response.ok) {
          const allOrders = await response.json();
          // Assuming that the email is unique and there will only be one order per email
          const userOrder = allOrders.find(order => order.email === userEmail);
          if (userOrder) {
            setOrder(userOrder);
          } else {
            setError('Order not found for the given email.');
          }
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (e) {
        setError('There was an error accessing the orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []); // Empty dependency array to run only on mount

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
   <header className="navbar">
  <ul className="nav-links">
    <li><a href="/" className="nav-link">Home</a></li>
    <li><a href="/logout" className="nav-link">Logout</a></li>
  </ul>
</header>

      <main className="order-details-container">
        <h1>Order Details</h1>
        {order ? (
          <div className="order-information">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            {/* Render additional order details as needed */}
          </div>
        ) : (
          <div className="no-details">Order details not found.</div>
        )}
      </main>
    </>
  );
};

export default Account;
