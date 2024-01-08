import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/navigation/navigation';
import ItemCard from '../../components/ItemCard/ItemCard';
import CategoryMenu from '../../components/category/category';
import Footer from '../../components/footer/footer';
import image from '../images/1.jpg';
import './home.css'; 




const Home = () => {
 

  return (
    <>
      <NavigationBar />
   <div className='image'>
   <img src = {image}/>
   </div>
      <Footer/>
    </>
  );
};

export default Home;
