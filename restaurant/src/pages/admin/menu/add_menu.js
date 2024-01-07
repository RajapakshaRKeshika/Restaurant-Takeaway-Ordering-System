
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './add_menu.css'; 
import AdminNavigation from '../admin_navigation/admin_navigation';

const AddMenu = () => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemImage, setItemImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError ] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [editedPrices, setEditedPrices] = useState({});
    const handlePriceChange = (itemId, newPrice) => {
        setEditedPrices({ ...editedPrices, [itemId]: newPrice });
      };
      
    useEffect(() => {
        const fetchMenuItems = async () => {
          try {
            const response = await fetch('http://localhost:5000/menu');
            if (!response.ok) {
              throw new Error('Could not fetch menu items');
            }
            const data = await response.json();
            setMenuItems(data);
          } catch (error) {
            setError(error.message);
          }
        };
      
        fetchMenuItems();
      }, []);
      
      const handleUpdate = async (itemId) => {
        const updatedPrice = editedPrices[itemId];
        if (!updatedPrice) {
          console.error('No changes made to the price or price is invalid');
          return;
        }
      
        try {
          const response = await fetch(`http://localhost:5000/menu/${itemId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ price: updatedPrice }),
          });
      
          if (!response.ok) {
            throw new Error('Could not update the menu item');
          }
      
       
          setMenuItems(menuItems.map(item => item._id === itemId ? { ...item, price: updatedPrice } : item));
          setSuccessMessage2('Menu item updated successfully!');
      
      
    
          const newEditedPrices = { ...editedPrices };
          delete newEditedPrices[itemId];
          setEditedPrices(newEditedPrices);
      
        } catch (error) {
          console.error(error.message);

        }
      };
      
      const handleDelete = async (itemId) => {
    
        if (!window.confirm('Are you sure you want to delete this menu item?')) {
          return;
        }
      
        try {
          const response = await fetch(`http://localhost:5000/menu/${itemId}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Could not delete the menu item');
          }
      
         
          setMenuItems(menuItems.filter(item => item._id !== itemId));
          setSuccessMessage2('Menu item deleted successfully!');
        } catch (error) {
          console.error(error.message);
          setError(error.message);
        }
      };
      
      
       const handleFormSubmit = async (e) => {
          e.preventDefault();
      
          
          const formData = new FormData();
          formData.append('name', itemName);
          formData.append('price', itemPrice);
          formData.append('category', itemCategory);
          if (itemImage) {
            formData.append('image', itemImage, itemImage.name);
          }
      
          try {
          
            const response = await fetch('http://localhost:5000/admin/menu/add', {
              method: 'POST',
              body: formData,
      
            });
      

            const data = await response.json();
            if (response.ok) {
              console.log('Menu item added successfully', data);
              setSuccessMessage('Menu item added successfully!');
    
              setItemName('');
              setItemPrice('');
              setItemCategory('');
              setItemImage(null);
              // ...
            } else {
              console.error('Failed to add menu item', data.message);
              setSuccessMessage('');
            }
            
          } catch (error) {
            console.error('Error submitting form', error);
          }
        };
      
      
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          switch (name) {
            case 'itemName':
              setItemName(value);
              break;
            case 'itemPrice':
              setItemPrice(value);
              break;
            case 'itemCategory':
              setItemCategory(value);
              break;
            default:
              break;
          }
        };
      
  
        const handleFileChange = (e) => {
          setItemImage(e.target.files[0]);
        };
      
      
  return (
    <>
    <AdminNavigation/>
      <div className="admin-dashboard-container">
        <div className="admin-dashboard">
          <div className="admin-content">
          
            <div className="admin-form-container">
            <form className="admin-menu-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={itemName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="itemPrice">Price:</label>
        <input
          type="number"
          id="itemPrice"
          name="itemPrice"
          value={itemPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="itemCategory">Category:</label>
        <select
          id="itemCategory"
          name="itemCategory"
          value={itemCategory}
          onChange={handleInputChange}
          required
        >



          <option value="">Select a category</option>
          <option value="rice_curries">Rice & Curries</option>
          <option value="street_foods">Street Foods</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="seafood">Seafood</option>
          <option value="sweets">Sweets & Desserts</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="itemImage">Item Image:</label>
        <input
          type="file"
          id="itemImage"
          name="itemImage"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
              {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
          </div>

          <div>
            <h2>Menu</h2>
            {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <input
                  type="text"
                  value={editedPrices[item._id] ?? item.price}
                  onChange={(e) => handlePriceChange(item._id, e.target.value)}
                />
              </td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => handleUpdate(item._id)}>Update</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMenu;
