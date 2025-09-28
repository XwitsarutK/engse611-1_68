import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ product, onAddToCart, onViewDetails }) {
    // ฟังก์ชันแสดงดาวตาม rating (จำกัดสูงสุด 5 ดาว)
    const renderStars = (rating) => {
        // จำกัด rating ไม่ให้เกิน 5.0
        const cappedRating = Math.min(rating, 5.0);
        const fullStars = Math.floor(cappedRating); // จำนวนดาวเต็ม
        // ตรวจสอบดาวครึ่งเฉพาะเมื่อ rating < 5
        const hasHalfStar = cappedRating < 5 && cappedRating % 1 >= 0.25;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // จำนวนดาวว่าง

        // สร้าง array ของดาว
        const stars = [];
        // เพิ่มดาวเต็ม
        for (let i = 0; i < fullStars; i++) {
            stars.push('full');
        }
        // เพิ่มดาวครึ่ง (ถ้ามีและ rating < 5)
        if (hasHalfStar) {
            stars.push('half');
        }
        // เพิ่มดาวว่าง
        for (let i = 0; i < emptyStars; i++) {
            stars.push('empty');
        }

        return stars;
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/cccccc/666666?text=No+Image';
                    }}
                />
            </div>
            
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                {/* แสดง Star Rating */}
                <div className="product-rating">
                    {renderStars(product.rating).map((starType, index) => (
                        <span
                            key={index}
                            className={`star ${starType}-star`}
                        >
                            {starType === 'half' ? '⭐' : starType === 'empty' ? '☆' : '⭐'}
                        </span>
                    ))}
                    <span className="rating-number">({product.rating})</span>
                </div>
                
                <div className="product-price">
                    ฿{product.price.toLocaleString()}
                    {product.discount > 0 && (
                        <span className="discount-tag">ลด {product.discount}%</span>
                    )}
                    <span className="original-price">฿{product.originalPrice.toLocaleString()}</span>
                </div>
                
                <div className="product-actions">
                    <button 
                        className="btn btn-secondary"
                        onClick={() => onViewDetails(product)}
                    >
                        ดูรายละเอียด
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={() => onAddToCart(product)}
                        disabled={!product.inStock}
                    >
                        {product.inStock ? 'ใส่ตะกร้า' : 'หมดสินค้า'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// PropTypes ด้วย PropTypes.shape()
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.oneOf(['electronics', 'clothing', 'books']).isRequired,
        price: PropTypes.number.isRequired,
        originalPrice: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        inStock: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired
    }).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;