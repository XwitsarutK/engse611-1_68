import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [viewCount, setViewCount] = useState(0);
    const [favoriteHobbies, setFavoriteHobbies] = useState([]);
    const [showContactForm, setShowContactForm] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleCardClick = () => {
        setViewCount(prev => prev + 1);
    };

    const toggleFavoriteHobby = (hobby) => {
        setFavoriteHobbies(prev =>
            prev.includes(hobby)
                ? prev.filter(h => h !== hobby)
                : [...prev, hobby]
        );
    };

    const handleContactClick = () => {
        setShowContactForm(true);
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    const cardClassName = `profile-card ${isDarkMode ? 'dark-mode' : ''}`;

    return (
        <div className={cardClassName} onClick={handleCardClick}>
            <div className="view-counter">👁️ Views: {viewCount}</div>

            <div className="profile-header">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDarkMode ? '🌙' : '☀️'}
                </button>

                <div className="profile-avatar">
                    {getInitials(profile.name)}
                </div>
                <h1 className="profile-name">{profile.name}</h1>
                <div className="student-id">{profile.studentId}</div>
            </div>

            <div className="profile-info">
                <div className="info-item">
                    <div className="info-label">สาขา</div>
                    <div className="info-value">{profile.major}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">ชั้นปี</div>
                    <div className="info-value">{profile.year}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">อายุ</div>
                    <div className="info-value">{profile.age} ปี</div>
                </div>
                <div className="info-item">
                    <div className="info-label">เกรด</div>
                    <div className="info-value">
                        {profile.gpa.toFixed(2)}
                        {profile.gpa >= 3.5 && ' 🌟'}
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h3>🏆 Achievements</h3>
                <div className="achievements">
                    {profile.gpa >= 3.5 && (
                        <span className="achievement-badge">🌟 เกียรตินิยม</span>
                    )}
                    {profile.skills.length >= 5 && (
                        <span className="achievement-badge">💪 Multi-skilled</span>
                    )}
                    {profile.hobbies.length >= 5 && (
                        <span className="achievement-badge">🎨 Creative Mind</span>
                    )}
                </div>
            </div>

            <div className="profile-section">
                <h3>🎯 งานอดิเรก</h3>
                <ul className="hobbies-list">
                    {profile.hobbies.map((hobby, index) => (
                        <li 
                            key={index} 
                            className={`hobby-item ${favoriteHobbies.includes(hobby) ? 'favorite' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavoriteHobby(hobby);
                            }}
                        >
                            {hobby} {favoriteHobbies.includes(hobby) && '💖'}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="profile-section">
                <h3>💻 ทักษะ</h3>
                <div className="skills">
                    {profile.skills.map((skill, index) => (
                        <div
                            key={index}
                            className="skill-tag"
                            onClick={() => alert(`${profile.name} มีความเชี่ยวชาญใน ${skill}!`)}
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {profile.socialLinks && profile.socialLinks.length > 0 && (
                <div className="profile-section">
                    <h3>🌐 Social Media</h3>
                    <div className="social-links">
                        <ul>
                            {profile.socialLinks.map((data, index) => (
                                <li key={index}>
                                    <a
                                        href={data.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                    >
                                        {data.platform}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <button className="contact-button" onClick={(e) => {
                e.stopPropagation();
                handleContactClick();
            }}>
                📧 ติดต่อ {profile.name}
            </button>

            {showContactForm && (
                <div className="contact-form">
                    <h3>📨 ส่งข้อความถึง {profile.name}</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        alert('ส่งข้อความเรียบร้อยแล้ว!');
                        setShowContactForm(false);
                    }}>
                        <input type="text" placeholder="ชื่อของคุณ" required />
                        <input type="email" placeholder="อีเมลของคุณ" required />
                        <textarea placeholder="ข้อความ..." required></textarea>
                        <button type="submit">ส่งข้อความ</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ProfileCard;
