import React, { useState } from 'react';

function SimpleCalculator() {
  // Multiple States ทำงานร่วมกัน
  const [number1, setNumber1] = useState('0');
  const [number2, setNumber2] = useState('0');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // ฟังก์ชันคำนวณ
  const calculate = () => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);
    
    if (isNaN(num1)) {
      alert('กรุณาใส่ตัวเลขที่ 1');
      return;
    }

    // Validation เฉพาะสำหรับ √
    if (operator === '√' && num1 < 0) {
      alert('ไม่สามารถคำนวณรากที่สองของจำนวนลบได้');
      return;
    }

    // Validation สำหรับ operator อื่นๆ
    if (operator !== '√' && isNaN(num2)) {
      alert('กรุณาใส่ตัวเลขที่ 2');
      return;
    }

    let calcResult;
    let calculation;
    switch (operator) {
      case '+':
        calcResult = num1 + num2;
        calculation = `${num1} + ${num2} = ${calcResult}`;
        break;
      case '-':
        calcResult = num1 - num2;
        calculation = `${num1} - ${num2} = ${calcResult}`;
        break;
      case '*':
        calcResult = num1 * num2;
        calculation = `${num1} × ${num2} = ${calcResult}`;
        break;
      case '/':
        if (num2 === 0) {
          alert('ไม่สามารถหารด้วย 0 ได้');
          return;
        }
        calcResult = num1 / num2;
        calculation = `${num1} ÷ ${num2} = ${calcResult}`;
        break;
      case '%':
        calcResult = (num1 / 100) * num2;
        calculation = `${num1}% of ${num2} = ${calcResult}`;
        break;
      case '√':
        calcResult = Math.sqrt(num1);
        calculation = `√${num1} = ${calcResult}`;
        break;
      default:
        return;
    }

    setResult(calcResult);
    
    // เพิ่มลงประวัติ
    setHistory([calculation, ...history.slice(0, 4)]); // เก็บแค่ 5 รายการล่าสุด
  };

  // ฟังก์ชันล้างข้อมูล
  const clear = () => {
    setNumber1('0');
    setNumber2('0');
    setOperator('+');
    setResult(null);
  };

  // ฟังก์ชันสลับตัวเลข
  const swapNumbers = () => {
    setNumber1(number2);
    setNumber2(number1);
  };

  // ฟังก์ชันล้างประวัติ
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
        เครื่องคิดเลข (Multiple States)
      </h2>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <input
          type="number"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          placeholder="ตัวเลขที่ 1"
          className="w-full p-3 border border-blue-300 rounded-xl text-center text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        />

        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="w-full p-3 border border-blue-300 rounded-xl text-center text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        >
          <option value="+">+ บวก</option>
          <option value="-">- ลบ</option>
          <option value="*">× คูณ</option>
          <option value="/">÷ หาร</option>
          <option value="%">% เปอร์เซ็นต์</option>
          <option value="√">√ รากที่สอง</option>
        </select>

        <input
          type="number"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          placeholder="ตัวเลขที่ 2"
          className={`w-full p-3 border border-blue-300 rounded-xl text-center text-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm ${
            operator === '√' ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          disabled={operator === '√'}
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={calculate}
          disabled={!number1 || (operator !== '√' && !number2)}
          className={`py-3 rounded-xl font-bold text-xl transform hover:scale-105 transition-transform duration-200 shadow-md ${
            number1 && (operator === '√' || number2)
              ? 'bg-teal-500 hover:bg-teal-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          คำนวณ
        </button>

        <button
          onClick={clear}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold text-xl transform hover:scale-105 transition-transform duration-200 shadow-md"
        >
          ล้าง
        </button>

        <button
          onClick={swapNumbers}
          disabled={operator === '√'}
          className={`py-3 rounded-xl font-bold text-xl transform hover:scale-105 transition-transform duration-200 shadow-md ${
            operator !== '√'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          สลับตัวเลข
        </button>
      </div>

      {/* Result */}
      {result !== null && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="text-center">
            <div className="text-sm text-blue-800 mb-1">ผลลัพธ์:</div>
            <div className="text-3xl font-bold text-teal-600">
              {result.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-blue-800">ประวัติการคำนวณ:</h3>
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:text-red-700"
            >
              ล้างประวัติ
            </button>
          </div>
          <div className="space-y-1">
            {history.map((calc, index) => (
              <div key={index} className="text-sm text-blue-700 font-mono">
                {calc}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Debug Info */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-bold text-blue-800">
          <strong>States:</strong>
        </p>
        <ul className="text-xs text-blue-600 mt-1 space-y-1">
          <li>number1 = "{number1}"</li>
          <li>number2 = "{number2}"</li>
          <li>operator = "{operator}"</li>
          <li>result = {result}</li>
          <li>history.length = {history.length}</li>
        </ul>
        <p className="text-xs text-blue-600 mt-2">
          หลาย States ทำงานร่วมกัน + Validation + History
        </p>
      </div>
    </div>
  );
}

export default SimpleCalculator;