import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ setShowlogin }) => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    // Calculate total items in the cart
    const totalItems = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

    // Debugging: Log cartItems and totalItems to ensure they are being updated
    console.log("Cart Items:", cartItems);
    console.log("Total Items:", totalItems);

    const handleProceedToCheckout = () => {
        if (!token) {
            setShowlogin(true);
        } else {
            navigate('/order');
        }
    };

    return (
        <div className='cart'>
            <div className="cart-items">
                {totalItems === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <div className="cart-items-title">
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>
                        <br />
                        <hr />
                        {food_list.map((item) => {
                            if (cartItems[item._id] > 0) {
                                return (
                                    <div key={item._id}>
                                        <div className="cart-items-title cart-items-item">
                                            <img src={`${url}/images/${item.image}`} alt="" />
                                            <p>{item.name}</p>
                                            <p>${item.price}</p>
                                            <p>{cartItems[item._id]}</p>
                                            <p>${item.price * cartItems[item._id]}</p>
                                            <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </>
                )}
            </div>
            {totalItems > 0 && (
                <div className="cart-bottom">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                            </div>
                        </div>
                        <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                    </div>
                    <div className="cart-promocode">
                        <div>
                            <p>If you have a promo code, enter it here</p>
                            <div className="cart-promocode-input">
                                <input type="text" placeholder='promo code' />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
