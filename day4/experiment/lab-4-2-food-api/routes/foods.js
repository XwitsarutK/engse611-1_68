const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FOODS_FILE = path.join(__dirname, '../data/foods.json');

// Helper function: อ่านข้อมูลอาหาร
const loadFoods = () => {
    try {
        const data = fs.readFileSync(FOODS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading foods:', error);
        return [];
    }
};

// GET /api/foods - ดึงรายการอาหารทั้งหมด (พร้อม filtering)
router.get('/', (req, res) => {
    try {
        let foods = loadFoods();
        
        // Filtering logic ตาม query parameters
        const { search, category, maxSpicy, vegetarian, available, maxPrice } = req.query;

        if (search) {
            const searchTerm = search.toLowerCase();
            foods = foods.filter(food => 
                food.name.toLowerCase().includes(searchTerm) || 
                food.description.toLowerCase().includes(searchTerm)
            );
        }
        if (category) {
            foods = foods.filter(food => food.category === category);
        }
        if (maxSpicy) {
            foods = foods.filter(food => food.spicyLevel <= parseInt(maxSpicy));
        }
        if (vegetarian) {
            foods = foods.filter(food => food.vegetarian === (vegetarian === 'true'));
        }
        if (available) {
            foods = foods.filter(food => food.available === (available === 'true'));
        }
        if (maxPrice) {
            foods = foods.filter(food => food.price <= parseInt(maxPrice));
        }

        res.json({
            success: true,
            data: foods,
            total: foods.length,
            filters: {
                search: search || null,
                category: category || null,
                maxSpicy: maxSpicy || null,
                vegetarian: vegetarian || null,
                available: available || null,
                maxPrice: maxPrice || null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods'
        });
    }
});

// GET /api/foods/random - ดึงอาหารแบบสุ่ม 1 จาน
router.get('/random', (req, res) => {
    try {
        const foods = loadFoods();
        if (foods.length > 0) {
            const randomFood = foods[Math.floor(Math.random() * foods.length)];
            res.json({
                success: true,
                data: randomFood
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'ไม่มีเมนูในระบบ'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching random food'
        });
    }
});

// GET /api/foods/:id - ดึงข้อมูลอาหารตาม ID
router.get('/:id', (req, res) => {
    try {
        const foods = loadFoods();
        const food = foods.find(f => f.id === parseInt(req.params.id));
        if (food) {
            res.json({
                success: true,
                data: food
            });
        } else {
            res.status(404).json({
                success: false,
                message: `ไม่พบเมนูที่มี ID: ${req.params.id}`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching food'
        });
    }
});

// GET /api/foods/category/:category - ดึงอาหารตามประเภท
router.get('/category/:category', (req, res) => {
    try {
        const foods = loadFoods();
        const filteredFoods = foods.filter(food => food.category === req.params.category);
        if (filteredFoods.length > 0) {
            res.json({
                success: true,
                data: filteredFoods,
                total: filteredFoods.length
            });
        } else {
            res.status(404).json({
                success: false,
                message: `ไม่พบเมนูในประเภท: ${req.params.category}`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching foods by category'
        });
    }
});


module.exports = router;