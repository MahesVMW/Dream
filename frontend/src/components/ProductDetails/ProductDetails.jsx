import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { food_list, addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);
    const product = food_list.find(item => item._id === id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details">
            <button className="back-btn ml-2 mt-5" onClick={() => navigate(-1)}>Back</button>
            <div className="product-details-image ml-3 mt-5">
                <img src={url + "/images/" + product.image} alt={product.name} />
            </div>
            <div className="product-details-info mt-5">
                <h2>{product.name}</h2>
                <p>{product.briefDescription}</p> {/* Add this line */}
                <p>${product.price}</p>
                {!cartItems[id]
                    ? <button onClick={() => addToCart(id)}>Add to Cart</button>
                    : <button className='remove-btn' onClick={() => removeFromCart(id)}>Remove from Cart</button>
                }
            </div>
        </div>
    );
}

export default ProductDetails;
