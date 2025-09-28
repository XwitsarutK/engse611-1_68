const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    
    if (pathname === '/') {
        res.end('<h1>Hi!!!</h1><a href="/about">About Us</a> | <a href="/contact">Contact</a>');
    } else if (pathname === '/about') {
        res.end('<h1>About Us</h1><a href="/">Back</a> | <a href="/contact">Contact</a>');
    } else if (pathname === '/contact') {
        res.end('<h1>Contact Us</h1><p>Email: witsarut@live.rmutl.ac.th</p><a href="/">Back</a>');
    } else {
        res.writeHead(404);
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});