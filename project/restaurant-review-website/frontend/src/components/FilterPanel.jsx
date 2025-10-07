function FilterPanel({ onFilterChange, filters }) {
  const categories = [
    'ทั้งหมด', 
    'อาหารไทย', 
    'อาหารญี่ปุ่น', 
    'อาหารอิตาเลียน', 
    'อาหารจีน', 
    'ฟาสต์ฟู้ด'
  ];

  const handleCategoryChange = (category) => {
    onFilterChange({ 
      category: category === 'ทั้งหมด' ? '' : category 
    });
  };

  // เพิ่มฟังก์ชัน handleRatingChange
  const handleRatingChange = (minRating) => {
    onFilterChange({ minRating: minRating || '' });
  };

  // เพิ่มฟังก์ชัน handlePriceChange
  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange: priceRange || '' });
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>หมวดหมู่:</label>
        <select 
          value={filters.category || 'ทั้งหมด'}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>คะแนนขั้นต่ำ:</label>
        <select 
          value={filters.minRating || ''}
          onChange={(e) => handleRatingChange(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="5">5 ดาวขึ้นไป ⭐⭐⭐⭐⭐</option>
          <option value="4">4 ดาวขึ้นไป ⭐⭐⭐⭐</option>
          <option value="3">3 ดาวขึ้นไป ⭐⭐⭐</option>
          <option value="2">2 ดาวขึ้นไป ⭐⭐</option>
          <option value="1">1 ดาวขึ้นไป ⭐</option>
        </select>
      </div>

      <div className="filter-group">
        <label>ช่วงราคา:</label>
        <select 
          value={filters.priceRange || ''}
          onChange={(e) => handlePriceChange(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          <option value="1">฿ (ไม่เกิน 100)</option>
          <option value="2">฿฿ (100-300)</option>
          <option value="3">฿฿฿ (มากกว่า 300)</option>
        </select>
      </div>

      <div className="filter-group">
        <label>เรียงตามราคา:</label>
        <select
          id="sort-select"
          value={filters.sortOrder || ''}
          onChange={e => (typeof onSortChange === 'function' ? onSortChange(e.target.value) : onFilterChange({ sortOrder: e.target.value }))}
        >
          <option value="">ไม่มี</option>
          <option value="asc">น้อยไปมาก</option>
          <option value="desc">มากไปน้อย</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;