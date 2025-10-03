const express = require('express');
const router = express.Router();
const { appendToJsonFile, readJsonFile } = require('../middleware/fileManager');
const { validateFeedback } = require('../middleware/validation');

// POST /api/feedback - บันทึกความคิดเห็น
router.post('/', validateFeedback, async (req, res) => {
    try {
        const newFeedback = await appendToJsonFile('feedback.json', req.body);
        if (newFeedback) {
            res.status(201).json({
                success: true,
                message: 'Feedback submitted successfully',
                data: newFeedback
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to save feedback'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// GET /api/feedback/stats - ดึงสถิติความคิดเห็น
router.get('/stats', async (req, res) => {
    try {
        const feedback = await readJsonFile('feedback.json');
        const totalFeedback = feedback.length;
        const averageRating = totalFeedback > 0 ? feedback.reduce((sum, f) => sum + f.rating, 0) / totalFeedback : 0;
        res.json({
            success: true,
            stats: {
                totalFeedback,
                averageRating: Number(averageRating.toFixed(2)),
                lastSubmission: feedback.length > 0 ? feedback[feedback.length - 1].createdAt : null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;