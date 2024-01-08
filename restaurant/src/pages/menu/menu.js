import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/navigation/navigation';
import ItemCard from '../../components/ItemCard/ItemCard';
import CategoryMenu from '../../components/category/category';
import Footer from '../../components/footer/footer';


const categories = [
    { id: 'rice_curries', name: 'Rice & Curries' },
    { id: 'street_foods', name: 'Street Foods' },
    { id: 'vegetarian', name: 'Vegetarian' },
    { id: 'seafood', name: 'Seafood' },
    { id: 'sweets', name: 'Sweets & Desserts' },
  ];
  

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('seafood');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchItems();
  }, []);

  const processItems = (items) => 
    items.map(item => ({
      id: item._id,
      productid: item._id,
      name: item.name,
      price: item.price + ' LKR',
      imageUrl: item.image,
      category: item.category,
    }));

  const getFilteredItems = (items, category) =>
    processItems(items).filter(item => item.category === category);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredItems = getFilteredItems(items, activeCategory);

  return (
    <>
      <NavigationBar />
      <div className="menu-layout">
        <CategoryMenu
          categories={categories}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <div className="items-container">
          <div className="items-display">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => <ItemCard key={item.id} {...item} />)
            ) : (
              <p>No items to display in this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default MenuPage;
