import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Statistics from './Statistics';
import Messages from './Messages';
import Finance from './Finance';
import ProfileOrga from './ProfileOrga';
import './dashboardorganizer.css';


// Données simulées (remplacez par vos vraies données)
const events = [
  { id: 1, title: 'Concert de Rock', date: '2025-05-15', rawDate: '2025-05-15', tickets: [
    { type: 'VIP', price: 100, quantity: 150, sold: 100, cancelled: 5 },
    { type: 'Standard', price: 50, quantity: 500, sold: 400, cancelled: 10 }
  ], ratings: 4.5, totalRevenue: 30000, expenses: 15000 },
  // Ajoutez d'autres événements
];

const participants = [
  { id: 1, eventId: 1, name: 'John Doe', email: 'john@example.com', ticketType: 'VIP', purchaseDate: '2025-05-01T10:30:00', status: 'confirmed', attended: true },
  // Ajoutez d'autres participants
];

// Fonctions utilitaires (inchangées)
export const isThisWeek = (date) => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() + 6));
  return date >= startOfWeek && date <= endOfWeek;
};

export const isThisMonth = (date) => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && 
         date.getFullYear() === now.getFullYear();
};

export const isThisQuarter = (date) => {
  const now = new Date();
  const currentQuarter = Math.floor(now.getMonth() / 3) + 1;
  const eventQuarter = Math.floor(date.getMonth() / 3) + 1;
  return eventQuarter === currentQuarter && 
         date.getFullYear() === now.getFullYear();
};

export const isThisYear = (date) => {
  return date.getFullYear() === new Date().getFullYear();
};

const DashboardOrganizer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  // États (inchangés sauf pour la clarification)
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
      date: '15 Mai 2025',
      rawDate: '2025-05-15',
      startTime: '18:00',
      duration: '4 heures',
      location: 'Paris',
      image: '/images/music_event.webp',
      expenses: 2000,
      tickets: [
        {
          type: 'VIP',
          price: '150€',
          quantity: 50,
          sold: 10,
          cancelled: 2,
          benefits: ['Accès backstage', 'Meet & Greet', 'Place assise premium']
        },
        {
          type: 'Standard',
          price: '25€',
          quantity: 500,
          sold: 200,
          cancelled: 5,
          benefits: ['Accès général']
        }
      ],
      status: 'confirmed',
      totalRevenue: 7500,
      ratings: 4.8,
      numberOfRatings: 45,
      cancellationPolicy: {
        fullRefund: 48,
        partialRefund: 24,
        refundPercentage: 50
      },
      modificationReason: ''
    },
    {
      id: 2,
      title: 'Festival d été',
      description: 'Un festival d ete exceptionnel avec les meilleurs artistes internationaux.',
      date: '15 Mai 2025',
      rawDate: '2025-07-15',
      startTime: '18:00',
      duration: '4 heures',
      location: 'Paris',
      image: '/images/music_event.webp',
      expenses: 3000,
      tickets: [
        {
          type: 'VIP',
          price: '150€',
          quantity: 60,
          sold: 30,
          cancelled: 1,
          benefits: ['Accès backstage', 'Meet & Greet', 'Place assise premium']
        },
        {
          type: 'Standard',
          price: '25€',
          quantity: 300,
          sold: 150,
          cancelled: 3,
          benefits: ['Accès général']
        }
      ],
      status: 'confirmed',
      totalRevenue: 8000,
      ratings: 4.8,
      numberOfRatings: 45,
      cancellationPolicy: {
        fullRefund: 48,
        partialRefund: 24,
        refundPercentage: 50
      },
      modificationReason: ''
    }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'sale',
      message: 'Nouvelle vente - Festival Jazz 2025',
      amount: 150,
      timestamp: new Date(Date.now() - 5*60000),
    },
    {
      id: 2,
      type: 'message',
      message: 'Nouveau message de John Doe',
      timestamp: new Date(Date.now() - 15*60000),
    },
    {
      id: 3,
      type: 'review',
      message: 'Nouvel avis - 5 étoiles',
      timestamp: new Date(Date.now() - 60*60000),
    }
  ]);

  const [participants, setParticipants] = useState([
    {
      id: 1,
      eventId: 1,
      name: 'John Doe',
      email: 'john@example.com',
      ticketType: 'VIP',
      purchaseDate: '2024-01-15T10:30:00',
      status: 'confirmed',
      attended: false,
      avatar: "https://via.placeholder.com/40?text=JD"
    },
    {
      id: 2,
      eventId: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      ticketType: 'Standard',
      purchaseDate: '2024-01-16T14:45:00',
      status: 'confirmed',
      attended: false,
      avatar: "https://via.placeholder.com/40?text=MC"
    },
    {
      id: 3,
      eventId: 1,
      name: 'Alice Brown',
      email: 'alice@example.com',
      ticketType: 'Standard',
      purchaseDate: '2024-01-17T09:15:00',
      status: 'pending',
      attended: false,
      avatar: "https://via.placeholder.com/40?text=LM"
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modificationReason, setModificationReason] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: '',
    description: '',
    date: '',
    startTime: '',
    duration: '',
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

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
     period: 'month', // week, month, year, custom
    dateRange: 'all',
    customStartDate: null,
    customEndDate: null,
    event: 'all'
  });
 

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      message: 'Nouvelle réservation pour Festival Jazz 2025',
      date: new Date(),
      read: false
    }
  ]);

 const [messages, setMessages] = useState([
    {
      conversationId: 1,
      participantId: 1,
      content: "Bonjour, puis-je avoir plus d'infos sur le concert ?",
      timestamp: "2025-05-10T10:00:00Z",
      isRead: false,
      sender: 'participant',
    },
    {
      conversationId: 1,
      participantId: 1,
      content: "Bien sûr ! Le concert aura lieu à 20h, avec un accès VIP à 19h.",
      timestamp: "2025-05-10T10:05:00Z",
      isRead: true,
      sender: 'organizer',
    },
    {
      conversationId: 2,
      participantId: 2,
      content: "Est-ce qu'il reste des billets Standard ?",
      timestamp: "2025-05-11T09:00:00Z",
      isRead: false,
      sender: 'participant',
    },
  ]);

  // Gérer l'envoi d'un message
  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  // Marquer une conversation comme lue
  const handleMarkAsRead = (conversationId) => {
    setMessages(messages.map(msg => 
      msg.conversationId === conversationId ? { ...msg, isRead: true } : msg
    ));
  };

  // Supprimer une conversation
  const handleDeleteConversation = (conversationId) => {
    setMessages(messages.filter(msg => msg.conversationId !== conversationId));
  };

  const [reports, setReports] = useState({
    daily: { sales: [], visitors: [], revenue: [] },
    monthly: { sales: [], visitors: [], revenue: [] }
  });

  // Nouveaux états pour la gestion des participants
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showParticipantDetails, setShowParticipantDetails] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(null);
  const [showGroupMessageModal, setShowGroupMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const participantsPerPage = 10;

  // Fonction pour formater la date en français (inchangée)
  const formatFrenchDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = date.getDate();
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                       'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  // Fonction pour convertir une date française en objet Date (inchangée)
  const frenchToDate = (dateInput) => {
    if (dateInput instanceof Date) return dateInput;
    
    if (typeof dateInput === 'string' && dateInput.match(/\d{1,2} \w+ \d{4}/)) {
      const [day, month, year] = dateInput.split(' ');
      const monthMap = {
        'Janvier': '01', 'Février': '02', 'Mars': '03', 'Avril': '04',
        'Mai': '05', 'Juin': '06', 'Juillet': '07', 'Août': '08',
        'Septembre': '09', 'Octobre': '10', 'Novembre': '11', 'Décembre': '12'
      };
      return new Date(`${year}-${monthMap[month]}-${day.padStart(2, '0')}`);
    }
    
    if (typeof dateInput === 'string') {
      return new Date(dateInput);
    }
    
    return new Date();
  };

  // Filtre des événements (inchangé)
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (filters.status !== 'all' && event.status !== filters.status) {
        return false;
      }
      const eventDate = frenchToDate(event.date);
      const now = new Date();
      switch (filters.dateRange) {
        case 'week':
          if (!isThisWeek(eventDate)) return false;
          break;
        case 'month':
          if (!isThisMonth(eventDate)) return false;
          break;
        case 'quarter':
          if (!isThisQuarter(eventDate)) return false;
          break;
        case 'year':
          if (!isThisYear(eventDate)) return false;
          break;
        case 'custom':
          if (filters.customStartDate && filters.customEndDate) {
            const start = new Date(filters.customStartDate);
            const end = new Date(filters.customEndDate);
            if (eventDate < start || eventDate > end) return false;
          }
          break;
        case 'past':
          if (eventDate > now) return false;
          break;
        case 'upcoming':
          if (eventDate < now) return false;
          break;
        default:
          break;
      }
      return true;
    });
  }, [events, filters]);

  // Filtre des participants
  const filteredParticipants = useMemo(() => {
    return participants.filter(p => {
      if (filters.event !== 'all' && p.eventId.toString() !== filters.event) return false;
      if (filters.status !== 'all' && p.status !== filters.status) return false;
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return p.name.toLowerCase().includes(search) || p.email.toLowerCase().includes(search);
      }
      return true;
    });
  }, [participants, filters, searchTerm]);


  // Pagination
   const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fonction pour exporter la liste des participants en CSV
  const exportParticipantsToCSV = () => {
    const selectedEventId = filters.event;
    const participantsToExport = selectedEventId === 'all' 
      ? participants 
      : participants.filter(p => p.eventId.toString() === selectedEventId);

    const headers = ['ID', 'Nom', 'E-mail', 'Événement', 'Type de billet', 'Date d\'achat', 'Statut'];
    const rows = participantsToExport.map(p => {
      const event = events.find(e => e.id === p.eventId);
      return [
        p.id,
        p.name,
        p.email,
        event?.title || 'N/A',
        p.ticketType,
        new Date(p.purchaseDate).toLocaleString('fr-FR'),
        p.status
      ].map(value => `"${value}"`).join(',');
    });

    const csvContent = [
      headers.join(','),
      ...rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const eventTitle = selectedEventId === 'all' 
      ? 'tous_les_participants' 
      : events.find(e => e.id.toString() === selectedEventId)?.title.replace(/\s+/g, '_') || 'participants';
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `participants_${eventTitle}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction pour envoyer un message individuel (simulé)
  const sendMessageToParticipant = (participantId) => {
    if (!messageContent.trim()) {
      alert('Veuillez entrer un message.');
      return;
    }
    // Simuler l'envoi du message
    alert(`Message envoyé au participant ${participantId}: "${messageContent}"`);
    setMessages([...messages, {
      id: messages.length + 1,
      participantId,
      participantName: participants.find(p => p.id === participantId)?.name,
      eventId: participants.find(p => p.id === participantId)?.eventId,
      eventTitle: events.find(e => e.id === participants.find(p => p.id === participantId)?.eventId)?.title,
      messages: [{
        id: 1,
        sender: 'organizer',
        text: messageContent,
        timestamp: new Date()
      }],
      unread: false
    }]);
    setMessageContent('');
    setShowMessageModal(null);
  };

  // Fonction pour envoyer un message groupé (simulé)
  const sendGroupMessage = () => {
    if (!messageContent.trim()) {
      alert('Veuillez entrer un message.');
      return;
    }
    const selectedEventId = filters.event;
    if (selectedEventId === 'all') {
      alert('Veuillez sélectionner un événement spécifique pour envoyer un message groupé.');
      return;
    }
    // Simuler l'envoi du message à tous les participants de l'événement
    alert(`Message envoyé à tous les participants de l'événement ${events.find(e => e.id.toString() === selectedEventId)?.title}: "${messageContent}"`);
    setMessageContent('');
    setShowGroupMessageModal(false);
  };

  // Fonction pour calculer les statistiques (placeholder inchangé)
 const calculateStatistics = (events = [], participants = []) => {
     const totalRevenue = Array.isArray(events) ? events.reduce((sum, event) => sum + (event.totalRevenue || 0), 0) : 0;
     const totalTicketsSold = Array.isArray(events) ? events.reduce((sum, event) => 
       sum + (event.tickets || []).reduce((acc, ticket) => acc + (ticket.sold || 0), 0), 0) : 0;
     const vipTicketsSold = Array.isArray(events) ? events.reduce((sum, event) => 
       sum + (event.tickets || []).filter(t => t.type === 'VIP').reduce((acc, t) => acc + (t.sold || 0), 0), 0) : 0;
     const standardTicketsSold = Array.isArray(events) ? events.reduce((sum, event) => 
       sum + (event.tickets || []).filter(t => t.type === 'Standard').reduce((acc, t) => acc + (t.sold || 0), 0), 0) : 0;
     const totalCancellations = Array.isArray(events) ? events.reduce((sum, event) => 
       sum + (event.tickets || []).reduce((acc, ticket) => acc + (ticket.cancelled || 0), 0), 0) : 0;
     const averageRating = Array.isArray(events) && events.length > 0 
       ? events.reduce((sum, event) => sum + (event.ratings || 0), 0) / events.length 
       : 0;
     const totalExpenses = Array.isArray(events) ? events.reduce((sum, event) => sum + (event.expenses || 0), 0) : 0;
     const totalProfit = totalRevenue - totalExpenses;

     return {
       totalRevenue,
       totalTicketsSold,
       vipTicketsSold,
       standardTicketsSold,
       totalCancellations,
       averageRating: averageRating.toFixed(1),
       totalExpenses,
       totalProfit,
     };
   };
  

  // Fonction pour gérer la modification d'un événement (inchangée)
  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find(e => e.id === eventId);
    if (eventToEdit.status === 'past') {
      alert('Les événements passés ne peuvent pas être modifiés.');
      return;
    }
    if (eventToEdit) {
      setNewEvent({
        id: eventToEdit.id,
        title: eventToEdit.title,
        description: eventToEdit.description,
        date: eventToEdit.rawDate || eventToEdit.date,
        startTime: eventToEdit.startTime || '',
        duration: eventToEdit.duration || '',
        location: eventToEdit.location,
        image: eventToEdit.image,
        tickets: eventToEdit.tickets.map(ticket => ({
          ...ticket,
          price: parseFloat(ticket.price.replace('€', '')),
          benefits: ticket.benefits
        })),
        totalRevenue: eventToEdit.totalRevenue,
        ratings: eventToEdit.ratings,
        numberOfRatings: eventToEdit.numberOfRatings,
        cancellationPolicy: eventToEdit.cancellationPolicy
      });
      setSelectedEvent(eventToEdit);
      setShowEventModal(true);
    }
  };

  // Fonction pour afficher les détails d'un événement (inchangée)
  const handleShowDetails = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setShowDetailsModal(true);
    }
  };

  // Gestion de la touche Échap pour fermer le modal des détails (inchangée)
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDetailsModal(false);
      setSelectedEvent(null);
    }
  };

  // Fonction pour gérer la confirmation avant sauvegarde
  const handleConfirmSave = () => {
    if (selectedEvent && selectedEvent.status === 'confirmed' && !modificationReason.trim()) {
      alert('Please provide a reason for modifying a confirmed event.');
      return;
    }
    handleSaveEvent(newEvent.status || 'pending');
    setShowConfirmModal(false);
    setModificationReason('');
  };

  // Fonction pour gérer la sauvegarde d'un événement
  const handleSaveEvent = (status) => {
    // Validation des champs obligatoires
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      alert('Veuillez remplir tous les champs obligatoires (Titre, Date, Lieu)');
      return;
    }

    // Validation des billets
    const hasInvalidTickets = newEvent.tickets.some(ticket => 
      !ticket.type || !ticket.price || isNaN(ticket.quantity) || ticket.quantity <= 0
    );
    
    if (hasInvalidTickets) {
      alert('Veuillez configurer correctement tous les types de billets');
      return;
    }

    const eventToSave = {
      ...newEvent,
      id: newEvent.id || (events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1),
      status: status,
      date: formatFrenchDate(newEvent.date),
      rawDate: newEvent.date,
      startTime: newEvent.startTime || '18:00',
      duration: newEvent.duration || '4 heures',
      tickets: newEvent.tickets.map(ticket => ({
        ...ticket,
        price: `${parseFloat(ticket.price).toFixed(2)}€`,
        sold: ticket.sold || 0,
        benefits: Array.isArray(ticket.benefits) ? ticket.benefits : [ticket.benefits]
      })),
      totalRevenue: newEvent.totalRevenue || 0,
      ratings: newEvent.ratings || 0,
      numberOfRatings: newEvent.numberOfRatings || 0,
      cancellationPolicy: newEvent.cancellationPolicy || {
        fullRefund: 48,
        partialRefund: 24,
        refundPercentage: 50
      },
      modificationReason: newEvent.id && modificationReason ? modificationReason : ''
    };

    if (newEvent.id) {
      // Mise à jour d'un événement existant
      setEvents(events.map(e => e.id === newEvent.id ? eventToSave : e));
      alert('Événement modifié avec succès !');
    } else {
      // Création d'un nouvel événement
      setEvents([...events, eventToSave]);
      alert(status === 'draft' 
        ? 'Événement enregistré comme brouillon avec succès !'
        : 'Événement soumis pour approbation administrative');
    }

    // Réinitialise le formulaire
    setNewEvent({
      id: null,
      title: '',
      description: '',
      date: '',
      startTime: '',
      duration: '',
      location: '',
      image: '',
      tickets: [{
        type: 'Standard',
        price: '',
        quantity: 0,
        benefits: ['Accès général']
      }]
    });
    
    setShowEventModal(false);
  };

  // Fonction pour gérer les participants d'un événement (inchangée)
  const handleManageEvent = (eventId) => {
    setFilters({ ...filters, event: eventId.toString() });
    setActiveTab('participants');
  };

  // Autres fonctions inchangées
  const handleCancellation = (participantId, eventId) => {
    // Logique d'annulation et remboursement (placeholder)
    alert(`Annulation de la réservation pour le participant ${participantId} de l'événement ${eventId}`);
  };

  const sendNotificationToParticipants = (eventId, message) => {
    // Logique d'envoi de notification
  };

  const generateReport = (type, dateRange) => {
    // Logique de génération de rapport
  };

  useEffect(() => {
    calculateStatistics();
  }, [events, participants]);

  return (
    <div className="dashboard">
      {/* Header (inchangé) */}
      <header className="dashboard-header">  
        <div className="logo">Get<span>UrTicket</span></div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for an event..."
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

      {/* Sidebar (inchangée) */}
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
            <span>My Events</span>
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
            className={`nav-button ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
          >
            <i className="fas fa-chart-bar"></i>
            <span>Finance</span>
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
            <span>My Profile</span>
          </button>
        </nav>
        <div className="create-event">
          <button 
            className="create-event-button"
            onClick={() => setShowEventModal(true)}
          >
            <i className="fas fa-plus"></i>
            Create an event
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="stats-overview">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-ticket-alt"></i>
                </div>
                <div className="stat-info">
                  <h3>Sold Tickets</h3>
                  <p className="stat-value">{statistics.totalTicketsSold}</p>
                  <span className="stat-change positive">+12% ce mois</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-euro-sign"></i>
                </div>
                <div className="stat-info">
                  <h3>Total Income</h3>
                  <p className="stat-value">{statistics.totalRevenue}€</p>
                  <span className="stat-change positive">+8% ce mois</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-info">
                  <h3>Upcoming Events</h3>
                  <p className="stat-value">{statistics.upcomingEvents}</p>
                  <span className="stat-change neutral">Stable</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="stat-info">
                  <h3>Average rating</h3>
                  <p className="stat-value">{statistics.averageRating}/5</p>
                  <span className="stat-change positive">+0.2 this month</span>
                </div>
              </div>
            </div>
            <div className="dashboard-grid">
              <div className="dashboard-card upcoming-events">
                <div className="card-header">
                  <h2>Upcoming events</h2>
                  <button className="view-all-button" onClick={() => setActiveTab('events')}>
                    View all
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
                              {event.totalRevenue}MAD generated
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="dashboard-card recent-activity">
                <div className="card-header">
                  <h2>Recent activity</h2>
                  <div className="activity-filters">
                    <button className={activityFilter === 'all' ? 'active' : ''} onClick={() => setActivityFilter('all')}>
                      All
                    </button>
                    <button className={activityFilter === 'sales' ? 'active' : ''} onClick={() => setActivityFilter('sales')}>
                      Sales
                    </button>
                    <button className={activityFilter === 'messages' ? 'active' : ''} onClick={() => setActivityFilter('messages')}>
                      Messages
                    </button>
                  </div>
                </div>
                <div className="activity-list">
                  {activities
                    .filter(activity => 
                      activityFilter === 'all' || 
                      (activityFilter === 'sales' && activity.type === 'sale') ||
                      (activityFilter === 'messages' && activity.type === 'message')
                    )
                    .map(activity => (
                      <div key={activity.id} className={`activity-item ${activity.type}`}>
                        <div className={`activity-icon ${activity.type}`}>
                          <i className={
                            activity.type === 'sale' ? 'fas fa-shopping-cart' :
                            activity.type === 'message' ? 'fas fa-envelope' : 'fas fa-star'
                          }></i>
                        </div>
                        <div className="activity-details">
                          <p>{activity.message}</p>
                          <span className="activity-time">
                            Il y a {Math.floor((new Date() - activity.timestamp) / 60000)} minutes
                          </span>
                        </div>
                        {activity.type === 'sale' && (
                          <span className="activity-amount">+{activity.amount}€</span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="quick-actions">
              <button onClick={() => setShowEventModal(true)}>
                <i className="fas fa-plus"></i>
                Create an event
              </button>
              <button onClick={() => setActiveTab('messages')}>
                <i className="fas fa-envelope"></i>
                Messages
              </button>
              <button onClick={() => setActiveTab('analytics')}>
                <i className="fas fa-chart-bar"></i>
                View analyses
              </button>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-section">
            <div className="section-header">
              <h2>My Events</h2>
              <div className="header-actions">
                <div className="filters">
                  <select 
                    value={filters.status} 
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All status</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="past">Past</option>
                  </select>
                  <select 
                    value={filters.dateRange} 
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  >
                    <option value="all">All dates</option>
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                    <option value="quarter">This quarter</option>
                    <option value="year">This year</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                    <option value="custom">Custom</option>
                  </select>
                  {filters.dateRange === 'custom' && (
                    <div className="custom-date-range">
                      <input
                        type="date"
                        value={filters.customStartDate || ''}
                        onChange={(e) => setFilters({...filters, customStartDate: e.target.value})}
                      />
                      <span>to</span>
                      <input
                        type="date"
                        value={filters.customEndDate || ''}
                        onChange={(e) => setFilters({...filters, customEndDate: e.target.value})}
                      />
                    </div>
                  )}
                </div>
                <button 
                  className="create-button"
                  onClick={() => setShowEventModal(true)}
                >
                  <i className="fas fa-plus"></i>
                  Create an event
                </button>
              </div>
            </div>

            <div className="events-grid">
              {filteredEvents.map(event => (
                <div className="event-card" key={event.id}>
                  <div className="event-image-container">
                    <img src={event.image} alt={event.title} className="event-image" />
                    <div className={`event-status-badge ${event.status}`}>
                      {event.status === 'draft' && 'Brouillon'}
                      {event.status === 'pending' && 'En attente'}
                      {event.status === 'confirmed' && 'Confirmé'}
                      {event.status === 'past' && 'Passé'}
                    </div>
                    <div className="event-date-ribbon">
                      {formatFrenchDate(event.date)}
                    </div>
                  </div>
                  <div className="event-content">
                    <h3 
                      className="event-title clickable" 
                      onClick={() => handleShowDetails(event.id)}
                      title="Cliquez pour voir les détails"
                    >
                      {event.title}
                    </h3>
                    <div className="event-meta">
                      <span className="event-location">
                        <i className="fas fa-map-marker-alt"></i> {event.location}
                      </span>
                    </div>
                    <div className="event-stats">
                      <div className="stat-item">
                        <i className="fas fa-ticket-alt"></i>
                        <span>{event.tickets.reduce((a, t) => a + t.sold, 0)}/{event.tickets.reduce((a, t) => a + t.quantity, 0)} billets</span>
                      </div>
                      <div className="stat-item">
                        <i className="fas fa-euro-sign"></i>
                        <span>{event.totalRevenue}€</span>
                      </div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar" style={{
                        width: `${(event.tickets.reduce((a, t) => a + t.sold, 0) / 
                               event.tickets.reduce((a, t) => a + t.quantity, 0)) * 100}%`
                      }}></div>
                    </div>
                    <div className="event-actions">
                      <button 
                        className={`action-btn details`}
                        onClick={() => handleShowDetails(event.id)}
                      >
                        <i className="fas fa-eye"></i> Details
                      </button>
                      <button 
                        className={`action-btn edit ${event.status === 'past' ? 'disabled' : ''}`}
                        onClick={event.status !== 'past' ? () => handleEditEvent(event.id) : undefined}
                        disabled={event.status === 'past'}
                      >
                        <i className="fas fa-edit"></i> Modify
                      </button>
                      <button 
                        className="action-btn manage"
                        onClick={() => handleManageEvent(event.id)}
                      >
                        <i className="fas fa-cog"></i> Manage
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
                <button className="close-button" onClick={() => {
                  setShowEventModal(false);
                  setNewEvent({
                    id: null,
                    title: '',
                    description: '',
                    date: '',
                    startTime: '',
                    duration: '',
                    location: '',
                    image: '',
                    tickets: [{
                      type: 'Standard',
                      price: '',
                      quantity: 0,
                      benefits: ['General access']
                    }]
                  });
                }}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title*</label>
                    <input 
                      type="text" 
                      placeholder="Event title" 
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date*</label>
                    <input 
                      type="date" 
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Start time</label>
                    <input 
                      type="time" 
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Durée</label>
                    <input 
                      type="text" 
                      placeholder="Ex. : 4 heures"
                      value={newEvent.duration}
                      onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Lieu*</label>
                    <input 
                      type="text" 
                      placeholder="Adresse ou salle"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea 
                      rows="4" 
                      placeholder="Décrivez votre événement..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="form-group full-width">
                    <label>Image</label>
                    <div className="image-upload-container">
                      {!newEvent.image ? (
                        <div className="upload-placeholder">
                          <i className="fas fa-image"></i>
                          <p>Glissez-déposez une image ou cliquez pour parcourir</p>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setNewEvent({...newEvent, image: event.target.result});
                                };
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="image-preview-container">
                          <img src={newEvent.image} alt="Preview" />
                          <button 
                            className="replace-image"
                            onClick={() => setNewEvent({...newEvent, image: ''})}
                          >
                            <i className="fas fa-sync-alt"></i> Remplacer
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="tickets-section">
                  <h3>Billeterie</h3>
                  {newEvent.tickets.map((ticket, index) => (
                    <div key={index} className="ticket-form">
                      <div className="ticket-type">
                        <label>Type de billet*</label>
                        <select
                          value={ticket.type}
                          onChange={(e) => {
                            const updatedTickets = [...newEvent.tickets];
                            updatedTickets[index].type = e.target.value;
                            setNewEvent({...newEvent, tickets: updatedTickets});
                          }}
                        >
                          <option value="VIP">VIP</option>
                          <option value="Standard">Standard</option>
                          <option value="Étudiant">Étudiant</option>
                          <option value="Early Bird">Early Bird</option>
                        </select>
                      </div>
                      <div className="ticket-price">
                        <label>Prix (€)*</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={ticket.price}
                          onChange={(e) => {
                            const updatedTickets = [...newEvent.tickets];
                            updatedTickets[index].price = e.target.value;
                            setNewEvent({...newEvent, tickets: updatedTickets});
                          }}
                        />
                      </div>
                      <div className="ticket-quantity">
                        <label>Quantité disponible*</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={ticket.quantity}
                          onChange={(e) => {
                            const updatedTickets = [...newEvent.tickets];
                            updatedTickets[index].quantity = parseInt(e.target.value) || 0;
                            setNewEvent({...newEvent, tickets: updatedTickets});
                          }}
                        />
                      </div>
                      <div className="ticket-benefits">
                        <label>Avantages</label>
                        <input
                          type="text"
                          placeholder="Avantages séparés par des virgules"
                          value={ticket.benefits.join(', ')}
                          onChange={(e) => {
                            const updatedTickets = [...newEvent.tickets];
                            updatedTickets[index].benefits = e.target.value.split(',').map(b => b.trim());
                            setNewEvent({...newEvent, tickets: updatedTickets});
                          }}
                        />
                      </div>
                      {index > 0 && (
                        <button
                          className="remove-ticket"
                          onClick={() => {
                            const updatedTickets = [...newEvent.tickets];
                            updatedTickets.splice(index, 1);
                            setNewEvent({...newEvent, tickets: updatedTickets});
                          }}
                        >
                          <i className="fas fa-trash"></i> Supprimer
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    className="add-ticket-btn" 
                    onClick={() => {
                      setNewEvent({
                        ...newEvent,
                        tickets: [
                          ...newEvent.tickets,
                          {
                            type: 'Standard',
                            price: '',
                            quantity: 0,
                            benefits: ['Accès général']
                          }
                        ]
                      });
                    }}
                  >
                    <i className="fas fa-plus"></i> Ajouter un type de billet
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="secondary-btn" 
                  onClick={() => {
                    setShowEventModal(false);
                    setNewEvent({
                      id: null,
                      title: '',
                      description: '',
                      date: '',
                      startTime: '',
                      duration: '',
                      location: '',
                      image: '',
                      tickets: [{
                        type: 'Standard',
                        price: '',
                        quantity: 0,
                        benefits: ['Accès général']
                      }]
                    });
                  }}
                >
                  Annuler
                </button>
                <div className="action-buttons">
                  <button 
                    className="draft-btn"
                    onClick={() => {
                      // Pour un nouvel événement ou un événement non confirmé, sauvegarder directement
                      if (!newEvent.id || (selectedEvent && selectedEvent.status !== 'confirmed')) {
                        handleSaveEvent('draft');
                      } else {
                        // Pour un événement confirmé, ouvrir le modal de confirmation
                        setShowConfirmModal(true);
                        setNewEvent({ ...newEvent, status: 'draft' });
                      }
                    }}
                  >
                    <i className="fas fa-save"></i> Enregistrer comme brouillon
                  </button>
                  <button 
                    className="primary-btn"
                    onClick={() => {
                      // Pour un nouvel événement ou un événement non confirmé, sauvegarder directement
                      if (!newEvent.id || (selectedEvent && selectedEvent.status !== 'confirmed')) {
                        handleSaveEvent('pending');
                      } else {
                        // Pour un événement confirmé, ouvrir le modal de confirmation
                        setShowConfirmModal(true);
                        setNewEvent({ ...newEvent, status: 'pending' });
                      }
                    }}
                  >
                    <i className="fas fa-paper-plane"></i> Soumettre à l'admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmation avant sauvegarde */}
        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content confirm-modal">
              <div className="modal-header">
                <h2>Confirmer la modification</h2>
                <button 
                  className="close-button" 
                  onClick={() => {
                    setShowConfirmModal(false);
                    setModificationReason('');
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to change this confirmed event?</p>
                <div className="form-group">
                  <label>Raison de la modification*</label>
                  <textarea
                    rows="4"
                    placeholder="Veuillez expliquer pourquoi vous modifiez cet événement confirmé..."
                    value={modificationReason}
                    onChange={(e) => setModificationReason(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="secondary-btn" 
                  onClick={() => {
                    setShowConfirmModal(false);
                    setModificationReason('');
                  }}
                >
                  Annuler
                </button>
                <button 
                  className="primary-btn"
                  onClick={handleConfirmSave}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal pour afficher les détails de l'événement */}
        {showDetailsModal && selectedEvent && (
          <div 
            className="modal-overlay" 
            onKeyDown={handleKeyDown} 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="event-details-title"
          >
            <div className="modal-content event-details-modal">
              <div className="modal-header">
                <h2 id="event-details-title">{selectedEvent.title}</h2>
                <button 
                  className="close-button" 
                  onClick={() => setShowDetailsModal(false)}
                  aria-label="Fermer le modal"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="event-details-container">
                  <div className="event-details-image">
                    <img src={selectedEvent.image} alt={selectedEvent.title} />
                  </div>
                  <div className="event-details-content">
                    <div className="event-details-meta">
                      <p><strong>Date :</strong> {formatFrenchDate(selectedEvent.date)}</p>
                      {selectedEvent.startTime && (
                        <p><strong>Heure de début :</strong> {selectedEvent.startTime}</p>
                      )}
                      {selectedEvent.duration && (
                        <p><strong>Durée :</strong> {selectedEvent.duration}</p>
                      )}
                      <p><strong>Lieu :</strong> {selectedEvent.location}</p>
                    </div>
                    <div className="event-details-description">
                      <h3>Description</h3>
                      <p>{selectedEvent.description}</p>
                    </div>
                    <div className="event-details-tickets">
                      <h3>Billets</h3>
                      {selectedEvent.tickets.map((ticket, index) => (
                        <div key={index} className="ticket-detail">
                          <p><strong>{ticket.type}</strong> - {ticket.price}</p>
                          <p>Places disponibles : {ticket.quantity - ticket.sold}/{ticket.quantity}</p>
                          <p>Avantages :</p>
                          <ul>
                            {ticket.benefits.map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="secondary-btn" 
                  onClick={() => setShowDetailsModal(false)}
                >
                  Fermer
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
                    placeholder="Search for a participant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fas fa-search"></i>
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
                    <option value="all">All status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="action-buttons">
                  {filters.event !== 'all' && (
                    <button 
                      className="group-message-btn"
                      onClick={() => setShowGroupMessageModal(true)}
                    >
                      <i className="fas fa-envelope"></i> Message groupé
                    </button>
                  )}
                  <button 
                    className="export-btn"
                    onClick={exportParticipantsToCSV}
                  >
                    <i className="fas fa-download"></i> Export CSV
                  </button>
                </div>
              </div>
            </div>
            <div className="participants-table-container">
              <table className="participants-table">
                <thead>
                  <tr>
                    <th>Participant</th>
                    <th>E-mail</th>
                    <th>Événement</th>
                    <th>Type de billet</th>
                    <th>Date d'achat</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedParticipants.map(participant => {
                    const event = events.find(e => e.id === participant.eventId);
                    const purchaseDate = new Date(participant.purchaseDate);
                    return (
                      <tr key={participant.id}>
                        <td className="participant-info"data-label="Nom">
                          <span 
                            className="participant-name clickable"
                            onClick={() => setShowParticipantDetails(participant)}
                          >
                            {participant.name || 'N/A'}
                          </span>
                        </td>
                        <td className="participant-email" data-label="E-mail">
                          {participant.email || 'N/A'}
                          <button 
                            className="action-button email"
                            title="Envoyer un message"
                            onClick={() => setShowMessageModal(participant.id)}
                          >
                            <i className="fas fa-envelope"></i>
                          </button>
                        </td>
                        <td data-label="Événement">{event?.title || 'Événement inconnu'}</td>
                        <td data-label="Type de billet">{participant.ticketType || 'N/A'}</td>
                        <td data-label="Date d'achat">
                          {isNaN(purchaseDate.getTime()) 
                            ? 'Date invalide' 
                            : purchaseDate.toLocaleString('fr-FR')}
                        </td>
                         <td data-label="Statut">
                          <span className={`status-badge ${participant.status}`}>
                            {participant.status || 'N/A'}
                          </span>
                        </td>
                        <td className="actions" data-label="Actions">
                          <button 
                            className="action-button"
                            title="Voir les détails"
                            onClick={() => setShowParticipantDetails(participant)}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button 
                            className="action-button"
                            title="Annuler la réservation"
                            onClick={() => handleCancellation(participant.id, participant.eventId)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <span className="pagination-info">Page {currentPage} sur {totalPages}</span>
                <button 
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal pour les détails du participant */}
        {showParticipantDetails && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="participant-details-title">
            <div className="modal-content participant-details-modal">
              <div className="modal-header">
                <h2 id="participant-details-title">Détails du Participant</h2>
                <button 
                  className="close-button" 
                  onClick={() => setShowParticipantDetails(null)}
                  aria-label="Fermer le modal"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="participant-details-content">
                  <p><strong>Nom :</strong> {showParticipantDetails.name}</p>
                  <p><strong>E-mail :</strong> {showParticipantDetails.email}</p>
                  <p><strong>Événement :</strong> {events.find(e => e.id === showParticipantDetails.eventId)?.title || 'N/A'}</p>
                  <p><strong>Type de billet :</strong> {showParticipantDetails.ticketType}</p>
                  <p><strong>Date d'achat :</strong> {new Date(showParticipantDetails.purchaseDate).toLocaleString('fr-FR')}</p>
                  <p><strong>Statut :</strong> {showParticipantDetails.status}</p>
                  <p><strong>Présence :</strong> {showParticipantDetails.attended ? 'Présent' : 'Non présent'}</p>
                </div>
                <div className="participant-details-actions">
                  <button 
                    className="primary-btn"
                    onClick={() => setShowMessageModal(showParticipantDetails.id)}
                  >
                    <i className="fas fa-envelope"></i> Envoyer un message
                  </button>
                  <button 
                    className="secondary-btn"
                    onClick={() => handleCancellation(showParticipantDetails.id, showParticipantDetails.eventId)}
                  >
                    <i className="fas fa-times"></i> Annuler la réservation
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="secondary-btn" 
                  onClick={() => setShowParticipantDetails(null)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal pour envoyer un message individuel */}
        {showMessageModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="message-modal-title">
            <div className="modal-content message-modal">
              <div className="modal-header">
                <h2 id="message-modal-title">Envoyer un message</h2>
                <button 
                  className="close-button" 
                  onClick={() => {
                    setShowMessageModal(null);
                    setMessageContent('');
                  }}
                  aria-label="Fermer le modal"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>À : {participants.find(p => p.id === showMessageModal)?.name} ({participants.find(p => p.id === showMessageModal)?.email})</p>
                <div className="form-group">
                  <label>Message*</label>
                  <textarea
                    rows="4"
                    placeholder="Votre message..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="secondary-btn" 
                  onClick={() => {
                    setShowMessageModal(null);
                    setMessageContent('');
                  }}
                >
                  Annuler
                </button>
                <button 
                  className="primary-btn"
                  onClick={() => sendMessageToParticipant(showMessageModal)}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal pour envoyer un message groupé */}
        {showGroupMessageModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="group-message-modal-title">
            <div className="modal-content message-modal">
              <div className="modal-header">
                <h2 id="group-message-modal-title">Message à tous les participants</h2>
                <button 
                  className="close-button" 
                  onClick={() => {
                    setShowGroupMessageModal(false);
                    setMessageContent('');
                  }}
                  aria-label="Fermer le modal"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <p>Événement : {events.find(e => e.id.toString() === filters.event)?.title}</p>
                <div className="form-group">
                  <label>Message*</label>
                  <textarea
                    rows="4"
                    placeholder="Votre message à tous les participants..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="secondary-btn" 
                  onClick={() => {
                    setShowGroupMessageModal(false);
                    setMessageContent('');
                  }}
                >
                  Annuler
                </button>
                <button 
                  className="primary-btn"
                  onClick={sendGroupMessage}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' &&  (
            <Statistics
          events={events}
          participants={participants}
          filters={filters}
          setFilters={setFilters}
          calculateStatistics={calculateStatistics}
        />
        )}

          {activeTab === 'finance' && (
            <Finance />
          )}

          {activeTab === 'settings' && (
            <ProfileOrga />
          )}

        {activeTab === 'messages' && (
            <Messages
              messages={messages}
              participants={participants}
              onSendMessage={handleSendMessage}
              onMarkAsRead={handleMarkAsRead}
              onDeleteConversation={handleDeleteConversation}
            />
          )}
      </main>
    </div>
  );
};

export default DashboardOrganizer;