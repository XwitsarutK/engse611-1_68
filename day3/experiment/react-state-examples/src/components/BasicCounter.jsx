import React, { useState } from 'react';

function BasicCounter() {
  // State เก็บค่าตัวเลข เริ่มต้นที่ 10
  const [count, setCount] = useState(10);

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">
        ตัวนับพื้นฐาน (useState)
      </h2>
      
      {/* แสดงค่า count */}
      <div className="text-6xl font-bold mb-8 text-blue-800 drop-shadow-lg">
        {count}
      </div>
      
      {/* ปุ่มควบคุม */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button 
          onClick={() => setCount(count - 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          ลด (-1)
        </button>
        
        <button 
          onClick={() => setCount(10)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          รีเซ็ต
        </button>
        
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          เพิ่ม (+1)
        </button>
        
        <button 
          onClick={() => setCount(count + 5)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          เพิ่ม (+5)
        </button>
        
        <button 
          onClick={() => setCount(count + 10)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          เพิ่ม (+10)
        </button>
      </div>
      
      {/* แสดงข้อมูล State */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-blue-800">
          <strong>State:</strong> count = {count}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          คลิกปุ่ม → setCount() → Re-render → แสดงค่าใหม่
        </p>
      </div>
    </div>
  );
}

export default BasicCounter;