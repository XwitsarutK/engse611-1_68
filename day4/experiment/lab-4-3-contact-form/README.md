# Contact Form API

## ภาพรวม

API แบบ REST ที่พัฒนาด้วย Node.js และ Express.js สำหรับรับข้อมูลจาก Contact Form และ Feedback Form พร้อม validation และบันทึกข้อมูลลงไฟล์ JSON รองรับการจำกัดอัตราการร้องขอและหน้าเว็บทดสอบ

## โครงสร้างโปรเจกต์

```
lab-4-3-contact-form/
├── package.json
├── README.md
├── server.js
├── data/
│   ├── contacts.json
│   └── feedback.json
├── middleware/
│   ├── validation.js
│   └── fileManager.js
├── routes/
│   ├── contact.js
│   └── feedback.js
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

## ขั้นตอนการติดตั้ง

### ความต้องการของระบบ

- **Node.js**: เวอร์ชัน 14 หรือสูงกว่า ([nodejs.org](https://nodejs.org))
- **npm**: มาพร้อมกับ Node.js

### การติดตั้ง

1. **เข้าโฟลเดอร์โปรเจกต์**:
   ```bash
   cd lab-4-3-contact-form
   ```
2. **ติดตั้ง dependencies**:
   ```bash
   npm install
   ```

## รัน API

- **รันเซิร์ฟเวอร์**:
  ```bash
  npm start
  ```
- **ใช้ nodemon (development)**:
  ```bash
  npm run dev
  ```
- เซิร์ฟเวอร์จะทำงานที่ `http://localhost:3000` โดยค่าเริ่มต้น
- ผลลัพธ์เมื่อรันสำเร็จ:
  ```
  🚀 Contact Form API running on http://localhost:3000
  📖 API Documentation: http://localhost:3000/api/docs
  ```

## Endpoints ของ API

### GET /

ส่งหน้า `index.html` สำหรับทดสอบฟอร์ม

### POST /api/contact

บันทึกข้อมูลติดต่อ

**ตัวอย่าง Request**:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ทดสอบ นามสกุล",
    "email": "test@email.com",
    "subject": "ทดสอบระบบ",
    "message": "นี่คือข้อความทดสอบระบบ"
  }'
```

**ตัวอย่าง Response**:

```json
{
  "success": true,
  "message": "Contact submitted successfully",
  "data": {
    "id": 1727879600000,
    "name": "ทดสอบ นามสกุล",
    "email": "test@email.com",
    "subject": "ทดสอบระบบ",
    "message": "นี่คือข้อความทดสอบระบบ",
    "createdAt": "2025-10-02T07:00:00.000Z"
  }
}
```

### GET /api/contact

ดึงข้อมูลติดต่อทั้งหมด (พร้อม pagination)

**ตัวอย่าง Request**:

```bash
curl http://localhost:3000/api/contact?page=1&limit=5
```

### POST /api/feedback

บันทึกความคิดเห็น

**ตัวอย่าง Request**:

```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "ระบบใช้งานง่ายมาก"
  }'
```

### GET /api/feedback/stats

ดึงสถิติความคิดเห็น

**ตัวอย่าง Response**:

```json
{
  "success": true,
  "stats": {
    "totalFeedback": 1,
    "averageRating": 5.0,
    "lastSubmission": "2025-10-02T07:00:00.000Z"
  }
}
```

### GET /api/docs

ส่งเอกสาร API

### GET /api/status

ส่งสถานะของ API

**ตัวอย่าง Response**:

```json
{
  "success": true,
  "status": "API is running",
  "dataCount": {
    "contactsCount": 1,
    "feedbackCount": 1
  }
}
```

## การจัดการข้อผิดพลาด

- **400 Bad Request**: การ validate ล้มเหลว
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": ["ชื่อต้องเป็น string ความยาว 2-100 ตัวอักษร"]
  }
  ```
- **429 Too Many Requests**: เกินขีดจำกัดการร้องขอ
- **500 Internal Server Error**: ข้อผิดพลาดภายใน

## Dependencies

- `express`
- `cors`
- `express-rate-limit`

## หมายเหตุ

- ข้อมูลบันทึกใน `data/contacts.json` และ `data/feedback.json`
- ใช้ middleware validation และ fileManager
- จำกัดอัตราการร้องขอ 10 ครั้งต่อ 15 นาที

## การทดสอบ API

- **ผ่าน Browser**: เปิด `http://localhost:3000` และใช้ฟอร์มทดสอบ
- **ผ่าน cURL**: ใช้ตัวอย่างคำสั่งด้านบน
- **ตรวจสอบไฟล์**: ดู `data/*.json` หลังส่งข้อมูล
