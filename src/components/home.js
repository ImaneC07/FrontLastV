import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header from "./header";
import Footer from "./footer";
import LoginPage from "./loginpage";
import "../App.css";
import "./home.css";
import eventsData from "../Data/events.json";

const EventWebsite = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilterButton, setShowFilterButton] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: 1000,
    dateFilter: 'all',
    location: '',
    freeOnly: false
  });
  const upcomingRef = useRef(null);

  useEffect(() => {
    setEvents(eventsData);
    setFilteredEvents(eventsData);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFilterButton(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (upcomingRef.current) {
      observer.observe(upcomingRef.current);
    }

    return () => {
      if (upcomingRef.current) {
        observer.unobserve(upcomingRef.current);
      }
    };
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };
  // Fonctions de gestion des filtres
  const toggleCategory = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const applyFilters = () => {
    const results = events.filter(event => {
      // Filtre par catégorie
      if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
        return false;
      }
      
      // Filtre par prix
      if (!event.free && event.price > filters.priceRange) return false;
      
      // Filtre "Gratuit seulement"
      if (filters.freeOnly && !event.free) return false;
      
      // Filtre par lieu
      if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Filtre par date (implémentation basique)
      // Vous pouvez ajouter une logique plus complexe ici
      
      return true;
    });
    
    setFilteredEvents(results);
    setIsFilterOpen(false);
    setPage(1); // Reset à la première page après filtrage
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: 1000,
      dateFilter: 'all',
      location: '',
      freeOnly: false
    });
    setFilteredEvents(events);
  };

  const carouselImages = [
    { src: "/images/promo1.webp", alt: "Promo 1" },
    { src: "/images/promo2.webp", alt: "Promo 2" },
    { src: "/images/promo3.webp", alt: "Promo 3" },
    { src: "/images/promo4.webp", alt: "Promo 4" },
    { src: "/images/promo5.webp", alt: "Promo 5" },
  ];

  // Catégories uniques pour les filtres
  const uniqueCategories = [...new Set(events.map(event => event.category))];

  return (
    <div className="event-website">
      <Header onLoginClick={() => setShowLogin(true)} />

      {/* Carousel Section */}
      <div className="carousel-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img.src} alt={img.alt} className="carousel-image" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <h2 className="section-title">Browse by Categories</h2>
        <div className="categories-grid">
          {[
            { name: "Music", icon: "🎵", img: "music_event.webp" },
            { name: "Cultural Arts", icon: "🎭", img: "cultural_art.webp" },
            { name: "Sports", icon: "⚽", img: "sport&fitness.webp" },
            { name: "Food", icon: "🍔", img: "food&drinks.webp" },
            { name: "Technology", icon: "💻", img: "technology.jpeg" },
          ].map((cat, index) => (
            <div key={index} className="category-card">
              <img src={`/images/${cat.img}`} alt={cat.name} className="category-image" />
              <h3 className="category-name">{cat.icon} {cat.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div ref={upcomingRef} className="upcoming-events-section">
        <h2 className="section-title">Upcoming Events</h2>

        {/* Bouton Filtres */}
        {showFilterButton && (
          <button
            className="filter-button"
            onClick={() => setIsFilterOpen(true)}
            style={{
              position: "fixed",
              top: "80px",
              left: "20px",
              zIndex: 1000,
            }}
          >
            🛠️ Filtres
          </button>
        )}

        {/* Sidebar Filtres */}
        {isFilterOpen && (
          <div className="filter-overlay">
            <div className="filter-container">
              <div className="filter-header">
              <h2>Filtrer les événements</h2>
              <button onClick={() => setIsFilterOpen(false)} className="close-btn"> &times; </button>
            </div>

            <div className="filter-groups">
                {/* Filtre Catégories */}
                <div className="filter-group">
                  <h3>Catégories</h3>
                  <div className="category-tags">
                    {uniqueCategories.map(category => (
                      <button 
                        key={category}
                        className={`tag ${filters.categories.includes(category) ? 'active' : ''}`}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtre Prix */}
                <div className="filter-group">
                  <h3>Prix maximum (MAD)</h3>
                  <div className="price-range">
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    />
                    <div className="price-values">
                      <span>0</span>
                      <span>{filters.priceRange}</span>
                      <span>1000+</span>
                    </div>
                  </div>
                  <label className="free-only">
                    <input 
                      type="checkbox" 
                      checked={filters.freeOnly}
                      onChange={(e) => setFilters({...filters, freeOnly: e.target.checked})}
                    />
                    Événements gratuits seulement
                  </label>
                </div>

                {/* Filtre Lieu */}
                <div className="filter-group">
                  <h3>Localisation</h3>
                  <input
                    type="text"
                    placeholder="Ville, lieu..."
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="filter-actions">
                <button onClick={resetFilters} className="reset-btn">
                  Réinitialiser
                </button>
                <button onClick={applyFilters} className="apply-btn">
                  Appliquer ({filteredEvents.length} résultats)
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="events-grid">
          {filteredEvents.slice((page - 1) * 10, page * 10).map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image-wrapper">
                <img src={event.image} alt={event.name} className="event-image" />
                <span
                  className="heart-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(event.id);
                  }}
                >
                  {favorites.includes(event.id) ? "❤️" : "🤍"}
                </span>
              </div>
              <div className="event-info">
                <h3 className="event-title">{event.name}</h3>
                <p className="organizer">{event.organizer}</p>
                <p className="date">{event.date} – {event.location}</p>
                <p className="price">{event.free ? "Free" : `${event.price} MAD`}</p>
                <button className="see-more-btn" onClick={() => setSelectedEvent(event)}>Voir plus</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>‹</button>
          <span>{page}</span>
          <button onClick={() => setPage(page + 1)} disabled={page * 10 >= events.length}>›</button>
        </div>

        {/* Popup Event Details */}
        {selectedEvent && (
          <div className="event-popup">
            <div className="popup-content">
              <span className="close" onClick={() => setSelectedEvent(null)}>×</span>
              <div className="popup-body">
                {/* Left side: carousel */}
                <div className="popup-carousel">
                  <img src={selectedEvent.image} alt={selectedEvent.name} className="popup-main-image" />
                </div>
                {/* Right side: details */}
                <div className="popup-details">
                  <h2>{selectedEvent.name}</h2>
                  <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
                  <p><strong>Date:</strong> {selectedEvent.date}</p>
                  <p><strong>Location:</strong> {selectedEvent.location}</p>
                  <p><strong>Category:</strong> {selectedEvent.category}</p>
                  <p><strong>Price:</strong> {selectedEvent.free ? "Free" : `${selectedEvent.price} MAD`}</p>
                  <p><strong>Capacity:</strong> {selectedEvent.capacity}</p>
                  <p><strong>Places restantes:</strong> {selectedEvent.remaining}</p>
                  <p><strong>Description:</strong> {selectedEvent.description}</p>
                  <button className="reserve-btn">Réserver</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && <LoginPage onClose={() => setShowLogin(false)} />}
        <Footer/>
    </div>
  );
};

export default EventWebsite;
