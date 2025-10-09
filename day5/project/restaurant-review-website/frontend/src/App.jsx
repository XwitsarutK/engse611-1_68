import { useState } from 'react';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import './App.css';

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSelectRestaurant = (id) => {
    setSelectedRestaurantId(id);
  };

  const handleBack = () => {
    setSelectedRestaurantId(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app${darkMode ? ' dark-mode' : ''}`}>
      <header className="app-header">
        <div style={{ position: 'relative' }}>
          <button
            className="mode-toggle-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle dark/light mode"
            style={{ position: 'absolute', top: 0, right: 0 }}
          >
            {darkMode ? '☀️ โหมดสว่าง' : '🌙 โหมดมืด'}
          </button>
          <div style={{ textAlign: 'center' }}>
            <h1>🍜 Restaurant Review</h1>
            <p>ค้นหาและรีวิวร้านอาหารโปรดของคุณ</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        {selectedRestaurantId ? (
          <RestaurantDetail 
            restaurantId={selectedRestaurantId}
            onBack={handleBack}
          />
        ) : (
          <RestaurantList 
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Restaurant Review App | สร้างด้วย React + Express</p>
      </footer>
    </div>
  );
}

export default App;