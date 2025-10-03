# Student API Servers

## ภาพรวม
โครงการนี้เพื่อพัฒนา API เซิร์ฟเวอร์สองตัวสำหรับจัดการข้อมูลนักศึกษา โดยใช้:
- **http-server.js**: เซิร์ฟเวอร์ HTTP พื้นฐานที่ใช้โมดูล `http` ของ Node.js
- **express-server.js**: เซิร์ฟเวอร์ที่ใช้ Express framework พร้อม endpoint `/stats` เพิ่มเติม

ทั้งสองเซิร์ฟเวอร์มี endpoints สำหรับเรียกดูข้อมูลนักศึกษาและจัดการข้อผิดพลาด (404) พร้อมส่งคืนข้อมูลในรูปแบบ JSON (UTF-8) และรองรับ CORS

## ความต้องการเบื้องต้น
- **Node.js**: เวอร์ชัน 14 หรือสูงกว่า ดาวน์โหลดได้จาก [nodejs.org](https://nodejs.org)
- **npm**: มาพร้อมกับ Node.js ใช้สำหรับติดตั้ง dependencies
- **เครื่องมือทดสอบ**: Postman, curl, หรือเว็บเบราว์เซอร์สำหรับทดสอบ API endpoints

## การติดตั้ง
1. **โคลนหรือดาวน์โหลดโครงการ**:
   ```bash
   git clone <your-repo-url>
   ```
   ตรวจสอบว่าโฟลเดอร์มีไฟล์: `http-server.js`, `express-server.js`, `package.json`, `comparison.md`, และ `README.md`

2. **เข้าไปในโฟลเดอร์โครงการ**:
   ```bash
   cd lab-4-1-basic-server
   ```

3. **ติดตั้ง dependencies** (จำเป็นสำหรับ `express-server.js`):
   ```bash
   npm install
   ```
   หมายเหตุ: `http-server.js` ใช้โมดูลในตัวของ Node.js จึงไม่ต้องติดตั้งเพิ่ม

## โครงสร้างโครงการ
- `http-server.js`: เซิร์ฟเวอร์ HTTP พื้นฐานที่ใช้โมดูล `http`
- `express-server.js`: เซิร์ฟเวอร์ที่ใช้ Express framework พร้อม endpoint `/stats`
- `package.json`: กำหนด dependencies และ scripts สำหรับรันเซิร์ฟเวอร์
- `comparison.md`: เปรียบเทียบการทำงานระหว่าง HTTP Server และ Express.js
- `README.md`: เอกสารนี้อธิบายวิธีใช้งาน
- `screenshots/`: โฟลเดอร์เก็บภาพหน้าจอผลลัพธ์ (เช่น `http-server-home.png`, `express-server-stats.png`)

## การรันเซิร์ฟเวอร์
ทั้งสองเซิร์ฟเวอร์รันบนพอร์ตที่ต่างกันเพื่อป้องกัน:

1. **รัน http-server.js**:
   - พอร์ต: 3000
   - คำสั่ง:
     ```bash
     node http-server.js
     ```
   - หรือใช้ nodemon สำหรับ development:
     ```bash
     npm run dev:http
     ```
   - ผลลัพธ์:
     ```
     🌐 HTTP Server running on http://localhost:3000
     Available endpoints:
       GET /
       GET /students
       GET /students/:id
       GET /students/major/:major
     ```

2. **รัน express-server.js**:
   - พอร์ต: 3001
   - คำสั่ง:
     ```bash
     node express-server.js
     ```
   - หรือใช้ nodemon:
     ```bash
     npm run dev:express
     ```
   - ผลลัพธ์:
     ```
     🚀 Express Server running on http://localhost:3001
     Available endpoints:
       GET /
       GET /students
       GET /students/:id
       GET /students/major/:major
       GET /stats
     ```

**หมายเหตุ**: หากต้องการรันทั้งสองเซิร์ฟเวอร์พร้อมกัน ตรวจสอบว่าพอร์ต 3000 และ 3001 ว่างอยู่

## การทดสอบ API
สามารถทดสอบ endpoints ได้โดยใช้ Postman, curl, หรือเว็บเบราว์เซอร์ ทุก endpoint ส่งคืนข้อมูลในรูปแบบ JSON และรองรับ CORS (`Access-Control-Allow-Origin: *`)

### Endpoints ที่มีในทุกเซิร์ฟเวอร์
1. **GET /**:
   - **คำอธิบาย**: ส่งข้อความต้อนรับและรายการ endpoints
   - **ตัวอย่าง**:
     ```bash
     curl http://localhost:3000/
     ```
   - **ผลลัพธ์** (`http-server.js`):
     ```json
     {
       "message": "ยินดีต้อนรับสู่ Student API",
       "endpoints": [
         "GET /",
         "GET /students",
         "GET /students/:id",
         "GET /students/major/:major"
       ]
     }
     ```
   - **ผลลัพธ์** (`express-server.js`):
     ```json
     {
       "message": "ยินดีต้อนรับสู่ Student API",
       "endpoints": [
         "GET /",
         "GET /students",
         "GET /students/:id",
         "GET /students/major/:major",
         "GET /stats"
       ]
     }
     ```

2. **GET /students**:
   - **คำอธิบาย**: ส่งรายการนักศึกษาทั้งหมด
   - **ตัวอย่าง**:
     ```bash
     curl http://localhost:3000/students
     ```
   - **ผลลัพธ์**:
     ```json
     [
       { "id": 1, "name": "สมชาย ใจดี", "major": "วิศวกรรม", "year": 2 },
       { "id": 2, "name": "สมหญิง รักเรียน", "major": "วิทยาการคอมพิวเตอร์", "year": 3 },
       { "id": 3, "name": "สมศรี ขยัน", "major": "วิศวกรรม", "year": 4 }
     ]
     ```

3. **GET /students/:id**:
   - **คำอธิบาย**: ส่งข้อมูลนักศึกษาตาม ID
   - **ตัวอย่าง**:
     ```bash
     curl http://localhost:3000/students/1
     ```
   - **ผลลัพธ์**:
     ```json
     { "id": 1, "name": "สมชาย ใจดี", "major": "วิศวกรรม", "year": 2 }
     ```
   - **ข้อผิดพลาด** (หากไม่พบ ID):
     ```json
     { "message": "ไม่พบนักศึกษาด้วย ID: 999" }
     ```

4. **GET /students/major/:major**:
   - **คำอธิบาย**: ส่งรายการนักศึกษาที่กรองตามสาขา (รองรับภาษาไทย)
   - **ตัวอย่าง**:
     ```bash
     curl http://localhost:3000/students/major/วิศวกรรม
     ```
   - **ผลลัพธ์**:
     ```json
     [
       { "id": 1, "name": "สมชาย ใจดี", "major": "วิศวกรรม", "year": 2 },
       { "id": 3, "name": "สมศรี ขยัน", "major": "วิศวกรรม", "year": 4 }
     ]
     ```
   - **ข้อผิดพลาด** (หากไม่พบสาขา):
     ```json
     { "message": "ไม่พบนักศึกษาในสาขา: ไม่มีสาขานี้" }
     ```

### Endpoint เพิ่มเติม (เฉพาะใน express-server.js)
5. **GET /stats**:
   - **คำอธิบาย**: ส่งสถิติ เช่น จำนวนนักศึกษาทั้งหมดและจำนวนตามสาขา
   - **ตัวอย่าง**:
     ```bash
     curl http://localhost:3001/stats
     ```
   - **ผลลัพธ์**:
     ```json
     {
       "totalStudents": 3,
       "majors": {
         "วิศวกรรม": 2,
         "วิทยาการคอมพิวเตอร์": 1
       }
     }
     ```

### การจัดการข้อผิดพลาด
ทุกเซิร์ฟเวอร์ส่งคืนสถานะ 404 พร้อมข้อความ JSON สำหรับ endpoint ที่ไม่ถูกต้อง:
```json
{ "message": "ไม่พบ Endpoint ที่ร้องขอ" }
```
- **ตัวอย่าง**:
  ```bash
  curl http://localhost:3000/invalid
  ```

## ความแตกต่างระหว่างเซิร์ฟเวอร์
- **`http-server.js`**: ใช้โมดูล `http` ของ Node.js จัดการ routing และ parsing URL ด้วยตัวเอง เหมาะสำหรับการเรียนรู้พื้นฐาน แต่โค้ดซับซ้อนกว่า
- **`express-server.js`**: ใช้ Express framework ทำให้ routing และ middleware ง่ายขึ้น มี endpoint `/stats` เพิ่มเติมสำหรับแสดงสถิติ เหมาะสำหรับพัฒนา API อย่างรวดเร็ว

## ตัวอย่างคำสั่ง curl
สำหรับ `http-server.js`:
```bash
curl http://localhost:3000/
curl http://localhost:3000/students
curl http://localhost:3000/students/1
curl http://localhost:3000/students/major/วิศวกรรม
curl http://localhost:3000/invalid
```

สำหรับ `express-server.js`:
```bash
curl http://localhost:3001/
curl http://localhost:3001/students
curl http://localhost:3001/students/2
curl http://localhost:3001/students/major/วิทยาการคอมพิวเตอร์
curl http://localhost:3001/stats
curl http://localhost:3001/invalid
```

## การทดสอบเพิ่มเติม
- **ใช้ Postman**: สร้าง HTTP request สำหรับแต่ละ endpoint และตรวจสอบ response
- **ใช้ Browser**: เปิด URL เช่น `http://localhost:3000/students` หรือ `http://localhost:3001/stats`


## หมายเหตุ
- ตรวจสอบว่าเซิร์ฟเวอร์รันได้โดยไม่มี error และ endpoints ตอบสนองถูกต้อง
- หากมีปัญหาการรันหรือทดสอบ ตรวจสอบ console log หรือติดต่อผู้สอน
- อ่าน `comparison.md` เพื่อดูการเปรียบเทียบระหว่าง HTTP Server และ Express.js