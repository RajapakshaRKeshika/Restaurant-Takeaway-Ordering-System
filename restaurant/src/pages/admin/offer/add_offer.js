import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './add_offer.css'; 
import AdminNavigation from '../admin_navigation/admin_navigation';

const AddOffer = () => {
  const [promotionName, setPromotionName] = useState('');
  const [promotionImage, setPromotionImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPromotions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/offers');
        if (!response.ok) {
          throw new Error('Could not fetch promotions');
        }
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchPromotions();
  }, []);
  const handleUpdate = async (promotionId, newName) => {
    try {
      const response = await fetch(`http://localhost:5000/offers/${promotionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ name: newName }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Offer updated successfully:', data);
      
      } else {
        console.error('Failed to update promotion:', data.message);
       
      }
    } catch (error) {
      console.error('Error updating promotion:', error);
  
    }
  };
  
  const handleDelete = async (promotionId) => {
    if (!window.confirm("Are you sure you want to delete this promotion?")) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/offers/${promotionId}`, {
        method: 'DELETE',
        headers: {
         
        },
    
      });
  
      if (response.ok) {
        console.log(`Promotion with ID ${promotionId} deleted successfully.`);
      } else {
        throw new Error('Failed to delete the promotion.');
      }
    } catch (error) {
      console.error(`Error deleting promotion with ID ${promotionId}:`, error);
    }
  };
  






  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', promotionName);
    if (promotionImage) {
      formData.append('itemImage', promotionImage, promotionImage.name);
    }

    try {
      const response = await fetch('http://localhost:5000/admin/add-promotion', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Promotion added successfully!');
        setPromotionName('');
        setPromotionImage(null);
      } else {
        setSuccessMessage('Failed to add promotion');
      }
    } catch (error) {
      setSuccessMessage('Error submitting form');
    }
  };

  const handleInputChange = (e) => {
    setPromotionName(e.target.value);
  };

  const handleFileChange = (e) => {
    setPromotionImage(e.target.files[0]);
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
                  <label htmlFor="promotionName">Offer Name:</label>
                  <input
                    type="text"
                    id="promotionName"
                    name="promotionName"
                    value={promotionName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="promotionImage">Promotion Image:</label>
                  <input
                    type="file"
                    id="promotionImage"
                    name="promotionImage"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit">Add Promotion</button>
              </form>
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
            </div>
          </div>



          <div>
  {isLoading && <p>Loading...</p>}
  {error && <p>Error: {error}</p>}
  {!isLoading && !error && (
   <div className="offers-container">
   {promotions.map((promotion) => (
     <div key={promotion._id} className="offer-item">
       <div className="offer-details">
         <input 
           className="offer-input"
           type="text" 
           defaultValue={promotion.name}
           onBlur={(e) => handleUpdate(promotion._id, e.target.value)}
         />
         <div className="offer-action-buttons">
           <button 
             className="btn update" 
             onClick={() => handleUpdate(promotion._id, promotion.name)}
           >
             Update
           </button>
           <button 
             className="btn delete" 
             onClick={() => handleDelete(promotion._id)}
           >
             Delete
           </button>
         </div>
       </div>
       <img 
         className="offer-image"
         src={`http://localhost:5000/${promotion.imageUrl}`} 
         alt={promotion.name} 
       />
     </div>
   ))}
 </div>
  )}
    </div>



        </div>
      </div>
    </>
  );
};

export default AddOffer;
