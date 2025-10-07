import React, { useState } from 'react';

function NameChanger() {
  // State เก็บชื่อที่ผู้ใช้พิมพ์ เริ่มต้นเป็น "ยินดีต้อนรับ"
  const [name, setName] = useState('ยินดีต้อนรับ');

  // รายการชื่อสำหรับสุ่ม
  const randomNames = ['สมชาย', 'สมหญิง', 'น้องแมว', 'นายแดง', 'คุณเขียว'];

  // ฟังก์ชันสุ่มชื่อ
  const randomName = () => {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    setName(randomNames[randomIndex]);
  };

  // คำนวณจำนวนคำ
  const wordCount = name.trim() ? name.trim().split(/\s+/).filter(word => word.length > 0).length : 0;

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
        การเปลี่ยนข้อความ (Text State)
      </h2>
      
      {/* Input Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-blue-800">
          พิมพ์ชื่อของคุณ:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น สมชาย ใจดี"
          className="w-full p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        />
      </div>
      
      {/* แสดงผลการทักทาย */}
      <div className="text-center bg-blue-50 p-6 rounded-xl mb-6 shadow-sm">
        <h3 className="text-2xl font-bold">
          {name ? (
            <span className="text-teal-600">สวัสดี {name}! 👋</span>
          ) : (
            <span className="text-gray-400">กรุณาพิมพ์ชื่อของคุณ...</span>
          )}
        </h3>
        <p className="text-sm text-blue-600 mt-2">
          <strong>จำนวนคำ:</strong> {wordCount} คำ
        </p>
      </div>
      
      {/* ปุ่มควบคุม */}
      <div className="text-center mb-6 flex gap-4 justify-center">
        <button
          onClick={() => setName('')}
          disabled={!name}
          className={`px-4 py-2 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
            name 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ล้างชื่อ
        </button>
        <button
          onClick={randomName}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          เปลี่ยนเป็นชื่อสุ่ม
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-blue-800">
          <strong>State:</strong> name = "{name}"
        </p>
        <p className="text-sm font-medium text-blue-800">
          <strong>ความยาว:</strong> {name.length} ตัวอักษร
        </p>
        <p className="text-sm font-medium text-blue-800">
          <strong>จำนวนคำ:</strong> {wordCount} คำ
        </p>
        <p className="text-xs text-blue-600 mt-1">
          พิมพ์ → onChange → setName() → Re-render
        </p>
      </div>
    </div>
  );
}

export default NameChanger;