import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    console.log(data);
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log('Placing order...');
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Total amount including delivery charges
    };
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
  
      if (response.data.success) {
        const { razorpayOrderId, amount, currency, key_id } = response.data;
  
        // Trigger Razorpay Checkout
        const options = {
          key: key_id,
          amount: amount,
          currency: currency,
          name: "Your Company Name",
          description: "Order Description",
          order_id: razorpayOrderId,
          handler: async function (response) {
            try {
              await axios.post(url + "/api/order/verify", {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                success: "true",
              });
  
              enqueueSnackbar("Payment Successful", { variant: 'success' });
  
              // Clear cart and navigate after a short delay
              setTimeout(() => {
                clearCart(); 
                navigate('/myorders');
              }, 3000);
              
            } catch (error) {
              console.error('Error verifying payment:', error);
              enqueueSnackbar('Error verifying payment', { variant: 'error' });
            }
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.log("Error placing order");
        enqueueSnackbar("Error placing order", { variant: 'error' });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      enqueueSnackbar('Error placing order', { variant: 'error' });
    }
  };
  
  const clearCart = () => {
    setCartItems({}); // Clear cart items
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate]);

  return (
    <div className="row mt-5">
      <form onSubmit={placeOrder} className="container mt-5 my-2 px-5 border rounded">
        <div className='row'>
          <div className="col-md-6">
            <h2 className="mb-4 mt-2">Delivery Information</h2>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" className="form-control" placeholder="First name" required />
              </div>
              <div className="form-group col-md-6">
                <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" className="form-control" placeholder="Last name" required />
              </div>
            </div>
            <div className="form-group">
              <input name='email' onChange={onChangeHandler} value={data.email} type="email" className="form-control" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input name='street' onChange={onChangeHandler} value={data.street} type="text" className="form-control" placeholder="Street" required />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input name='city' onChange={onChangeHandler} value={data.city} type="text" className="form-control" placeholder="City" required />
              </div>
              <div className="form-group col-md-6">
                <input name='state' onChange={onChangeHandler} value={data.state} type="text" className="form-control" placeholder="State" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" className="form-control" placeholder="Zip code" required />
              </div>
              <div className="form-group col-md-6">
                <input name='country' onChange={onChangeHandler} value={data.country} type="text" className="form-control" placeholder="Country" required />
              </div>
            </div>
            <div className="form-group">
              <input name='phone' onChange={onChangeHandler} value={data.phone} type="tel" className="form-control" placeholder="Phone" required />
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="border p-4 rounded">
              <h2 className="mb-4">Cart Totals</h2>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹ {getTotalCartAmount()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery</span>
                <span>₹ 2</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <strong>Total</strong>
                <strong>₹ {getTotalCartAmount() + 2}</strong>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
