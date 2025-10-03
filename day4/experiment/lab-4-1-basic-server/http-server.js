const http = require('http');
const url = require('url');

const PORT = 3000;

// ข้อมูลจำลอง students array
const students = [
    { id: 1, name: "สมชาย ใจดี", major: "วิศวกรรม", year: 2 },
    { id: 2, name: "สมหญิง รักเรียน", major: "วิทยาการคอมพิวเตอร์", year: 3 },
    { id: 3, name: "สมศรี ขยัน", major: "วิศวกรรม", year: 4 }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Route: GET /
    if (method === 'GET' && pathname === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({
            message: "ยินดีต้อนรับสู่ Student API",
            endpoints: [
                "GET /",
                "GET /students",
                "GET /students/:id",
                "GET /students/major/:major"
            ]
        }));
        return;
    }

    // Route: GET /students
    if (method === 'GET' && pathname === '/students') {
        res.statusCode = 200;
        res.end(JSON.stringify(students));
        return;
    }

    // Route: GET /students/:id
    if (method === 'GET' && pathname.startsWith('/students/')) {
        const id = parseInt(pathname.split('/')[2]);
        const student = students.find(s => s.id === id);
        if (student) {
            res.statusCode = 200;
            res.end(JSON.stringify(student));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: `ไม่พบนักศึกษาด้วย ID: ${id}` }));
        }
        return;
    }

    // Route: GET /students/major/:major
    if (method === 'GET' && pathname.startsWith('/students/major/')) {
        const major = decodeURIComponent(pathname.split('/')[3]);
        const filteredStudents = students.filter(s => s.major === major);
        if (filteredStudents.length > 0) {
            res.statusCode = 200;
            res.end(JSON.stringify(filteredStudents));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: `ไม่พบนักศึกษาในสาขา: ${major}` }));
        }
        return;
    }

    // 404 Not Found
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "ไม่พบ Endpoint ที่ร้องขอ" }));
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /');
    console.log('  GET /students');
    console.log('  GET /students/:id');
    console.log('  GET /students/major/:major');
});