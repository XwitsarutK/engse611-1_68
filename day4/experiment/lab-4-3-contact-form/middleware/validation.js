const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

    // ตรวจสอบ name
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
        errors.push('ชื่อต้องเป็น string ความยาว 2-100 ตัวอักษร');
    }

    // ตรวจสอบ email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
        errors.push('รูปแบบอีเมลไม่ถูกต้อง');
    }

    // ตรวจสอบ subject
    if (!subject || typeof subject !== 'string' || subject.trim().length < 5 || subject.trim().length > 200) {
        errors.push('หัวเรื่องต้องเป็น string ความยาว 5-200 ตัวอักษร');
    }

    // ตรวจสอบ message
    if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000) {
        errors.push('ข้อความต้องเป็น string ความยาว 10-1000 ตัวอักษร');
    }

    // ตรวจสอบ phone (optional)
    if (phone && !/^[0-9]{9,10}$/.test(phone.trim())) {
        errors.push('เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก');
    }

    // ตรวจสอบ company (optional)
    if (company && typeof company !== 'string' || company.trim().length > 100) {
        errors.push('ชื่อบริษัทต้องไม่เกิน 100 ตัวอักษร');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    // Sanitize data
    req.body.name = req.body.name.trim();
    req.body.email = req.body.email.trim().toLowerCase();
    req.body.subject = req.body.subject.trim();
    req.body.message = req.body.message.trim();
    if (phone) req.body.phone = phone.trim();
    if (company) req.body.company = company.trim();

    next();
};

// Feedback validation
const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];

    // ตรวจสอบ rating
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        errors.push('คะแนนต้องเป็นตัวเลข 1-5');
    }

    // ตรวจสอบ comment
    if (!comment || typeof comment !== 'string' || comment.trim().length < 5 || comment.trim().length > 500) {
        errors.push('ความคิดเห็นต้องเป็น string ความยาว 5-500 ตัวอักษร');
    }

    // ตรวจสอบ email (optional)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errors.push('รูปแบบอีเมลไม่ถูกต้อง');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    next();
};

module.exports = {
    validateContact,
    validateFeedback
};