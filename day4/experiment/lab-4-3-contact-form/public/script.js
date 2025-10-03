// Global variables
let isSubmitting = false;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const feedbackForm = document.getElementById('feedbackForm');
const statusMessages = document.getElementById('statusMessages');
const apiResults = document.getElementById('apiResults');
const ratingSlider = document.getElementById('rating');
const ratingValue = document.getElementById('ratingValue');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeForms();
    setupEventListeners();
});

function initializeForms() {
    // Update rating display
    ratingSlider.addEventListener('input', () => {
        ratingValue.textContent = ratingSlider.value;
    });
}

function setupEventListeners() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitContactForm();
    });

    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitFeedbackForm();
    });

    // Real-time validation
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });
    feedbackForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => validateField(input));
    });
}

function validateField(input) {
    const { name, value } = input;
    const errorElement = document.getElementById(`${name}Error`);
    let isValid = true;
    let message = '';

    switch (name) {
        case 'name':
            isValid = value.trim().length >= 2 && value.trim().length <= 100;
            message = 'ชื่อต้องมีความยาว 2-100 ตัวอักษร';
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value.trim());
            message = 'รูปแบบอีเมลไม่ถูกต้อง';
            break;
        case 'phone':
            isValid = !value || /^[0-9]{9,10}$/.test(value.trim());
            message = 'เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก';
            break;
        case 'company':
            isValid = !value || value.trim().length <= 100;
            message = 'ชื่อบริษัทต้องไม่เกิน 100 ตัวอักษร';
            break;
        case 'subject':
            isValid = value.trim().length >= 5 && value.trim().length <= 200;
            message = 'หัวเรื่องต้องมีความยาว 5-200 ตัวอักษร';
            break;
        case 'message':
            isValid = value.trim().length >= 10 && value.trim().length <= 1000;
            message = 'ข้อความต้องมีความยาว 10-1000 ตัวอักษร';
            break;
        case 'rating':
            isValid = !isNaN(value) && value >= 1 && value <= 5;
            message = 'คะแนนต้องเป็น 1-5';
            break;
        case 'comment':
            isValid = value.trim().length >= 5 && value.trim().length <= 500;
            message = 'ความคิดเห็นต้องมีความยาว 5-500 ตัวอักษร';
            break;
    }

    input.classList.toggle('valid', isValid);
    input.classList.toggle('invalid', !isValid);
    errorElement.textContent = !isValid ? message : '';
    return { isValid, message };
}

async function submitContactForm() {
    if (isSubmitting) return;

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
        isSubmitting = true;
        updateSubmitButton('contactSubmit', 'กำลังส่ง...', true);

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showStatusMessage('✅ ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็ว', 'success');
            contactForm.reset();
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) displayValidationErrors(result.errors);
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('contactSubmit', 'ส่งข้อความ', false);
    }
}

async function submitFeedbackForm() {
    if (isSubmitting) return;

    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    data.rating = parseInt(data.rating);

    try {
        isSubmitting = true;
        updateSubmitButton('feedbackSubmit', 'กำลังส่ง...', true);

        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            showStatusMessage('✅ ส่งความคิดเห็นสำเร็จ!', 'success');
            feedbackForm.reset();
            ratingSlider.value = 3;
            ratingValue.textContent = '3';
        } else {
            showStatusMessage(`❌ เกิดข้อผิดพลาด: ${result.message}`, 'error');
            if (result.errors) displayValidationErrors(result.errors);
        }
    } catch (error) {
        showStatusMessage('❌ เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
        console.error('Error:', error);
    } finally {
        isSubmitting = false;
        updateSubmitButton('feedbackSubmit', 'ส่งความคิดเห็น', false);
    }
}

function showStatusMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;
    statusMessages.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 5000);
}

function updateSubmitButton(buttonId, text, disabled) {
    const button = document.getElementById(buttonId);
    button.textContent = text;
    button.disabled = disabled;
}

function displayValidationErrors(errors) {
    errors.forEach(error => showStatusMessage(`🔸 ${error}`, 'error'));
}

// API Testing Functions
async function loadContacts() {
    try {
        apiResults.textContent = 'Loading contacts...';
        const response = await fetch('/api/contact');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading contacts: ' + error.message;
    }
}

async function loadFeedbackStats() {
    try {
        apiResults.textContent = 'Loading feedback stats...';
        const response = await fetch('/api/feedback/stats');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading feedback stats: ' + error.message;
    }
}

async function loadAPIStatus() {
    try {
        apiResults.textContent = 'Loading API status...';
        const response = await fetch('/api/status');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading API status: ' + error.message;
    }
}

async function loadAPIDocs() {
    try {
        const response = await fetch('/api/docs');
        const data = await response.json();
        apiResults.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        apiResults.textContent = 'Error loading API docs: ' + error.message;
    }
}