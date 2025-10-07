import React, { useState, useEffect } from 'react';
import './index.css';

// ชื่อ Key สำหรับใช้ใน Local Storage
const LOCAL_STORAGE_KEY = 'movieWishlistApp.movies';

function App() {
  // State 1: เก็บรายชื่อหนังทั้งหมด เป็น Array ของ Object
  const [movies, setMovies] = useState([]);
  
  // State 2: เก็บค่าจากช่อง input สำหรับเพิ่มหนังใหม่
  const [inputValue, setInputValue] = useState('');

  // useEffect 1: โหลดข้อมูลจาก Local Storage ตอนเปิดแอปครั้งแรก
  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedMovies) {
      setMovies(storedMovies);
    }
  }, []);

  // useEffect 2: บันทึกข้อมูลลง Local Storage ทุกครั้งที่ `movies` state เปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  // Function: จัดการเมื่อกดปุ่ม Add
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newMovie = {
      id: Date.now(),
      text: inputValue,
      watched: false,
    };

    setMovies(prevMovies => [newMovie, ...prevMovies]);
    setInputValue('');
  };

  // Function: จัดการเมื่อกดปุ่มลบ
  const handleDeleteMovie = (id) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  };

  // Function: จัดการสลับสถานะ watched
  const handleToggleWatched = (id) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎬 Movie Wishlist</h1>
        <p>What do you want to watch next?</p>
      </header>

      <main>
        <form className="add-movie-form" onSubmit={handleAddMovie}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., The Matrix"
          />
          <button type="submit">เพิ่ม</button>
        </form>

        <section className="movie-wishlist">
          <h2>My List</h2>
          {movies.length > 0 ? (
            <ul className="movie-list">
              {movies.map(movie => (
                <li
                  key={movie.id}
                  className={`movie-item ${movie.watched ? 'watched' : ''}`}
                >
                  <span
                    onClick={() => handleToggleWatched(movie.id)}
                    style={{ cursor: 'pointer', flexGrow: 1, marginRight: '10px' }}
                  >
                    {movie.text}
                  </span>
                  <button onClick={() => handleDeleteMovie(movie.id)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-list-message">รายการของคุณว่างเปล่า เริ่มต้นด้วยการเพิ่มหนัง!</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;