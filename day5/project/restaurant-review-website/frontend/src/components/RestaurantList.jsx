import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import { getRestaurants } from '../services/api';

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minRating: '',
    priceRange: '',
    sortOrder: ''
  });

  // 1. useEffect เพื่อ fetch ข้อมูลเมื่อ filters เปลี่ยน
  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 2. เรียก getRestaurants พร้อม filters
      const result = await getRestaurants(filters);
      
      // 3. ตั้งค่า state
      setRestaurants(result.data);
      
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 4. handleSearch
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  // 5. handleFilterChange
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Sort restaurants by price if sortOrder is set
  const sortedRestaurants = (() => {
    if (!filters.sortOrder) return restaurants;
    return [...restaurants].sort((a, b) => {
      if (filters.sortOrder === 'asc') {
        return (a.priceRange || 0) - (b.priceRange || 0);
      } else if (filters.sortOrder === 'desc') {
        return (b.priceRange || 0) - (a.priceRange || 0);
      }
      return 0;
    });
  })();

  // handle sort change
  const handleSortChange = (sortOrder) => {
    setFilters(prev => ({ ...prev, sortOrder }));
  };

  return (
    <div className="restaurant-list-container">
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} filters={filters} onSortChange={handleSortChange} />
      {loading && <div className="loading">กำลังโหลด...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <>
          {sortedRestaurants.length === 0 ? (
            <p className="no-results">ไม่พบร้านอาหารที่ค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะครับ</p>
          ) : (
            <div className="restaurant-grid">
              {sortedRestaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={onSelectRestaurant}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantList;