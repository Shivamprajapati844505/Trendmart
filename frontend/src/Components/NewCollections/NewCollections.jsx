import './NewCollections.css'
import Item from '../Item/Item'
import { useState, useEffect } from 'react';

const URL = "https://trendmart-backend-l7x8.onrender.com";  // Define the base URL here

function NewCollections() {
  const [new_collections, setNew_collections] = useState([]);

  useEffect(() => {
    fetch(`${URL}/newcollections`)
      .then((response) => response.json())
      .then((data) => setNew_collections(data))
      .catch((error) => console.error("Error fetching new collections:", error));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewCollections;
