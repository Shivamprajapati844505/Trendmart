import './RelatedProducts.css'
import Item from './../Item/Item';
import { useState, useEffect } from 'react';

const URL = "https://trendmart-backend-l7x8.onrender.com";  // Define the base URL here

function RelatedProducts() {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetch(`${URL}/relatedproducts`)
        .then((response) => response.json())
        .then((data) => setRelatedProducts(data))
        .catch((err) => console.error("Error fetching related products:", err));
    }, []);

    return ( 
        <div className="relatedprodutcs">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedprodutcs-item">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((item, i) => (
                        <Item
                            key={i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default RelatedProducts;
