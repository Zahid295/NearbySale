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
      <h1>Items for Sale</h1>
      {items.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
