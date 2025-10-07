import React, { useState, useEffect } from 'react';

function Stopwatch() {
  // State สำหรับจัดการนาฬิกา
  const [time, setTime] = useState(0); // เวลาที่ผ่านไป (มิลลิวินาที)
  const [isRunning, setIsRunning] = useState(false); // สถานะนาฬิกา
  const [laps, setLaps] = useState([]); // ประวัติรอบ

  // useEffect สำหรับจับเวลา
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10); // อัพเดททุก 10 มิลลิวินาที
    }
    return () => clearInterval(interval); // Cleanup
  }, [isRunning]);

  // ฟังก์ชันเริ่ม/หยุดนาฬิกา
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // ฟังก์ชันรีเซ็ตนาฬิกา
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // ฟังก์ชันบันทึกรอบ
  const recordLap = () => {
    if (!isRunning || time === 0) return;
    setLaps([{ id: laps.length + 1, time }, ...laps.slice(0, 4)]); // เก็บแค่ 5 รอบล่าสุด
  };

  // ฟังก์ชันแปลงเวลาเป็น MM:SS:MS
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
        นาฬิกาจับเวลา (State + Timer)
      </h2>

      {/* Time Display */}
      <div className="bg-blue-50 p-6 rounded-xl mb-6 shadow-sm text-center">
        <div className="text-5xl font-mono font-bold text-blue-800 drop-shadow-lg">
          {formatTime(time)}
        </div>
        <div className="text-sm text-blue-600 mt-2">
          สถานะ: {isRunning ? 'กำลังทำงาน' : 'หยุด'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={toggleTimer}
          className={`px-6 py-3 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
            isRunning
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-teal-500 hover:bg-teal-600 text-white'
          }`}
        >
          {isRunning ? 'หยุด' : 'เริ่ม'}
        </button>
        <button
          onClick={recordLap}
          disabled={!isRunning || time === 0}
          className={`px-6 py-3 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
            isRunning && time > 0
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          บันทึกรอบ
        </button>
        <button
          onClick={resetTimer}
          disabled={time === 0 && laps.length === 0}
          className={`px-6 py-3 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
            time > 0 || laps.length > 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          รีเซ็ต
        </button>
      </div>

      {/* Lap History */}
      {laps.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm">
          <h3 className="font-bold text-blue-800 mb-2">ประวัติรอบ:</h3>
          <div className="space-y-1">
            {laps.map(lap => (
              <div key={lap.id} className="text-sm text-blue-700">
                รอบ {lap.id}: {formatTime(lap.time)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Rules */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm">
        <h3 className="font-bold text-blue-800 mb-2">📖 วิธีใช้งาน:</h3>
        <ul className="text-sm space-y-1 text-blue-700">
          <li>• คลิก "เริ่ม" เพื่อเริ่มจับเวลา</li>
          <li>• คลิก "หยุด" เพื่อหยุดชั่วคราว</li>
          <li>• คลิก "บันทึกรอบ" เพื่อบันทึกเวลาในรอบนั้น</li>
          <li>• คลิก "รีเซ็ต" เพื่อเริ่มใหม่ทั้งหมด</li>
        </ul>
      </div>

      {/* State Debug Info */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-bold text-blue-800 mb-2">🔧 Timer States:</p>
        <div className="text-xs text-blue-600 space-y-1">
          <p><strong>time:</strong> {time} ms ({formatTime(time)})</p>
          <p><strong>isRunning:</strong> {isRunning.toString()}</p>
          <p><strong>laps.length:</strong> {laps.length}</p>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          useEffect + Interval + Array State + Formatting
        </p>
      </div>
    </div>
  );
}

export default Stopwatch;