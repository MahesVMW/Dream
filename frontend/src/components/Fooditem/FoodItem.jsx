import React, { useEffect, useRef, useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, image, name, description, price }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const foodItemRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (foodItemRef.current) {
            foodItemRef.current.classList.add('animate-fade-down');
          }
        } else {
          if (foodItemRef.current) {
            foodItemRef.current.classList.remove('animate-fade-down');
          }
        }
      },
      { threshold: 0.1 }
    );

    const { current } = foodItemRef;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  const handleItemClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="food-item" ref={foodItemRef}>
      <div className="food-item-img-container">
        <img className="food-item-image" src={url + "/images/" + image} alt={name} />
        {!cartItems[id] ? (
          <img className='add' onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_white} alt="Add to cart" />
        ) : (
          <div className='food-item-counter'>
            <img onClick={(e) => { e.stopPropagation(); removeFromCart(id); }} src={assets.remove_icon_red} alt="Remove from cart" />
            <p className='mt-2'>{cartItems[id]}</p>
            <img onClick={(e) => { e.stopPropagation(); addToCart(id); }} src={assets.add_icon_green} alt="Add to cart" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
        <button className="view-item-btn" onClick={handleItemClick}>view item</button>
      </div>
    </div>
  );
};

export default FoodItem;
