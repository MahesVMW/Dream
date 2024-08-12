import React, { useState, useEffect, useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const menuListRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const { scrollWidth, clientWidth } = menuListRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-down');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="explore-menu" id="explore-menu" ref={sectionRef}>
      <h1>Discover New Collections</h1>
      <div className="explore-menu-list-container">
        <div className="explore-menu-list" ref={menuListRef}>
          {menu_list.map((item, index) => (
            <div 
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
              key={index} 
              className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
            >
              <img src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        {isOverflowing && <div className="scroll-indicator">← Scroll →</div>}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
