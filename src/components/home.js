import React, { useState } from "react";
import Header from "./header";
import LoginPage from "./loginpage";
import "../App.css";

const EventWebsite = () => {
  const [showLogin, setShowLogin] = useState(false);

  const categories = [
    { name: "Music", icon: "🎵", img: "music_event.webp" },
    { name: "Cultural Arts", icon: "🎭", img: "cultural_art.webp" },
    { name: "Sports", icon: "⚽", img: "sport&fitness.webp" },
    { name: "Food", icon: "🍔", img: "food&drinks.webp" },
    { name: "Technology", icon: "💻", img: "technology.jpeg" },
    { name: "Travel", icon: "✈️", img: "travel&adventure.webp" },
  ];

  return (
    <div className="event-website">
      <Header onLoginClick={() => setShowLogin(true)} />

      {/* Hero section */}
      <div className="hero-section">
        <h1 className="hero-title">Don't miss out!</h1>
        <p className="hero-subtitle">
          Explore the vibrant events happening locally and globally
        </p>

        {/* Barre de recherche */}
        <div className="search-container">
          <div className="search-bar">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Search for events..."
              className="search-input"
            />
            <div className="filter">Location</div>
            <div className="filter">Date</div>
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>

      {/* Catégories */}
      <div className="categories-section">
        <h2 className="section-title">Event Categories</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-image">
                <img src={`/images/${category.img}`} alt={category.name} />
              </div>
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Page de connexion */}
      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}

      <style>{`
        .event-website {
          width: 100%;
          min-height: 100vh;
          background-color: white;
          font-family: Arial, sans-serif;
        }

        .hero-section {
          width: 100%;
          height: 300px;
          background: linear-gradient(to right, #ffffff, #f0f0f0);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: bold;
          color :black;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #6a1b9a;
          margin-top: 10px;
          font-weight: bold;
        }

        .search-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          width: 100%;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: white;
          padding: 10px;
          border-radius: 30px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          width: 80%;
        }

        .search-icon {
          padding: 10px;
          background: #f0f0f0;
          border-radius: 50%;
          font-size: 1.2rem;
          margin-right: 10px;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px;
          font-size: 1rem;
        }

        .filter {
          background: #f0f0f0;
          padding: 8px 15px;
          border-radius: 20px;
          margin: 0 5px;
          cursor: pointer;
        }

        .search-button {
          background: black;
          color:  #ff9800;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        }

        .search-button:hover {
          background: #e68900;
        }

        .categories-section {
          text-align: center;
          padding: 40px 20px;
        }

        .section-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .categories-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .category-item {
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }

        .category-item:hover {
          transform: scale(1.1);
        }

        .category-image {
          width: 100px;
          height: 100px;
          overflow: hidden;
          border-radius: 50%;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
        }

        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }

        .category-item:hover .category-image img {
          transform: scale(1.1);
        }

        .category-name {
          font-size: 0.9rem;
          font-weight: bold;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default EventWebsite;
