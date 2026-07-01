import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  // Parse price by removing currency symbol
  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[₹,]/g, ''));
  };

  const currentPrice = parsePrice(product.price);
  const originalPrice = parsePrice(product.originalPrice);
  
  // Extract brand from product name
  const brand = product.productName.split(' ')[0];

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.imageUrl && product.imageUrl !== '#' && !imageError ? (
          <img
            className="product-image"
            src={product.imageUrl}
            alt={product.productName}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="placeholder-image">No image available</div>
        )}
        <span className="discount-badge">{product.discount}</span>
      </div>

      <div className="product-details">
        <h3 className="product-name">{product.productName}</h3>

        <div className="rating-section">
          {product.rating ? (
            <>
              <span className="rating">
                ⭐ {product.rating}
              </span>
              <span className="reviews">{product.reviews}</span>
            </>
          ) : (
            <span className="no-rating">No ratings yet</span>
          )}
        </div>

        <div className="price-section">
          <span className="current-price">{product.price}</span>
          <span className="original-price">{product.originalPrice}</span>
          <span className="savings">
            Save ₹{currentPrice - originalPrice}
          </span>
        </div>

        <a
          className="view-product-btn"
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go To Flipkart
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
