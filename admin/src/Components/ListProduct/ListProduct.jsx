import './ListProduct.css';
import { useState, useEffect } from 'react';
import cross_icon from '../../Assets/cross_icon.png';

const URL = "https://trendmart-backend-l7x8.onrender.com"; 

function ListProduct() {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch(`${URL}/allproducts`)
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const handleRemove = async (id) => {
        await fetch(`${URL}/removeproduct`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        await fetchInfo();
    }

    return (
        <div className="listproduct">
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return (
                        <>
                            <div key={index} className="listproduct-format-main listproduct-format">
                                <img src={product.image} alt="Product" className="listproduct-product-icon" />
                                <p>{product.name}</p>
                                <p>{product.old_price}</p>
                                <p>{product.new_price}</p>
                                <p>{product.category}</p>
                                <img src={cross_icon} className="listproduct-remove-icon" alt="Remove" onClick={() => handleRemove(product.id)} />
                            </div>
                            <hr />
                        </>
                    )
                })}
            </div>
        </div>
    );
}

export default ListProduct;
