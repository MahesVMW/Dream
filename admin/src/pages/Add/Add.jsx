import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    briefDescription: "", // Add this line
    price: "",
    category: "joggers"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("briefDescription", data.briefDescription); // Add this line
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          briefDescription: "", // Add this line
          price: "",
          category: "joggers"
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        console.log('Error:', response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onsubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='Type here'
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder='Write content here'
          ></textarea>
        </div>
        <div className="add-product-brief-description flex-col"> {/* Add this block */}
          <p>Brief description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.briefDescription}
            name="briefDescription"
            rows="3"
            placeholder='Brief description here'
          ></textarea>
        </div>
        <div className='add-category-price'>
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="joggers">joggers</option>
              <option value="formals">formals</option>
              <option value="hoodie">hoodie</option>
              <option value="jeans">jeans</option>
              <option value="trousers">trousers</option>
              <option value="tshirts">tshirts</option>
              <option value="shirts">shirts</option>
            </select>
          </div>
          <div className='add-price flex-col'>
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
              placeholder='$20'
            />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
};

export default Add;
