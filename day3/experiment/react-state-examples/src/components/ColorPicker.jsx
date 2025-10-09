import React, { useState } from 'react';

function ColorPicker() {
  // State เก็บสีที่เลือก
  const [selectedColor, setSelectedColor] = useState('blue');

  // ข้อมูลสีที่ใช้ได้
  const colors = [
    { name: 'ฟ้า', value: 'blue', bg: 'bg-blue-100', button: 'bg-blue-500' },
    { name: 'เขียว', value: 'green', bg: 'bg-green-100', button: 'bg-green-500' },
    { name: 'ชมพู', value: 'pink', bg: 'bg-pink-100', button: 'bg-pink-500' },
    { name: 'เหลือง', value: 'yellow', bg: 'bg-yellow-100', button: 'bg-yellow-500' },
    { name: 'ม่วง', value: 'purple', bg: 'bg-purple-100', button: 'bg-purple-500' },
  ];

  // หาข้อมูลสีปัจจุบัน
  const currentColor = colors.find(color => color.value === selectedColor);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
        เปลี่ยนสีพื้นหลัง (State + UI)
      </h2>
      
      {/* พื้นที่แสดงสีที่เลือก */}
      <div className={`${currentColor?.bg} border-2 border-gray-300 rounded-lg p-8 mb-6 text-center transition-all duration-300`}>
        <div className="text-3xl mb-2">🎨</div>
        <div className="text-xl font-bold text-gray-800">
          สีที่เลือก: {currentColor?.name}
        </div>
      </div>
      
      {/* ปุ่มเลือกสี */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">เลือกสีที่ต้องการ:</p>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`${color.button} hover:opacity-80 text-white px-4 py-2 rounded-lg font-medium transition-all ${
                selectedColor === color.value ? 'ring-2 ring-gray-400 scale-105' : ''
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* ปุ่มสุ่มสี */}
      <div className="text-center mb-6">
        <button
          onClick={() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setSelectedColor(randomColor.value);
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          🎲 สุ่มสี
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm">
          <strong>State:</strong> selectedColor = "{selectedColor}"
        </p>
        <p className="text-sm">
          <strong>CSS Class:</strong> {currentColor?.bg}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          คลิกสี → setSelectedColor() → เปลี่ยน className
        </p>
      </div>
    </div>
  );
}

export default ColorPicker;