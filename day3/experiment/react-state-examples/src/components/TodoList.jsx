import React, { useState } from 'react';

function TodoList() {
  // State เก็บรายการงาน (Array of Objects) พร้อมหมวดหมู่
  const [todos, setTodos] = useState([
    { id: 1, text: 'เรียน React.js', completed: false, category: 'งานเรียน' },
    { id: 2, text: 'ทำการบ้าน HTML', completed: true, category: 'งานเรียน' },
    { id: 3, text: 'ซื้อของที่ซูเปอร์', completed: false, category: 'ส่วนตัว' }
  ]);

  // State เก็บข้อความใหม่
  const [newTodo, setNewTodo] = useState('เริ่มต้นงานใหม่');

  // State เก็บหมวดหมู่ที่เลือกสำหรับงานใหม่
  const [category, setCategory] = useState('งานเรียน');

  // State เก็บตัวกรองหมวดหมู่
  const [filterCategory, setFilterCategory] = useState('ทั้งหมด');

  // รายการหมวดหมู่
  const categories = ['งานเรียน', 'งานบ้าน', 'ส่วนตัว'];

  // ฟังก์ชันเพิ่มงานใหม่
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([...todos, { 
        id: newId, 
        text: newTodo.trim(), 
        completed: false,
        category: category 
      }]);
      setNewTodo('เริ่มต้นงานใหม่');
      setCategory('งานเรียน');
    }
  };

  // ฟังก์ชันลบงาน
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // ฟังก์ชันเปลี่ยนสถานะงาน
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // ฟังก์ชันล้างงานทั้งหมด
  const clearAllTodos = () => {
    setTodos([]);
  };

  // กรองรายการงานตามหมวดหมู่
  const filteredTodos = filterCategory === 'ทั้งหมด'
    ? todos
    : todos.filter(todo => todo.category === filterCategory);

  // คำนวณสถิติ
  const completedCount = filteredTodos.filter(todo => todo.completed).length;
  const totalCount = filteredTodos.length;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
        รายการงาน (Array State + Category)
      </h2>

      {/* สถิติ */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-blue-800">งานทั้งหมด</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-teal-600">{completedCount}</div>
            <div className="text-sm text-blue-800">เสร็จแล้ว</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</div>
            <div className="text-sm text-blue-800">ยังไม่เสร็จ</div>
          </div>
        </div>
      </div>

      {/* ตัวกรองหมวดหมู่ */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-blue-800">
          กรองตามหมวดหมู่:
        </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        >
          <option value="ทั้งหมด">ทั้งหมด</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* ฟอร์มเพิ่มงาน */}
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="เพิ่มงานใหม่..."
            className="flex-1 p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
          />
          <button
            onClick={addTodo}
            disabled={!newTodo.trim()}
            className={`px-4 py-3 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
              newTodo.trim()
                ? 'bg-teal-500 hover:bg-teal-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            เพิ่ม
          </button>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* ปุ่มล้างงานทั้งหมด */}
      <div className="text-center mb-6">
        <button
          onClick={clearAllTodos}
          disabled={todos.length === 0}
          className={`px-4 py-2 rounded-xl font-medium transform hover:scale-105 transition-transform duration-200 shadow-md ${
            todos.length > 0
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ล้างงานทั้งหมด
        </button>
      </div>

      {/* รายการงาน */}
      <div className="space-y-2 mb-6">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-xl border ${
              todo.completed ? 'bg-teal-50 border-teal-200' : 'bg-white border-blue-200'
            } shadow-sm`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
            />
            <span className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : 'text-blue-800'
            }`}>
              {todo.text} ({todo.category})
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>

      {/* แสดงข้อมูล State */}
      <div className="bg-blue-50 p-4 rounded-xl shadow-sm">
        <p className="text-sm font-medium text-blue-800">
          <strong>Array State:</strong> todos.length = {todos.length}
        </p>
        <p className="text-sm font-medium text-blue-800">
          <strong>Filter:</strong> filterCategory = "{filterCategory}"
        </p>
        <p className="text-sm font-medium text-blue-800">
          <strong>Current Category:</strong> category = "{category}"
        </p>
        <p className="text-xs text-blue-600 mt-1">
          เพิ่ม → [...todos, newItem] | ลบ → filter() | แก้ไข → map() | กรอง → filter()
        </p>
      </div>
    </div>
  );
}

export default TodoList;