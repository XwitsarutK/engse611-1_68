// src/data/products.js
export const categories = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์' },
    { id: 'clothing', name: 'เสื้อผ้า' },
    { id: 'books', name: 'หนังสือ' }
];

// ข้อมูลสินค้าพื้นฐาน - นักศึกษาจะเพิ่มเติมใน Challenge
export const products = [
{
    id: 1,
    name: 'iPhone 15 Pro',
    category: 'electronics',
    price: 45900,
    originalPrice: 49900,
    discount: 8.02,
    image: 'https://via.placeholder.com/300x300/007bff/ffffff?text=iPhone+15',
    description: 'สมาร์ทโฟนล่าสุดจาก Apple',
    inStock: true,
    rating: 4.8
  },
  {
    id: 2,
    name: 'เสื้อยืดผ้าฝ้าย',
    category: 'clothing',
    price: 299,
    originalPrice: 399,
    discount: 25.06,
    image: 'https://via.placeholder.com/300x300/ffc107/000000?text=T-Shirt',
    description: 'เสื้อยืดผ้าฝ้าย 100% นุ่มสบาย',
    inStock: true,
    rating: 4.2
  },
  {
    id: 3,
    name: 'หนังสือ React.js Guide',
    category: 'books',
    price: 650,
    originalPrice: 800,
    discount: 18.75,
    image: 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=React+Book',
    description: 'คู่มือเรียนรู้ React.js ฉบับสมบูรณ์',
    inStock: false,
    rating: 4.7
  },
  {
    id: 4,
    name: 'คู่มือ Node.js สำหรับ Backend',
    category: 'books',
    price: 590,
    originalPrice: 750,
    discount: 21.33,
    image: 'https://via.placeholder.com/300x300/007bff/ffffff?text=Node+Book',
    description: 'เรียนรู้การพัฒนา Backend ด้วย Node.js อย่างมืออาชีพ',
    inStock: true,
    rating: 4.5
  },
  {
    id: 5,
    name: 'หนังสือ CSS: The Definitive Guide',
    category: 'books',
    price: 680,
    originalPrice: 850,
    discount: 20,
    image: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=CSS+Book',
    description: 'เจาะลึกเทคนิคการใช้ CSS เพื่อสร้างเว็บที่สวยงามและ responsive',
    inStock: false,
    rating: 4.9
  },
  {
    id: 6,
    name: 'กางเกงยีนส์ทรง slim fit',
    category: 'clothing',
    price: 1290,
    originalPrice: 1690,
    discount: 23.67,
    image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Jeans',
    description: 'กางเกงยีนส์คุณภาพสูง ทรง slim fit สวมใส่สบาย',
    inStock: true,
    rating: 4.6
  }
];