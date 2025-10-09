const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const { readJsonFile } = require('./utils/fileManager');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🍜 Restaurant Review API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      reviews: '/api/reviews',
      stats: '/api/stats'
    }
  });
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// ========================================
// TODO: GET /api/stats - ดึงสถิติทั้งหมด
// ========================================
// งานที่ต้องทำ:
// 1. อ่านข้อมูล restaurants.json และ reviews.json
// 2. คำนวณ:
//    - totalRestaurants: จำนวนร้านทั้งหมด
//    - totalReviews: จำนวนรีวิวทั้งหมด
//    - averageRating: คะแนนเฉลี่ยของร้านทั้งหมด (ปัดเศษ 1 ตำแหน่ง)
//    - topRatedRestaurants: ร้าน 5 อันดับแรกที่มี rating สูงสุด
// 3. ส่งข้อมูลกลับในรูปแบบ: { success: true, data: {...} }
//
// คำใบ้:
// - ใช้ Array.reduce() เพื่อรวมคะแนน
// - ใช้ Array.sort() และ Array.slice(0, 5) เพื่อหา top 5
// - ระวัง: ร้านที่ยังไม่มีรีวิว (averageRating = 0) อาจมีปัญหาในการเรียง

app.get('/api/stats', async (req, res) => {
  try {
    // อ่านข้อมูลจากไฟล์
    const restaurants = await readJsonFile('restaurants.json');
    const reviews = await readJsonFile('reviews.json');

    // 1. จำนวนร้านทั้งหมด
    const totalRestaurants = restaurants.length;
    // 2. จำนวนรีวิวทั้งหมด
    const totalReviews = reviews.length;

    // 3. คำนวณคะแนนเฉลี่ย (รวมทุกรีวิว)
    let averageRating = 0;
    if (totalReviews > 0) {
      const sum = reviews.reduce((acc, r) => acc + (typeof r.rating === 'number' ? r.rating : 0), 0);
      averageRating = Number((sum / totalReviews).toFixed(1));
    }

    // 4. topRatedRestaurants: 5 อันดับร้านที่ rating เฉลี่ยสูงสุด (ถ้ามีรีวิว)
    // สร้าง map { restaurantId: [ratings] }
    const ratingMap = {};
    reviews.forEach(r => {
      if (!ratingMap[r.restaurantId]) ratingMap[r.restaurantId] = [];
      if (typeof r.rating === 'number') ratingMap[r.restaurantId].push(r.rating);
    });
    // คำนวณ avg rating ต่อร้าน
    const restaurantWithAvg = restaurants.map(rest => {
      const ratings = ratingMap[rest.id] || [];
      const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
      return {
        ...rest,
        averageRating: Number(avg.toFixed(1)),
        totalReviews: ratings.length
      };
    });
    // เรียงลำดับและเลือก top 5 (เฉพาะร้านที่มีรีวิว)
    const topRatedRestaurants = restaurantWithAvg
      .filter(r => r.totalReviews > 0)
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        totalRestaurants,
        totalReviews,
        averageRating,
        topRatedRestaurants
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงสถิติ'
    });
  }
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});