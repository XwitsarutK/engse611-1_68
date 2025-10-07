import React, { useState, useEffect, useRef } from 'react';

function SimpleChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const timestamp = new Date().toLocaleTimeString('th-TH', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: newMessage.trim(),
        sender: 'คุณ',
        timestamp
      }
    ]);
    setNewMessage('');
  };

  const clearChat = () => setMessages([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-extrabold mb-6 text-indigo-600 text-center tracking-tight drop-shadow-sm">
        💬 ระบบแชท (Array State + Scroll)
      </h2>
      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl mb-6 max-h-96 min-h-[200px] overflow-y-auto border border-indigo-100 shadow-lg transition-all duration-300"
      >
        {messages.length === 0 ? (
          <div className="text-center text-indigo-400 text-base font-medium py-8">
            ยังไม่มีข้อความ <span className="animate-pulse">เริ่มแชทเลย!</span>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map(message => (
              <div key={message.id} className="flex items-start gap-3">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-md text-indigo-800 font-medium max-w-[80%] border border-indigo-100">
                  <span>{message.text}</span>
                  <div className="text-xs text-gray-400 mt-1 text-right">{message.sender} • {message.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Input Area */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 p-3 border border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm bg-white text-indigo-900 placeholder:text-indigo-300"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className={`px-4 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-md ${
            newMessage.trim()
              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ส่ง
        </button>
        <button
          onClick={clearChat}
          disabled={messages.length === 0}
          className={`px-4 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-transform duration-200 shadow-md ${
            messages.length > 0
              ? 'bg-pink-500 hover:bg-pink-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ล้าง
        </button>
      </div>
    </div>
  );
}

export default SimpleChat;
