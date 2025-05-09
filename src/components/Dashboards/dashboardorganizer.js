import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboardorganizer.css';

const DashboardOrganizer = () => {
  // États de base
  const [user, setUser] = useState({
    name: 'Jazz Productions',
    email: 'contact@jazzproductions.com',
    photo: 'https://i.pravatar.cc/150?img=1',
    phone: '+33 1 23 45 67 89',
    address: '15 Rue de la Musique',
    city: 'Paris',
    country: 'France',
    description: 'Organisateur de festivals de jazz de renommée internationale',
    socialLinks: {
      facebook: 'jazzproductions',
      twitter: 'jazzprod',
      instagram: 'jazzproductions'
    }
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Festival Jazz 2025',
      description: 'Un festival de jazz exceptionnel avec les meilleurs artistes internationaux.',
      date: '15 Mars 2025',
      location: 'Paris',
      image: '/images/jazz_festival.jpg',
      tickets: [
        {
          type: 'VIP',
          price: '150€',
          quantity: 50,
          sold: 10,
          benefits: ['Accès backstage', 'Meet & Greet', 'Place assise premium']
        },
        {
          type: 'Standard',
          price: '25€',
          quantity: 500,
          sold: 200,
          benefits: ['Accès général']
        }
      ],
      status: 'upcoming',
      totalRevenue: 7500,
      ratings: 4.8,
      numberOfRatings: 45,
      cancellationPolicy: {
        fullRefund: 48, // heures avant l'événement
        partialRefund: 24, // heures avant l'événement
        refundPercentage: 50 // pourcentage pour remboursement partiel
      }
    }
  ]);

  const [participants, setParticipants] = useState([
    {
      id: 1,
      eventId: 1,
      name: 'John Doe',
      email: 'john@example.com',
      ticketType: 'VIP',
      purchaseDate: '2024-01-15',
      status: 'confirmed',
      attended: false
    }
  ]);

  const [statistics, setStatistics] = useState({
    totalRevenue: 25000,
    totalTicketsSold: 750,
    averageRating: 4.5,
    upcomingEvents: 3,
    pastEvents: 12
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    tickets: [
      {
        type: 'Standard',
        price: '',
        quantity: 0,
        benefits: ['Accès général']
      }
    ]
  });

  // États pour les filtres et la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all'
  });

  // État pour les notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      message: 'Nouvelle réservation pour Festival Jazz 2025',
      date: new Date(),
      read: false
    }
  ]);

  // État pour les messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      participantId: 1,
      participantName: 'John Doe',
      eventId: 1,
      eventTitle: 'Festival Jazz 2025',
      messages: [
        {
          id: 1,
          sender: 'participant',
          text: 'Bonjour, y a-t-il un parking à proximité ?',
          timestamp: new Date('2024-01-15T10:30:00')
        }
      ],
      unread: true
    }
  ]);

  // État pour les rapports
  const [reports, setReports] = useState({
    daily: {
      sales: [],
      visitors: [],
      revenue: []
    },
    monthly: {
      sales: [],
      visitors: [],
      revenue: []
    }
  });

  // Fonction pour calculer les statistiques
  const calculateStatistics = () => {
    // Logique de calcul des statistiques
  };

  // Fonction pour gérer la création d'un nouvel événement
  const handleCreateEvent = () => {
    // Logique de création d'événement
  };

  // Fonction pour gérer les modifications d'un événement
  const handleUpdateEvent = (eventId, updatedData) => {
    // Logique de mise à jour d'événement
  };

  // Fonction pour gérer les annulations et remboursements
  const handleCancellation = (participantId, eventId) => {
    // Logique d'annulation et remboursement
  };

  // Fonction pour envoyer des notifications aux participants
  const sendNotificationToParticipants = (eventId, message) => {
    // Logique d'envoi de notification
  };

  // Fonction pour générer des rapports
  const generateReport = (type, dateRange) => {
    // Logique de génération de rapport
  };

  // useEffect pour le chargement initial des données
  useEffect(() => {
    calculateStatistics();
  }, [events, participants]);

return (
  <div className="dashboard">
    {/* Header */}
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
        <button 
          className="icon-button"
          onClick={() => setActiveTab('notifications')}
        >
          <i className="fas fa-bell"></i>
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="notification-badge">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </button>
        <button 
          className="icon-button"
          onClick={() => setActiveTab('messages')}
        >
          <i className="fas fa-envelope"></i>
          {messages.filter(m => m.unread).length > 0 && (
            <span className="notification-badge">
              {messages.filter(m => m.unread).length}
            </span>
          )}
        </button>
        <div className="user-profile">
          <img src={user.photo} alt={user.name} />
          <span>{user.name}</span>
        </div>
      </div>
    </header>

    {/* Sidebar */}
    <aside className="sidebar">
      <nav>
        <button 
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <i className="fas fa-chart-line"></i>
          <span>Tableau de bord</span>
        </button>
        <button 
          className={`nav-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <i className="fas fa-calendar-alt"></i>
          <span>Mes Événements</span>
        </button>
        <button 
          className={`nav-button ${activeTab === 'participants' ? 'active' : ''}`}
          onClick={() => setActiveTab('participants')}
        >
          <i className="fas fa-users"></i>
          <span>Participants</span>
        </button>
        <button 
          className={`nav-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <i className="fas fa-chart-bar"></i>
          <span>Analyses</span>
        </button>
        <button 
          className={`nav-button ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <i className="fas fa-envelope"></i>
          <span>Messages</span>
        </button>
        <button 
          className={`nav-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i>
          <span>Paramètres</span>
        </button>
      </nav>

      <div className="create-event">
        <button 
          className="create-event-button"
          onClick={() => setShowEventModal(true)}
        >
          <i className="fas fa-plus"></i>
          Créer un événement
        </button>
      </div>
    </aside>

    {/* Main Content */}
    <main className="main-content">
      {activeTab === 'dashboard' && (
  <div className="dashboard-content">
    {/* Stats Overview */}
    <div className="stats-overview">
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-ticket-alt"></i>
        </div>
        <div className="stat-info">
          <h3>Billets Vendus</h3>
          <p className="stat-value">{statistics.totalTicketsSold}</p>
          <span className="stat-change positive">+12% ce mois</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-euro-sign"></i>
        </div>
        <div className="stat-info">
          <h3>Revenus Totaux</h3>
          <p className="stat-value">{statistics.totalRevenue}€</p>
          <span className="stat-change positive">+8% ce mois</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-calendar-check"></i>
        </div>
        <div className="stat-info">
          <h3>Événements à venir</h3>
          <p className="stat-value">{statistics.upcomingEvents}</p>
          <span className="stat-change neutral">Stable</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-star"></i>
        </div>
        <div className="stat-info">
          <h3>Note Moyenne</h3>
          <p className="stat-value">{statistics.averageRating}/5</p>
          <span className="stat-change positive">+0.2 ce mois</span>
        </div>
      </div>
    </div>

    {/* Recent Activity and Upcoming Events */}
    <div className="dashboard-grid">
      <div className="dashboard-card upcoming-events">
        <div className="card-header">
          <h2>Événements à venir</h2>
          <button className="view-all-button" onClick={() => setActiveTab('events')}>
            Voir tout
          </button>
        </div>
        <div className="event-list">
          {events
            .filter(event => new Date(event.date) > new Date())
            .slice(0, 3)
            .map(event => (
              <div key={event.id} className="event-item">
                <img src={event.image} alt={event.title} />
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <p><i className="fas fa-calendar-alt"></i> {event.date}</p>
                  <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                  <div className="event-stats">
                    <span>
                      <i className="fas fa-ticket-alt"></i>
                      {event.tickets.reduce((acc, ticket) => acc + (ticket.quantity - ticket.sold), 0)} places restantes
                    </span>
                    <span>
                      <i className="fas fa-euro-sign"></i>
                      {event.totalRevenue}€ générés
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="dashboard-card recent-activity">
        <div className="card-header">
          <h2>Activité Récente</h2>
          <div className="activity-filters">
            <button className="active">Tout</button>
            <button>Ventes</button>
            <button>Messages</button>
          </div>
        </div>
        <div className="activity-list">
          {/* Exemple d'activités */}
          <div className="activity-item">
            <div className="activity-icon sale">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="activity-details">
              <p>Nouvelle vente - Festival Jazz 2025</p>
              <span className="activity-time">Il y a 5 minutes</span>
            </div>
            <span className="activity-amount">+150€</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon message">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="activity-details">
              <p>Nouveau message de John Doe</p>
              <span className="activity-time">Il y a 15 minutes</span>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon review">
              <i className="fas fa-star"></i>
            </div>
            <div className="activity-details">
              <p>Nouvel avis - 5 étoiles</p>
              <span className="activity-time">Il y a 1 heure</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="quick-actions">
      <button onClick={() => setShowEventModal(true)}>
        <i className="fas fa-plus"></i>
        Créer un événement
      </button>
      <button onClick={() => setActiveTab('messages')}>
        <i className="fas fa-envelope"></i>
        Messages
      </button>
      <button onClick={() => setActiveTab('analytics')}>
        <i className="fas fa-chart-bar"></i>
        Voir les analyses
      </button>
    </div>
  </div>
)}

{activeTab === 'events' && (
  <div className="events-section">
    <div className="section-header">
      <h2>Mes Événements</h2>
      <div className="header-actions">
        <div className="filters">
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">Tous les statuts</option>
            <option value="upcoming">À venir</option>
            <option value="ongoing">En cours</option>
            <option value="past">Passés</option>
          </select>
          <select 
            value={filters.dateRange} 
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
          >
            <option value="all">Toutes les dates</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
        </div>
        <button 
          className="create-button"
          onClick={() => setShowEventModal(true)}
        >
          <i className="fas fa-plus"></i>
          Créer un événement
        </button>
      </div>
    </div>

    <div className="events-grid">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <div className="event-image">
            <img src={event.image} alt={event.title} />
            <div className="event-status">
              {event.status === 'upcoming' && <span className="status upcoming">À venir</span>}
              {event.status === 'ongoing' && <span className="status ongoing">En cours</span>}
              {event.status === 'past' && <span className="status past">Terminé</span>}
            </div>
          </div>
          
          <div className="event-details">
            <h3>{event.title}</h3>
            <div className="event-info">
              <p><i className="fas fa-calendar-alt"></i> {event.date}</p>
              <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>
            </div>
            
            <div className="ticket-info">
              {event.tickets.map((ticket, index) => (
                <div key={index} className="ticket-type">
                  <div className="ticket-header">
                    <span>{ticket.type}</span>
                    <span>{ticket.price}</span>
                  </div>
                  <div className="ticket-progress">
                    <div 
                      className="progress-bar" 
                      style={{width: `${(ticket.sold/ticket.quantity)*100}%`}}
                    ></div>
                    <span className="progress-text">
                      {ticket.sold}/{ticket.quantity} vendus
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="event-stats">
              <div className="stat">
                <i className="fas fa-euro-sign"></i>
                <span>{event.totalRevenue}€</span>
              </div>
              <div className="stat">
                <i className="fas fa-star"></i>
                <span>{event.ratings} ({event.numberOfRatings})</span>
              </div>
            </div>

            <div className="event-actions">
              <button className="edit-button">
                <i className="fas fa-edit"></i>
                Modifier
              </button>
              <button className="manage-button">
                <i className="fas fa-cog"></i>
                Gérer
              </button>
              <button className="more-button">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Modal de création/modification d'événement */}
{showEventModal && (
  <div className="modal-overlay">
    <div className="modal-content event-modal">
      <div className="modal-header">
        <h2>{newEvent.id ? 'Modifier l\'événement' : 'Créer un événement'}</h2>
        <button 
          className="close-button"
          onClick={() => setShowEventModal(false)}
        >
          &times;
        </button>
      </div>

      <div className="modal-body">
        <div className="form-group">
          <label>Titre de l'événement</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            placeholder="Ex: Festival de Jazz 2025"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            placeholder="Décrivez votre événement..."
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Lieu</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              placeholder="Ex: Paris"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Image de l'événement</label>
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewEvent({...newEvent, image: reader.result});
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {newEvent.image && (
              <img src={newEvent.image} alt="Preview" className="image-preview" />
            )}
          </div>
        </div>

        <div className="tickets-section">
          <h3>Types de billets</h3>
          {newEvent.tickets.map((ticket, index) => (
            <div key={index} className="ticket-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <input
                    type="text"
                    value={ticket.type}
                    onChange={(e) => {
                      const updatedTickets = [...newEvent.tickets];
                      updatedTickets[index].type = e.target.value;
                      setNewEvent({...newEvent, tickets: updatedTickets});
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Prix</label>
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) => {
                      const updatedTickets = [...newEvent.tickets];
                      updatedTickets[index].price = e.target.value;
                      setNewEvent({...newEvent, tickets: updatedTickets});
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Quantité</label>
                  <input
                    type="number"
                    value={ticket.quantity}
                    onChange={(e) => {
                      const updatedTickets = [...newEvent.tickets];
                      updatedTickets[index].quantity = parseInt(e.target.value);
                      setNewEvent({...newEvent, tickets: updatedTickets});
                    }}
                  />
                </div>
              </div>
              <button
                className="remove-ticket"
                onClick={() => {
                  const updatedTickets = newEvent.tickets.filter((_, i) => i !== index);
                  setNewEvent({...newEvent, tickets: updatedTickets});
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
          <button
            className="add-ticket"
            onClick={() => {
              setNewEvent({
                ...newEvent,
                tickets: [
                  ...newEvent.tickets,
                  { type: '', price: '', quantity: 0, benefits: [] }
                ]
              });
            }}
          >
            <i className="fas fa-plus"></i>
            Ajouter un type de billet
          </button>
        </div>
      </div>

      <div className="modal-footer">
        <button
          className="secondary-button"
          onClick={() => setShowEventModal(false)}
        >
          Annuler
        </button>
        <button
          className="primary-button"
          onClick={handleCreateEvent}
        >
          {newEvent.id ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </div>
  </div>
)}

{activeTab === 'participants' && (
  <div className="participants-section">
    <div className="section-header">
      <h2>Gestion des Participants</h2>
      <div className="header-actions">
        <div className="search-participants">
          <input
            type="text"
            placeholder="Rechercher un participant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          <select 
            value={filters.event} 
            onChange={(e) => setFilters({...filters, event: e.target.value})}
          >
            <option value="all">Tous les événements</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">Tous les statuts</option>
            <option value="confirmed">Confirmé</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
      </div>
    </div>

    <div className="participants-table-container">
      <table className="participants-table">
        <thead>
          <tr>
            <th>Participant</th>
            <th>Événement</th>
            <th>Type de billet</th>
            <th>Date d'achat</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(participant => {
            const event = events.find(e => e.id === participant.eventId);
            return (
              <tr key={participant.id}>
                <td className="participant-info">
                  <div className="participant-name">
                    <span>{participant.name}</span>
                    <span className="participant-email">{participant.email}</span>
                  </div>
                </td>
                <td>{event?.title}</td>
                <td>{participant.ticketType}</td>
                <td>{new Date(participant.purchaseDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${participant.status}`}>
                    {participant.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-button" title="Envoyer un message">
                    <i className="fas fa-envelope"></i>
                  </button>
                  <button className="action-button" title="Voir les détails">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="action-button" title="Plus d'options">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="pagination">
      <button className="pagination-button" disabled>
        <i className="fas fa-chevron-left"></i>
      </button>
      <span className="pagination-info">Page 1 sur 1</span>
      <button className="pagination-button" disabled>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
)}

{activeTab === 'analytics' && (
  <div className="analytics-section">
    <div className="section-header">
      <h2>Analyses et Statistiques</h2>
      <div className="date-range-picker">
        <button className="active">7 jours</button>
        <button>30 jours</button>
        <button>3 mois</button>
        <button>1 an</button>
        <button>Personnalisé</button>
      </div>
    </div>

    {/* Overview Cards */}
    <div className="analytics-overview">
      <div className="analytics-card">
        <div className="analytics-card-header">
          <h3>Revenus totaux</h3>
          <select defaultValue="all">
            <option value="all">Tous les événements</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>
        <div className="analytics-card-content">
          <div className="main-stat">
            <span className="value">25,750€</span>
            <span className="change positive">+12.5%</span>
          </div>
          <div className="chart-container">
            {/* Ici vous intégreriez votre graphique */}
            <div className="placeholder-chart">Graphique des revenus</div>
          </div>
        </div>
      </div>

      <div className="analytics-card">
        <div className="analytics-card-header">
          <h3>Billets vendus</h3>
          <select defaultValue="all">
            <option value="all">Tous les types</option>
            <option value="vip">VIP</option>
            <option value="standard">Standard</option>
          </select>
        </div>
        <div className="analytics-card-content">
          <div className="main-stat">
            <span className="value">1,234</span>
            <span className="change positive">+8.3%</span>
          </div>
          <div className="chart-container">
            <div className="placeholder-chart">Graphique des ventes</div>
          </div>
        </div>
      </div>

      <div className="analytics-card">
        <div className="analytics-card-header">
          <h3>Taux de remplissage</h3>
        </div>
        <div className="analytics-card-content">
          <div className="main-stat">
            <span className="value">78%</span>
            <span className="change positive">+5.2%</span>
          </div>
          <div className="chart-container">
            <div className="placeholder-chart">Graphique de remplissage</div>
          </div>
        </div>
      </div>

      <div className="analytics-card">
        <div className="analytics-card-header">
          <h3>Satisfaction client</h3>
        </div>
        <div className="analytics-card-content">
          <div className="main-stat">
            <span className="value">4.8/5</span>
            <span className="change positive">+0.3</span>
          </div>
          <div className="chart-container">
            <div className="placeholder-chart">Graphique de satisfaction</div>
          </div>
        </div>
      </div>
    </div>

    {/* Detailed Analytics */}
    <div className="detailed-analytics">
      <div className="analytics-card full-width">
        <div className="analytics-card-header">
          <h3>Performance des événements</h3>
          <div className="card-actions">
            <button className="export-button">
              <i className="fas fa-download"></i>
              Exporter
            </button>
          </div>
        </div>
        <div className="analytics-table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Événement</th>
                <th>Billets vendus</th>
                <th>Revenus</th>
                <th>Taux de remplissage</th>
                <th>Note moyenne</th>
                <th>Tendance</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>
                    {event.tickets.reduce((acc, ticket) => acc + ticket.sold, 0)}
                    <span className="small-text">/{event.tickets.reduce((acc, ticket) => acc + ticket.quantity, 0)}</span>
                  </td>
                  <td>{event.totalRevenue}€</td>
                  <td>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{
                          width: `${(event.tickets.reduce((acc, ticket) => acc + ticket.sold, 0) / 
                            event.tickets.reduce((acc, ticket) => acc + ticket.quantity, 0)) * 100}%`
                        }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <span>{event.ratings}</span>
                    </div>
                  </td>
                  <td>
                    <span className="trend positive">
                      <i className="fas fa-arrow-up"></i>
                      12%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3>Répartition des ventes</h3>
          </div>
          <div className="chart-container">
            <div className="placeholder-chart">Graphique circulaire</div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3>Sources des ventes</h3>
          </div>
          <div className="chart-container">
            <div className="placeholder-chart">Graphique en barres</div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3>Démographie</h3>
          </div>
          <div className="chart-container">
            <div className="placeholder-chart">Graphique démographique</div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <h3>Avis et commentaires</h3>
          </div>
          <div className="reviews-list">
            {[1, 2, 3].map(i => (
              <div key={i} className="review-item">
                <div className="review-header">
                  <div className="rating">
                    {Array(5).fill(0).map((_, index) => (
                      <i key={index} className={`fas fa-star ${index < 4 ? 'filled' : ''}`}></i>
                    ))}
                  </div>
                  <span className="review-date">Il y a 2 jours</span>
                </div>
                <p className="review-text">
                  "Excellent événement, très bien organisé !"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </main>
  </div>
);
};

export default DashboardOrganizer;