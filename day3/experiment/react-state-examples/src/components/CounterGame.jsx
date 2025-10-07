import React, { useState, useEffect } from 'react';

function CounterGame() {
  // Game States
  const [score, setScore] = useState(100); // เริ่มต้นที่ 100
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60); // เริ่มต้นที่ 60 วินาที
  const [isGameActive, setIsGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [clickStreak, setClickStreak] = useState(0);
  const [powerUps, setPowerUps] = useState({ doubleScore: 0, extraTime: 0 }); // Power-ups state
  const [isDoubleScoreActive, setIsDoubleScoreActive] = useState(false); // สถานะ power-up Double Score

  // Timer Effect
  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // Double Score Power-Up Effect
  useEffect(() => {
    let timeout;
    if (isDoubleScoreActive) {
      timeout = setTimeout(() => {
        setIsDoubleScoreActive(false);
        setMultiplier(prev => prev / 2); // คืนตัวคูณเมื่อ power-up หมดเวลา
      }, 5000); // Double Score ทำงาน 5 วินาที
    }
    return () => clearTimeout(timeout);
  }, [isDoubleScoreActive]);

  // ฟังก์ชันเริ่มเกม
  const startGame = () => {
    setScore(100);
    setLevel(1);
    setTimeLeft(60);
    setMultiplier(1);
    setClickStreak(0);
    setPowerUps({ doubleScore: 0, extraTime: 0 });
    setIsDoubleScoreActive(false);
    setIsGameActive(true);
  };

  // ฟังก์ชันเพิ่มคะแนน
  const addScore = (points) => {
    if (!isGameActive) return;

    const currentMultiplier = isDoubleScoreActive ? multiplier * 2 : multiplier;
    const newScore = score + (points * currentMultiplier);
    const newStreak = clickStreak + 1;
    
    setScore(newScore);
    setClickStreak(newStreak);

    // เลเวลอัพ
    const newLevel = Math.floor(newScore / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      if (!isDoubleScoreActive) {
        setMultiplier(1 + (newLevel - 1) * 0.5);
      }
    }

    // Streak bonus
    if (newStreak % 10 === 0) {
      setScore(prev => prev + 50); // Bonus!
    }

    // Power-up reward
    if (newScore >= Math.floor(newScore / 50) * 50 && newScore % 50 < points * currentMultiplier) {
      setPowerUps(prev => ({
        ...prev,
        [Math.random() < 0.5 ? 'doubleScore' : 'extraTime']: prev.doubleScore + 1
      }));
    }

    // อัพเดท High Score
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  // ฟังก์ชันใช้ Power-Up
  const usePowerUp = (type) => {
    if (powerUps[type] <= 0 || !isGameActive) return;

    if (type === 'doubleScore' && !isDoubleScoreActive) {
      setIsDoubleScoreActive(true);
      setMultiplier(prev => prev * 2);
      setPowerUps(prev => ({ ...prev, doubleScore: prev.doubleScore - 1 }));
    } else if (type === 'extraTime') {
      setTimeLeft(prev => prev + 10);
      setPowerUps(prev => ({ ...prev, extraTime: prev.extraTime - 1 }));
    }
  };

  // จบเกม
  const endGame = () => {
    setIsGameActive(false);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
        เกมนับคะแนน (Complex State Logic + Power-Ups)
      </h2>

      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl text-center shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-blue-800">คะแนน</div>
        </div>
        <div className="bg-teal-50 p-4 rounded-xl text-center shadow-sm">
          <div className="text-2xl font-bold text-teal-600">{highScore}</div>
          <div className="text-sm text-blue-800">คะแนนสูงสุด</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center shadow-sm">
          <div className="text-2xl font-bold text-purple-600">Lv.{level}</div>
          <div className="text-sm text-blue-800">เลเวล</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl text-center shadow-sm">
          <div className="text-2xl font-bold text-orange-600">{timeLeft}s</div>
          <div className="text-sm text-blue-800">เวลาเหลือ</div>
        </div>
      </div>

      {/* Multiplier & Streak */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-yellow-50 p-3 rounded-xl text-center shadow-sm">
          <div className="text-lg font-bold text-yellow-600">×{(isDoubleScoreActive ? multiplier * 2 : multiplier).toFixed(1)}</div>
          <div className="text-xs text-blue-800">ตัวคูณ</div>
        </div>
        <div className="bg-red-50 p-3 rounded-xl text-center shadow-sm">
          <div className="text-lg font-bold text-red-600">{clickStreak}</div>
          <div className="text-xs text-blue-800">คลิกต่อเนื่อง</div>
        </div>
      </div>

      {/* Power-Ups */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm">
        <h3 className="font-bold text-blue-800 mb-2">Power-Ups:</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => usePowerUp('doubleScore')}
            disabled={powerUps.doubleScore <= 0 || !isGameActive || isDoubleScoreActive}
            className={`py-2 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
              powerUps.doubleScore > 0 && isGameActive && !isDoubleScoreActive
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Double Score ({powerUps.doubleScore})
          </button>
          <button
            onClick={() => usePowerUp('extraTime')}
            disabled={powerUps.extraTime <= 0 || !isGameActive}
            className={`py-2 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
              powerUps.extraTime > 0 && isGameActive
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Extra Time ({powerUps.extraTime})
          </button>
        </div>
      </div>

      {/* Game Controls */}
      {!isGameActive ? (
        <div className="text-center mb-6">
          <button
            onClick={startGame}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-xl transform hover:scale-105 transition-transform duration-200 shadow-md"
          >
            🎮 เริ่มเกม
          </button>
          {score > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl shadow-sm">
              <p className="text-lg font-bold text-blue-800">เกมจบแล้ว!</p>
              <p>คะแนนรวม: <span className="text-teal-600 font-bold">{score}</span></p>
              <p>เลเวลสูงสุด: <span className="text-purple-600 font-bold">{level}</span></p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => addScore(1)}
              className="bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-transform duration-200 shadow-md"
            >
              +1 คะแนน
            </button>
            <button
              onClick={() => addScore(5)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-transform duration-200 shadow-md"
            >
              +5 คะแนน
            </button>
          </div>
          <button
            onClick={() => addScore(10)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-transform duration-200 shadow-md"
          >
            +10 คะแนน (โบนัส!)
          </button>
          <button
            onClick={() => addScore(20)}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg transform hover:scale-105 transition-transform duration-200 shadow-md"
          >
            +20 คะแนน (พิเศษ!)
          </button>
          <button
            onClick={endGame}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md"
          >
            หยุดเกม
          </button>
        </div>
      )}

      {/* Game Rules */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm">
        <h3 className="font-bold text-blue-800 mb-2">📖 กติกา:</h3>
        <ul className="text-sm space-y-1 text-blue-700">
          <li>• คลิกปุ่มเพื่อเก็บคะแนนภายใน 60 วินาที</li>
          <li>• ทุก 100 คะแนน = เลเวลอัพ + ตัวคูณเพิ่ม</li>
          <li>• คลิกต่อเนื่อง 10 ครั้ง = โบนัส 50 คะแนน</li>
          <li>• ทุก 50 คะแนน = ได้ Power-Up (Double Score หรือ Extra Time)</li>
          <li>• Double Score: คะแนน x2 เป็นเวลา 5 วินาที</li>
          <li>• Extra Time: เพิ่มเวลา 10 วินาที</li>
          <li>• พยายามทำคะแนนสูงสุด!</li>
        </ul>
      </div>

      {/* State Debug Info */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-bold text-blue-800 mb-2">🔧 Complex States:</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-600">
          <div>score: {score}</div>
          <div>level: {level}</div>
          <div>timeLeft: {timeLeft}</div>
          <div>isGameActive: {isGameActive.toString()}</div>
          <div>multiplier: {(isDoubleScoreActive ? multiplier * 2 : multiplier).toFixed(1)}</div>
          <div>clickStreak: {clickStreak}</div>
          <div>doubleScore Power-Ups: {powerUps.doubleScore}</div>
          <div>extraTime Power-Ups: {powerUps.extraTime}</div>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Timer + Power-Ups + Conditions + State Machine + useEffect
        </p>
      </div>
    </div>
  );
}

export default CounterGame;