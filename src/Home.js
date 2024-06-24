import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get('http://localhost:3000/items');
      setItems(res.data);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Welcome to Our Furniture Store</h1>
      <p>Discover a wide range of high-quality furniture for your home.</p>

      <h2>Items for Sale</h2>
      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
