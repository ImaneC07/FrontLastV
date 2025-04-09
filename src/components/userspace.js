import { useState } from "react";
import { Search, PlusCircle, Heart, Ticket } from "lucide-react";

export default function EventbriteClone() {
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Inline CSS inside JSX */}
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: white;
          }

          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #6a1b9a;
          }

          .search-bar {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .search-bar input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            width: 250px;
            transition: all 0.3s ease-in-out;
          }

          .search-bar input:focus {
            border-color: #6a1b9a;
            box-shadow: 0 0 5px rgba(106, 27, 154, 0.5);
            outline: none;
          }

          .location {
            font-size: 14px;
            color: blue;
            cursor: pointer;
            transition: color 0.3s ease-in-out;
          }

          .location:hover {
            color: #6a1b9a;
            text-decoration: underline;
          }

          .nav-actions {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .btn {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            border: 1px solid black;
            border-radius: 6px;
            cursor: pointer;
            background: none;
            transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
          }

          .btn:hover {
            background-color: #6a1b9a;
            color: white;
          }

          .hero {
            display: flex;
            align-items: center;
            justify-content: center;
            background: url('/images/hero_image.webp') center/cover;
            height: 350px;
            position: relative;
            color: white;
            text-align: center;
          }

          .hero-content {
            background: rgba(0, 0, 0, 0.5);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            transition: transform 0.3s ease-in-out;
          }

          .hero-content:hover {
            transform: scale(1.05);
          }

          .categories {
            display: flex;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            flex-wrap: wrap;
          }

          .category {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            color: #444;
            transition: transform 0.3s ease-in-out;
          }

          .category:hover {
            transform: scale(1.1);
          }

          .icon-container {
            width: 50px;
            height: 50px;
            background: #e0e0e0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
            transition: background 0.3s ease-in-out;
          }

          .category:hover .icon-container {
            background: #6a1b9a;
            color: white;
          }

          .category span {
            margin-top: 5px;
            font-size: 14px;
          }

          /* Event Cards Section */
          .event-cards-section {
            padding: 20px;
            background-color: #f7f7f7;
          }

          .event-cards-section h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          .event-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .event-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s ease-in-out;
            display: flex; /* Add flex display to align content */
            flex-direction: column; /* Stack content vertically */
          }

          .event-card:hover {
            transform: translateY(-5px);
          }

          .event-card img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover; /* Ensure image fills the container without distortion */
            max-height: 150px; /* Set a maximum height for the image */
          }

          .event-info {
            padding: 15px;
            /* Remove background color if you want the image to be visible */
            /* background-color: rgba(255, 255, 255, 0.8); */
          }

          .event-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
          }

          .event-details {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
          }

          .event-price {
            font-size: 16px;
            font-weight: bold;
            color: #6a1b9a;
          }
        `}
      </style>

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">geturticket</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="icon" color="#6a1b9a" />
          <span className="location">Souss - Massa - Draâ</span>
        </div>
        <div className="nav-actions">
          <button className="btn">
            <PlusCircle className="icon" size={18} />
            <span style={{ marginLeft: "8px" }}>Add to List</span>
          </button>
          <Heart className="icon" color="red" size={20} />
          <Ticket className="icon" color="green" size={20} />
          <div className="email">oumaimabimesmaran2003@gmail.com</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>SPRING PLANS FOR YOU</h1>
        </div>
      </section>

      {/* Categories */}
      <div className="categories">
        {[
          { name: "All", icon: "🌐" },
          { name: "For you", icon: "⭐" },
          { name: "Online", icon: "💻" },
          { name: "Today", icon: "📅" },
          { name: "This weekend", icon: "🗓️" },
          { name: "Earth Day", icon: "🌍" },
          { name: "Free", icon: "🆓" },
          { name: "Music", icon: "🎵" },
          { name: "Food & Drink", icon: "🍔" },
          { name: "Charity & Causes", icon: "❤️" },
        ].map((category) => (
          <div key={category.name} className="category">
            <div className="icon-container">{category.icon}</div>
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      {/* Event Cards Section */}
      <section className="event-cards-section">
        <h2>Our top picks for you</h2>
        <div className="event-cards">
          <div className="event-card">
            <img src="/images/Information_Technology_Certification_Pathways.webp" alt="Event 1" />
            <div className="event-info">
              <h3 className="event-title">Information Technology Certification Pathways</h3>
              <p className="event-details">Thu, Apr 17 - 11:00 PM GMT+1</p>
              <p className="event-details">Free</p>
              <p className="event-details">University of IbnZohr</p>
              <p className="event-details">2756 followers</p>
            </div>
          </div>

          <div className="event-card">
            <img src="/images/Fotoworkshop_Master_Class_Marokko.webp" alt="Event 2" />
            <div className="event-info">
              <h3 className="event-title">Fotoworkshop Master Class Marokko: Abenteuer pur im ...</h3>
              <p className="event-details">Sun, Nov 16 - 4:00 PM</p>
              <p className="event-details">Flughafen Marrakech - Menara</p>
              <p className="event-price">From 3699 DH</p>
              <p className="event-details">Calumet Photo Video - Stuttgart</p>
              <p className="event-details">203 followers</p>
            </div>
          </div>

          <div className="event-card">
            <img src="/images/Get_Paid_to_Talk.webp" alt="Event 3" />
            <div className="event-info">
              <h3 className="event-title">Get Paid to Talk - Intro to Voice Overs- Live Online Workshop</h3>
              <p className="event-details">Wed, Apr 9 - 11:30 PM GMT+1</p>
              <p className="event-price">From 150 DH</p>
              <p className="event-details">Voice Coaches CVDG</p>
              <p className="event-details">2539 followers</p>
            </div>
          </div>

          <div className="event-card">
            <img src="/images/dj_set.webp" alt="Event 4" />
            <div className="event-info">
              <h3 className="event-title">DJ Set nel Deserto di Marrakech con Daniele Baldelli del Cosmic</h3>
              <p className="event-details">Sat, May 17 - 5:00 PM</p>
              <p className="event-details">Yes we campa , Agalley Desert Camp</p>
              <p className="event-price">From 650 DH</p>
              <p className="event-details">Alfredo Miti</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}