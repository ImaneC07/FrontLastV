
import React, { useState } from 'react';
import './EventModeration.css';

const EventModeration = () => {
  // États pour les événements
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Festival Jazz 2025",
      organizer: {
        id: 101,
        name: "Jazz Productions",
        email: "contact@jazzproductions.com"
      },
      date: "2025-03-15",
      location: "Paris",
      category: "Musique",
      image: "/images/jazz_festival.jpg",
      description: "Un festival de jazz exceptionnel avec les meilleurs artistes internationaux.",
      tickets: [
        {
          type: "VIP",
          price: "150€",
          quantity: 100
        },
        {
          type: "Standard",
          price: "50€",
          quantity: 500
        }
      ],
      status: "pending",
      submissionDate: "2024-03-10",
      modificationReason: null
    },
    // ... autres événements
  ]);

  // États pour les filtres et la recherche
  const [filters, setFilters] = useState({
    status: 'pending',
    organizer: 'all',
    category: 'all',
    sortBy: 'date'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // États pour les modals
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showModificationModal, setShowModificationModal] = useState(false);
  const [modifiedEvent, setModifiedEvent] = useState(null);

  // Filtrer et trier les événements
  const filteredEvents = events
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'all' || event.status === filters.status;
      const matchesOrganizer = filters.organizer === 'all' || event.organizer.id.toString() === filters.organizer;
      const matchesCategory = filters.category === 'all' || event.category === filters.category;
      
      return matchesSearch && matchesStatus && matchesOrganizer && matchesCategory;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(b.submissionDate) - new Date(a.submissionDate);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Gérer l'approbation d'un événement
  const handleApprove = (eventId) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, status: 'approved' }
        : event
    ));
    // Simuler l'envoi d'une notification
    console.log(`Notification envoyée à l'organisateur pour l'événement ${eventId}`);
  };

  // Gérer le rejet d'un événement
  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Veuillez fournir une raison de rejet');
      return;
    }

    setEvents(events.map(event =>
      event.id === selectedEvent?.id
        ? { ...event, status: 'rejected', rejectionReason }
        : event
    ));

    // Simuler l'envoi d'une notification
    console.log(`Notification de rejet envoyée à l'organisateur pour l'événement ${selectedEvent?.id}`);
    
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedEvent(null);
  };

  // Gérer la modification d'un événement
  const handleModification = () => {
    if (!modifiedEvent) return;

    setEvents(events.map(event =>
      event.id === modifiedEvent.id
        ? { ...modifiedEvent, status: 'pending' }
        : event
    ));

    setShowModificationModal(false);
    setModifiedEvent(null);
  };

  return (
    <div className="event-moderation">
      <div className="section-header">
        <h2>Modération des Événements</h2>
        <div className="header-actions">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters">
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvés</option>
              <option value="rejected">Rejetés</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">Toutes les catégories</option>
              <option value="Musique">Musique</option>
              <option value="Art">Art</option>
              <option value="Sport">Sport</option>
            </select>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
            >
              <option value="date">Trier par date</option>
              <option value="title">Trier par titre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="events-table-container">
        <table className="events-table">
          <thead>
            <tr>
              <th>Événement</th>
              <th>Organisateur</th>
              <th>Date</th>
              <th>Lieu</th>
              <th>Statut</th>
              <th>Soumis le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(event => (
              <tr key={event.id}>
                <td className="event-info">
                  <img src={event.image} alt={event.title} className="event-thumbnail" />
                  <div>
                    <span 
                      className="event-title clickable"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowDetailsModal(true);
                      }}
                    >
                      {event.title}
                    </span>
                    <span className="event-category">{event.category}</span>
                  </div>
                </td>
                <td className="organizer-info">
                  <span className="org-name">{event.organizer.name}</span>
                  <span className="organizer-email">{event.organizer.email}</span>
                </td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>
                  <span className={`status-badge ${event.status}`}>
                    {event.status}
                  </span>
                </td>
                <td>{new Date(event.submissionDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    className="action-button"
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowDetailsModal(true);
                    }}
                    title="Voir les détails"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowPreviewModal(true);
                    }}
                    title="Prévisualiser"
                  >
                    <i className="fas fa-desktop"></i>
                  </button>
                  {event.status === 'pending' && (
                    <>
                      <button
                        className="action-button approve"
                        onClick={() => handleApprove(event.id)}
                        title="Approuver"
                      >
                        <i className="fas fa-check"></i>
                      </button>
                      <button
                        className="action-button reject"
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowRejectModal(true);
                        }}
                        title="Rejeter"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </>
                  )}
                  <button
                    className="action-button"
                    onClick={() => {
                      setModifiedEvent({...event});
                      setShowModificationModal(true);
                    }}
                    title="Modifier"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Les modals seront ajoutés dans la suite */}
    </div>
  );
};
export default EventModeration;