const express = require('express');
const app = express();
const PORT = 3001;

// ข้อมูลจำลอง students array (เหมือนกับ http-server.js)
const students = [
    { id: 1, name: "สมชาย ใจดี", major: "วิศวกรรม", year: 2 },
    { id: 2, name: "สมหญิง รักเรียน", major: "วิทยาการคอมพิวเตอร์", year: 3 },
    { id: 3, name: "สมศรี ขยัน", major: "วิศวกรรม", year: 4 }
];

// Middleware
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
});

// Route: GET /
app.get('/', (req, res) => {
    res.status(200).json({
        message: "ยินดีต้อนรับสู่ Student API",
        endpoints: [
            "GET /",
            "GET /students",
            "GET /students/:id",
            "GET /students/major/:major",
            "GET /stats"
        ]
    });
});

// Route: GET /students
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

// Route: GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: `ไม่พบนักศึกษาด้วย ID: ${id}` });
    }
});

// Route: GET /students/major/:major
app.get('/students/major/:major', (req, res) => {
    const major = decodeURIComponent(req.params.major);
    const filteredStudents = students.filter(s => s.major === major);
    if (filteredStudents.length > 0) {
        res.status(200).json(filteredStudents);
    } else {
        res.status(404).json({ message: `ไม่พบนักศึกษาในสาขา: ${major}` });
    }
});

// Route: GET /stats
app.get('/stats', (req, res) => {
    const totalStudents = students.length;
    const majors = [...new Set(students.map(s => s.major))];
    const statsByMajor = majors.reduce((acc, major) => {
        acc[major] = students.filter(s => s.major === major).length;
        return acc;
    }, {});
    res.status(200).json({
        totalStudents,
        majors: statsByMajor
    });
});

// Middleware: 404 Not Found
app.use((req, res) => {
    res.status(404).json({ message: "ไม่พบ Endpoint ที่ร้องขอ" });
});

app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
    console.log('  GET /stats');
});