import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { assets } from '../../../../frontend/src/assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        console.error("Error fetching orders");
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const statusHandler = async (event,orderId) =>{
 const response = await axios.post(url+"/api/order/status",{
  orderId,
  status:event.target.value
 })
 if(response.data.success){
  await fetchAllOrders();
 }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}
                    {itemIndex < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <span>{order.address.street},</span>
                <span>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</span>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={()=>statusHandler(event,order._id)} value={order.status}>
              <option value="Product Ordered">Product Ordered</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
