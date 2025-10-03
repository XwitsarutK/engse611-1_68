const express = require('express');
const cors = require('cors');
const path = require('path');

// Import foodRoutes และ logger middleware
const foodRoutes = require('./routes/foods');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ใช้ logger middleware
app.use(logger);

// Routes
app.get('/', (req, res) => {
    res.json({
        message: '🍜 Welcome to Food API!',
        version: '1.0.0',
        endpoints: {
            foods: '/api/foods',
            search: '/api/foods?search=ผัด',
            category: '/api/foods?category=แกง',
            spicy: '/api/foods?maxSpicy=3',
            vegetarian: '/api/foods?vegetarian=true',
            documentation: '/api/docs'
        }
    });
});

// ใช้ foodRoutes สำหรับ '/api/foods'
app.use('/api/foods', foodRoutes);

// GET /api/docs - ส่งข้อมูล API documentation
app.get('/api/docs', (req, res) => {
    res.json({
        success: true,
        documentation: {
            version: '1.0.0',
            endpoints: {
                '/api/foods': 'ดึงรายการอาหารทั้งหมด (รองรับ filtering)',
                '/api/foods/:id': 'ดึงข้อมูลเมนูตาม ID',
                '/api/foods/category/:category': 'ดึงเมนูตามประเภท',
                '/api/foods/random': 'ดึงเมนูแบบสุ่ม',
                '/api/stats': 'ดึงสถิติเมนู',
                '/': 'หน้าแรกและรายการ endpoints'
            },
            filters: {
                search: 'ค้นหาจากชื่อหรือคำอธิบาย',
                category: 'กรองตามประเภท (เช่น แกง)',
                maxSpicy: 'กรองระดับความเผ็ดสูงสุด',
                vegetarian: 'กรองมังสวิรัติ (true/false)',
                available: 'กรองเมนูที่พร้อมเสิร์ฟ',
                maxPrice: 'กรองราคาสูงสุด'
            }
        }
    });
});

// GET /api/stats - ส่งสถิติต่างๆ
const fs = require('fs');
const foodData = require('./data/foods.json');
app.get('/api/stats', (req, res) => {
    const totalFoods = foodData.length;
    const categories = [...new Set(foodData.map(food => food.category))];
    const statsByCategory = categories.reduce((acc, cat) => {
        acc[cat] = foodData.filter(f => f.category === cat).length;
        return acc;
    }, {});
    const totalAvailable = foodData.filter(f => f.available).length;
    const totalVegetarian = foodData.filter(f => f.vegetarian).length;

    res.json({
        success: true,
        stats: {
            totalFoods,
            totalAvailable,
            totalVegetarian,
            categories: statsByCategory
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        requestedUrl: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Food API Server running on http://localhost:${PORT}`);
    console.log(`📖 API Documentation: http://localhost:${PORT}/api/docs`);
});