const express = require('express');
const router = express.Router();
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');
const { validateContact } = require('../middleware/validation');

// POST /api/contact - บันทึกข้อมูลติดต่อ
router.post('/', validateContact, async (req, res) => {
    try {
        const newContact = await appendToJsonFile('contacts.json', req.body);
        if (newContact) {
            res.status(201).json({
                success: true,
                message: 'Contact submitted successfully',
                data: newContact
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to save contact'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/contact - ดึงข้อมูลติดต่อทั้งหมด (พร้อม pagination)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const contacts = await readJsonFile('contacts.json');
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedContacts = contacts.slice(startIndex, endIndex);
        res.json({
            success: true,
            data: paginatedContacts,
            total: contacts.length,
            page,
            limit,
            pages: Math.ceil(contacts.length / limit)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;