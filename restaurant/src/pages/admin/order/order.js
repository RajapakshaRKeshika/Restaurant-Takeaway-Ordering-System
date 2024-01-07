import React, { useState, useEffect } from 'react';
import './order.css';
import AdminNavigation from '../admin_navigation/admin_navigation';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [editedOrders, setEditedOrders] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
          setLoading(true);
          try {
            const response = await fetch('http://localhost:5000/api/orders');
            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();
            setOrders(data);
            setEditedOrders(data.reduce((acc, order) => ({ ...acc, [order._id]: order }), {}));
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrders();
      }, []);
    
const handleInputChange = (orderId, field, value) => {
  setEditedOrders(prevOrders => ({
    ...prevOrders,
    [orderId]: { ...prevOrders[orderId], [field]: value }
  }));
};

      const updateOrder = async (orderId) => {
        try {
          const orderToUpdate = editedOrders[orderId];

          const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderToUpdate),
          });
          window.location.reload();

          console.log(orderToUpdate);

          const data = await response.json();
          if (response.ok) {
            console.log('Order updated successfully', data);
         
            setOrders(orders.map(order => order._id === orderId ? data : order));
          } else {
            console.error('Failed to update order', data.message);
          }
        } catch (error) {
          console.error('There was an error updating the order:', error);
        }
      };
    
      const deleteOrder = async (orderId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            console.log('Order deleted successfully');
            setOrders(orders.filter(order => order._id !== orderId));
          } else {
            console.error('Failed to delete order');
          }
        } catch (error) {
          console.error('There was an error deleting the order:', error);
        }
      };
    
      return (
        <>
        <AdminNavigation/>
        <div className="admin-dashboard-container">
          <div className="admin-dashboard">
            <div className="orders-container">
              {loading ? (
                <p>Loading orders...</p>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-details">
                     <b>  Order items: </b> 
                      {order.orderItems.map((item, itemIndex) => (
                        <span key={itemIndex} className="order-item-name">{item.itemName}</span>
                      ))}
                      <br/>
                    </div>
                    <div className="order-inputs">
                      <input
                        type="text"
                        value={editedOrders[order._id]?.email || ''}
                        onChange={(e) => handleInputChange(order._id, 'email', e.target.value)}
                      />
                      <input
                        type="text"
                        value={editedOrders[order._id]?.deliveryAddress || ''}
                        onChange={(e) => handleInputChange(order._id, 'deliveryAddress', e.target.value)}
                      />
                    </div>
                    <div className="order-actions">
                      <button onClick={() => updateOrder(order._id)}>Update</button>
                      <button onClick={() => deleteOrder(order._id)}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        </>
      );
};

export default OrdersPage;
