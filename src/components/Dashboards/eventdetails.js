import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = ({ user, events, activeTab, setActiveTab, searchTerm, setSearchTerm }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div>Événement introuvable</div>;
  }

  return (
    <div className="dashboard">
      {/* Header et Sidebar restent identiques */}
      <header className="dashboard-header">
        <div className="logo">Get<span>UrTicket</span></div>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        
        <div className="header-icons">
          <button className="icon-button">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>
          <button className="icon-button">
            <i className="fas fa-heart"></i>
          </button>
          <button className="icon-button">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-badge">2</span>
          </button>
          <div className="user-profile">
            <img src={user.photo} alt={user.name} />
            <span>{user.name}</span>
          </div>
        </div>
      </header>
      <aside className="sidebar">
        <nav>
          <button 
            className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <i className="fas fa-home"></i>
            <span>Accueil</span>
          </button>
          <button 
            className={`nav-button ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            <i className="fas fa-compass"></i>
            <span>Explorer</span>
          </button>
          <button 
            className={`nav-button ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fas fa-calendar-check"></i>
            <span>Mes Réservations</span>
          </button>
          <button 
            className={`nav-button ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <i className="fas fa-heart"></i>
            <span>Favoris</span>
          </button>
          <button 
            className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            <span>Mon Profil</span>
          </button>
        </nav>
        
        <div className="help-section">
          <button className="help-button">
            <i className="fas fa-question-circle"></i>
            <span>Aide & Support</span>
          </button>
        </div>
      </aside>

      {/* Contenu des détails */}
      <main className="main-content">
        <div className="event-details">
          <h1>{event.title}</h1>
          <img src={event.image} alt={event.title} />
          <p><strong>Date :</strong> {event.date}</p>
          <p><strong>Lieu :</strong> {event.location}</p>
          <p><strong>Description :</strong> {event.description || 'Pas de description disponible'}</p>
          <p><strong>Organisateur :</strong> {event.organizer || 'Non spécifié'}</p>
          <p><strong>Capacité :</strong> {event.capacity}</p>
          <p><strong>Places restantes :</strong> {event.capacity - event.sold}</p>
          <p><strong>Catégorie :</strong> {event.category}</p>
          <p><strong>État :</strong> {event.liked ? 'Liké' : 'Non liké'}</p>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;