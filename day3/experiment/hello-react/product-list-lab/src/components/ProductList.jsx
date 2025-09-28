import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductList.css';
import { products } from '../data/products';

function ProductList({ categories, onAddToCart, onViewDetails }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');

    // กรองและเรียงลำดับสินค้าโดยใช้ useMemo
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = selectedCategory === 'all'
            ? products
            : products.filter(product => product.category === selectedCategory);

        // กรองตามการค้นหา
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // เรียงลำดับ
        return filtered.sort((a, b) => {
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'rating') return b.rating - a.rating; // เรียงจากมากไปน้อย
            return a.name.localeCompare(b.name); // เรียงตามชื่อ (A-Z)
        });
    }, [selectedCategory, searchQuery, sortBy]);

    return (
        <div className="product-list-container">
            {/* Header */}
            <div className="header">
                <h1>🛍️ ร้านค้าออนไลน์</h1>
                <p>Lab 3.2 - การสร้าง Components และ Props</p>
            </div>

            {/* Search and Sort Controls */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="search-box">ค้นหา: </label>
                    <input
                        id="search-box"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ค้นหาชื่อหรือคำอธิบาย..."
                        style={{ padding: '5px', fontSize: '16px', width: '200px' }}
                    />
                </div>
                <div>
                    <label htmlFor="sort-select">เรียงลำดับ: </label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: '5px', fontSize: '16px' }}
                    >
                        <option value="name">ชื่อ (A-Z)</option>
                        <option value="price">ราคา (ต่ำ-สูง)</option>
                        <option value="rating">เรตติ้ง (สูง-ต่ำ)</option>
                    </select>
                </div>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <label htmlFor="category-select">หมวดหมู่: </label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '5px', fontSize: '16px' }}
                >
                    <option value="all">ทั้งหมด</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Products Display */}
            <div className="products-grid">
                {filteredAndSortedProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => onAddToCart(product)}
                        onViewDetails={() => onViewDetails(product)}
                    />
                ))}
            </div>

            {/* TODO: นักศึกษาจะเพิ่ม:
                - Advanced filters (ราคา, rating)
                - Empty state handling
                - Loading states
            */}
        </div>
    );
}

// ปรับปรุง PropTypes ให้ละเอียดมากขึ้น
ProductList.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default ProductList;