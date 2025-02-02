import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Item/Item'
import { useState, useEffect } from 'react';

const URL = "https://trendmart-backend-l7x8.onrender.com";  // Define the base URL here

function Popular() {
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch(`${URL}/popularinwomen`)
        .then((response) => response.json())
        .then((data) => setPopularProducts(data))
        .catch((error) => console.error("Error fetching popular products:", error));
    }, []);

    return ( 
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {popularProducts.map((item, i) => {
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

export default Popular;
