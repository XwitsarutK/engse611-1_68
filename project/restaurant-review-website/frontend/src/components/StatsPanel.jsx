import { useEffect, useState } from 'react';
import { getStats } from '../services/api';

function StatsPanel() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getStats();
      if (result && result.success) {
        setStats(result.stats);
      } else {
        setError('ไม่สามารถโหลดสถิติได้');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโหลดสถิติ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">กำลังโหลดสถิติ...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return null;

  return (
    <div className="stats-panel">
      <h2>📊 สถิติร้านอาหาร</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalRestaurants}</div>
          <div>ร้านอาหารทั้งหมด</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.totalReviews}</div>
          <div>รีวิวทั้งหมด</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.averageRating?.toFixed(2) || '-'}</div>
          <div>คะแนนเฉลี่ย</div>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
