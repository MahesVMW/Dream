import React from 'react';
import styles from './About.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { assets } from '../../assets/assets';

const About = () => {
  return (
    <div className={`${styles.container} my-5 mx-5`}>
      <div className="row">
        <div className="col-md-6">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={assets.cotton}
                alt="Cotton"
              />
              <Carousel.Caption>
                <h3>High-Quality Cotton</h3>
                <p className='text-info'>Our garments are made from the finest cotton, ensuring comfort and durability.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={assets.stitching}
                alt="Stitching"
              />
              <Carousel.Caption>
                <h3>Expert Stitching</h3>
                <p className='text-info'>Each piece is meticulously stitched by our skilled artisans to guarantee the best quality.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={assets.clothes}
                alt="Clothing"
              />
              <Carousel.Caption>
                <h3>Fashionable Clothing</h3>
                <p className='text-info'>Discover a wide range of stylish clothing that caters to all your fashion needs.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-md-6">
          <h2>About Our Clothing Store</h2>
          <p className={styles.about}>
            Welcome to our clothing store! We pride ourselves on offering the latest and greatest in fashion, 
            with a focus on quality and style. Our store is known for its diverse collection of clothing and 
            accessories that cater to all tastes and preferences.
          </p>
          <p className={styles.about}>
            Our garments are crafted from high-quality materials to ensure durability and comfort. We source 
            fabrics from trusted suppliers and prioritize ethical practices in our production process.
          </p>
          <p className={styles.about}>
            Whether you're looking for casual wear, formal attire, or something in between, we have something 
            for everyone. Thank you for choosing us, and we hope you enjoy shopping with us as much as we enjoy 
            serving you!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
