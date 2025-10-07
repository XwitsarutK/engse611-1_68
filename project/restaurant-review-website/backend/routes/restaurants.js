const express = require('express');
const router = express.Router();
const { readJsonFile } = require('../utils/fileManager');

// ========================================
// GET /api/restaurants - ดึงรายการร้านทั้งหมด (พร้อม filtering)
// ========================================
router.get('/', async (req, res) => {
  try {
    let restaurants = await readJsonFile('restaurants.json');
    const { search, category, minRating, priceRange } = req.query;
    
    // 1. กรองตามชื่อ (search)
    if (search) {
      const searchLower = search.toLowerCase();
      restaurants = restaurants.filter(r =>
        r.name.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower)
      );
    }

    // 2. กรองตามหมวดหมู่ (category)
    if (category) {
      restaurants = restaurants.filter(r => r.category === category);
    }

    // 3. กรองตาม rating ขั้นต่ำ (minRating)
    if (minRating) {
      const min = parseFloat(minRating);
      restaurants = restaurants.filter(r => (typeof r.averageRating === 'number' ? r.averageRating : 0) >= min);
    }

    // 4. กรองตามช่วงราคา (priceRange)
    if (priceRange) {
      const price = parseInt(priceRange);
      restaurants = restaurants.filter(r => r.priceRange === price);
    }
    
    res.json({
      success: true,
      data: restaurants,
      total: restaurants.length,
      filters: {
        search: search || null,
        category: category || null,
        minRating: minRating || null,
        priceRange: priceRange || null
      }
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้าน'
    });
  }
});

// ========================================
// GET /api/restaurants/:id - ดึงข้อมูลร้านตาม ID พร้อมรีวิว
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. อ่าน restaurants.json และ reviews.json
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');
    // 2. หาร้านที่มี id ตรงกับ parameter
    const restaurant = restaurants.find(r => r.id === parseInt(id));
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบร้านอาหารนี้'
      });
    }
    // 4. หารีวิวของร้านนี้
    const restaurantReviews = reviews.filter(r => r.restaurantId === parseInt(id));
    // 5. เรียงรีวิวจากใหม่สุดไปเก่าสุด
    restaurantReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // 6. ส่งข้อมูลกลับ
    res.json({
      success: true,
      data: {
        ...restaurant,
        reviews: restaurantReviews
      }
    });
    
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลร้าน'
    });
  }
});

module.exports = router;