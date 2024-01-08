import React, { useState, useEffect } from 'react';
import './offer.css'; 
import NavigationBar from '../../components/navigation/navigation'; 
import { FaTag } from 'react-icons/fa';
import Footer from '../../components/footer/footer';

const OffersPage = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
  
    const fetchOffers = async () => {
      const response = await fetch('http://localhost:5000/offers');
      if (!response.ok) throw new Error('Failed to fetch offers');
      const data = await response.json();
      setOffers(data);
    };
    fetchOffers();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="offers-page-container">
        {offers.map((offer, index) => (
          <div key={offer._id} className="offer-card">
            <div className="offer-header">
              <FaTag className="offer-icon" /> {}
              <span className="offer-title">Special Offer!</span>
            </div>
            <img 
              src={`http://localhost:5000/${offer.imageUrl}`} 
              alt={`Offer ${offer.name}`} 
              className="promo-image" 
            />
            <div className="offer-details">
              <h3>{offer.name}</h3>
              <p>{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default OffersPage;
