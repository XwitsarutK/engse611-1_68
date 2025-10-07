import React, { useState } from 'react';

function NumberGuessing() {
  // State สำหรับจัดการเกม
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1); // ตัวเลขที่ต้องทาย (1-100)
  const [guess, setGuess] = useState(''); // การทายของผู้ใช้
  const [attempts, setAttempts] = useState(0); // จำนวนครั้งที่ทาย
  const [history, setHistory] = useState([]); // ประวัติการทาย
  const [message, setMessage] = useState(''); // ข้อความคำใบ้หรือผลลัพธ์
  const [isGameOver, setIsGameOver] = useState(false); // สถานะเกมจบ

  // ฟังก์ชันตรวจสอบการทาย
  const checkGuess = () => {
    const numGuess = parseInt(guess);
    
    // Validation
    if (!guess || isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('กรุณาใส่ตัวเลขระหว่าง 1 ถึง 100');
      return;
    }

    setAttempts(attempts + 1);

    // ตรวจสอบการทาย
    if (numGuess === targetNumber) {
      setMessage(`ยินดีด้วย! คุณทายถูก ตัวเลขคือ ${targetNumber} ใช้ ${attempts + 1} ครั้ง`);
      setIsGameOver(true);
    } else if (numGuess < targetNumber) {
      setMessage('ต่ำเกินไป! ลองทายตัวเลขที่สูงขึ้น');
    } else {
      setMessage('สูงเกินไป! ลองทายตัวเลขที่ต่ำลง');
    }

    // อัพเดทประวัติ (เก็บแค่ 5 รายการล่าสุด)
    setHistory([{ guess: numGuess, message: message }, ...history.slice(0, 4)]);
    setGuess(''); // ล้าง input
  };

  // ฟังก์ชันเริ่มเกมใหม่
  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setHistory([]);
    setMessage('');
    setIsGameOver(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
        เกมทายตัวเลข (State + Game Logic)
      </h2>

      {/* Game Info */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm text-center">
        <div className="text-lg font-bold text-blue-800">ทายตัวเลขระหว่าง 1 ถึง 100</div>
        <div className="text-sm text-blue-600">จำนวนครั้งที่ทาย: {attempts}</div>
      </div>

      {/* Input and Guess Button */}
      {!isGameOver ? (
        <div className="flex gap-2 mb-6">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && checkGuess()}
            placeholder="พิมพ์ตัวเลข..."
            className="flex-1 p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            disabled={isGameOver}
          />
          <button
            onClick={checkGuess}
            disabled={!guess || isGameOver}
            className={`px-4 py-3 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
              guess && !isGameOver
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            ทาย
          </button>
        </div>
      ) : (
        <div className="text-center mb-6">
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md"
          >
            เริ่มเกมใหม่
          </button>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-xl mb-6 shadow-sm text-center ${
          isGameOver ? 'bg-teal-50 border-teal-200' : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-lg font-medium ${
            isGameOver ? 'text-teal-600' : 'text-blue-800'
          }`}>
            {message}
          </p>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm">
          <h3 className="font-bold text-blue-800 mb-2">ประวัติการทาย:</h3>
          <div className="space-y-1">
            {history.map((entry, index) => (
              <div key={index} className="text-sm text-blue-700">
                ทาย: {entry.guess} - {entry.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Rules */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm">
        <h3 className="font-bold text-blue-800 mb-2">📖 กติกา:</h3>
        <ul className="text-sm space-y-1 text-blue-700">
          <li>• ทายตัวเลขระหว่าง 1 ถึง 100</li>
          <li>• ระบบจะบอกใบ้ว่าตัวเลขที่ทายสูงหรือต่ำเกินไป</li>
          <li>• พยายามทายให้ถูกโดยใช้จำนวนครั้งน้อยที่สุด!</li>
        </ul>
      </div>

      {/* State Debug Info */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-bold text-blue-800 mb-2">🔧 Game States:</p>
        <div className="text-xs text-blue-600 space-y-1">
          <p><strong>targetNumber:</strong> {targetNumber} (ตัวเลขที่ต้องทาย)</p>
          <p><strong>guess:</strong> {guess || 'none'}</p>
          <p><strong>attempts:</strong> {attempts}</p>
          <p><strong>isGameOver:</strong> {isGameOver.toString()}</p>
          <p><strong>history.length:</strong> {history.length}</p>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Input → Validation → State Update → Conditional Rendering
        </p>
      </div>
    </div>
  );
}

export default NumberGuessing;