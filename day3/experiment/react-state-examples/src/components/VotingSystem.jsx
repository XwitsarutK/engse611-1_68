import React, { useState } from 'react';

function VotingSystem() {
  // State สำหรับตัวเลือกการโหวต (Array of Objects)
  const [options, setOptions] = useState([
    { id: 1, name: 'แดง', votes: 0, color: 'bg-red-500' },
    { id: 2, name: 'น้ำเงิน', votes: 0, color: 'bg-blue-500' },
    { id: 3, name: 'เขียว', votes: 0, color: 'bg-green-500' },
    { id: 4, name: 'เหลือง', votes: 0, color: 'bg-yellow-500' },
  ]);

  // State สำหรับตัวเลือกที่ผู้ใช้เลือก
  const [selectedOption, setSelectedOption] = useState('');

  // ฟังก์ชันเพิ่มโหวต
  const addVote = () => {
    if (!selectedOption) {
      alert('กรุณาเลือกตัวเลือกก่อนโหวต!');
      return;
    }

    setOptions(options.map(option =>
      option.id === parseInt(selectedOption)
        ? { ...option, votes: option.votes + 1 }
        : option
    ));
    setSelectedOption(''); // รีเซ็ตตัวเลือกหลังโหวต
  };

  // ฟังก์ชันรีเซ็ตโหวต
  const resetVotes = () => {
    setOptions(options.map(option => ({ ...option, votes: 0 })));
    setSelectedOption('');
  };

  // คำนวณโหวตทั้งหมด
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  // คำนวณเปอร์เซ็นต์สำหรับแต่ละตัวเลือก
  const getPercentage = (votes) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
        ระบบโหวต (Array & Object State)
      </h2>

      {/* ฟอร์มเลือกตัวเลือก */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          เลือกสีที่คุณชอบ:
        </label>
        <div className="flex gap-2">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- เลือกสี --</option>
            {options.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <button
            onClick={addVote}
            disabled={!selectedOption}
            className={`px-4 py-3 rounded-lg font-medium ${
              selectedOption
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            โหวต
          </button>
        </div>
      </div>

      {/* ปุ่มรีเซ็ต */}
      <div className="text-center mb-6">
        <button
          onClick={resetVotes}
          disabled={totalVotes === 0}
          className={`px-4 py-2 rounded-lg font-medium ${
            totalVotes > 0
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          รีเซ็ตผลโหวต
        </button>
      </div>

      {/* แสดงผลโหวต */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-lg mb-3 text-gray-800">
          ผลโหวต ({totalVotes} โหวต)
        </h3>
        <div className="space-y-3">
          {options.map(option => (
            <div key={option.id} className="flex items-center gap-3">
              <div className="w-24 text-sm font-medium">{option.name}</div>
              <div className="flex-1">
                <div
                  className={`${option.color} h-6 rounded`}
                  style={{ width: `${getPercentage(option.votes)}%` }}
                ></div>
              </div>
              <div className="w-24 text-sm text-gray-600">
                {option.votes} โหวต ({getPercentage(option.votes)}%)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ข้อมูล State */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm font-bold mb-2">🔧 State Debug Info:</p>
        <div className="text-xs text-gray-600 space-y-1">
          <p><strong>selectedOption:</strong> {selectedOption || 'none'}</p>
          <p><strong>options:</strong></p>
          <ul className="list-disc pl-4">
            {options.map(option => (
              <li key={option.id}>
                {option.name}: {option.votes} votes
              </li>
            ))}
          </ul>
          <p><strong>Total Votes:</strong> {totalVotes}</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          การจัดการ Array state + Object updates + Computed values
        </p>
      </div>
    </div>
  );
}

export default VotingSystem;