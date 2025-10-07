import React, { useState, useEffect } from 'react';

function ColorPicker() {
  // State เก็บสีที่เลือก เริ่มต้นเป็น purple
  const [selectedColor, setSelectedColor] = useState('purple');

  // ข้อมูลสีที่ใช้ได้ รวมสีใหม่ (ส้ม, เทา)
  const colors = [
    { name: 'ฟ้า', value: 'blue', bg: 'bg-blue-100', button: 'bg-blue-500' },
    { name: 'เขียว', value: 'green', bg: 'bg-teal-100', button: 'bg-teal-500' },
    { name: 'ชมพู', value: 'pink', bg: 'bg-pink-100', button: 'bg-pink-500' },
    { name: 'เหลือง', value: 'yellow', bg: 'bg-yellow-100', button: 'bg-yellow-500' },
    { name: 'ม่วง', value: 'purple', bg: 'bg-purple-100', button: 'bg-purple-500' },
    { name: 'ส้ม', value: 'orange', bg: 'bg-orange-100', button: 'bg-orange-500' }, // สีใหม่
    { name: 'เทา', value: 'gray', bg: 'bg-gray-100', button: 'bg-gray-500' }, // สีใหม่
  ];

  // หาข้อมูลสีปัจจุบัน
  const currentColor = colors.find(color => color.value === selectedColor);

  // Sync selectedColor กับ CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', getGradientColor(selectedColor));
  }, [selectedColor]);

  // แปลงค่า selectedColor เป็นสี gradient
  const getGradientColor = (color) => {
    const colorMap = {
      blue: '#667eea',
      green: '#38b2ac',
      pink: '#f472b6',
      yellow: '#f59e0b',
      purple: '#764ba2',
      orange: '#f97316',
      gray: '#9ca3af',
    };
    return colorMap[color] || '#764ba2'; // Default to purple if not found
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
        เปลี่ยนสีพื้นหลัง (State + UI)
      </h2>
      
      {/* พื้นที่แสดงสีที่เลือก */}
      <div className={`${currentColor?.bg} border-2 border-blue-300 rounded-xl p-8 mb-6 text-center transition-all duration-300 shadow-md`}>
        <div className="text-3xl mb-2">🎨</div>
        <div className="text-xl font-bold text-blue-800 drop-shadow-lg">
          สีที่เลือก: {currentColor?.name}
        </div>
      </div>
      
      {/* ปุ่มเลือกสี */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 text-blue-800">เลือกสีที่ต้องการ:</p>
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`${color.button} hover:opacity-80 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-md ${
                selectedColor === color.value ? 'ring-2 ring-teal-400 scale-105' : ''
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* ปุ่มสุ่มสีและรีเซ็ตสี */}
      <div className="text-center mb-6 flex gap-4 justify-center">
        <button
          onClick={() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setSelectedColor(randomColor.value);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          🎲 สุ่มสี
        </button>
        <button
          onClick={() => setSelectedColor('purple')}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          รีเซ็ตสี
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-blue-800">
          <strong>State:</strong> selectedColor = "{selectedColor}"
        </p>
        <p className="text-sm font-medium text-blue-800">
          <strong>CSS Class:</strong> {currentColor?.bg}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          คลิกสี → setSelectedColor() → เปลี่ยน className
        </p>
      </div>
    </div>
  );
}

export default ColorPicker;