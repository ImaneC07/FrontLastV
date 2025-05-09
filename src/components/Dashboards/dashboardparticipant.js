import React, { useState, useMemo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboardparticipant.css';

const DashboardParticipant = () => {
  // Données simulées
  const [user, setUser] = useState({
    name: 'Imane Chaabani',
    email: 'imanechaabani07@gmail.com',
    photo: 'https://i.pravatar.cc/150?img=5',
    phone: '+212 7 62 55 08 26',
    address: '144 Rue de Saada',
    city: 'Tiznit',
    country: 'Maroc',
    newsletterFrequency: 'weekly', // 'daily', 'weekly', 'monthly', 'never'
    upcomingEvents: 2
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Festival Jazz',
      date: '15 Mars 2025',
      location: 'Paris',
      price: '25€',
      category: 'musique',
      image: '/images/music_event.webp',
      liked: false,
      capacity: 100,
      sold: 45,
      description: "Un festival de jazz exceptionnel avec les meilleurs artistes internationaux.",
      organizer: "Jazz Productions",
      organizerId: 1001
    },
    {
      id: 2,
      title: 'Exposition Art Moderne',
      date: '22 Juin 2025',
      location: 'Lyon',
      price: 'Gratuit',
      category: 'art',
      image: '/images/food&drinks.webp',
      liked: true,
      capacity: 50,
      sold: 12,
      description: "Une exposition unique présentant les œuvres d'artistes contemporains.",
      organizer: "Galerie Moderne",
      organizerId: 1002 
    },
    {
      id: 3,
      title: 'Conférence Tech',
      date: '07 Mai 2025',
      location: 'Marseille',
      price: '15€',
      category: 'technologie',
      image: '/images/food&drinks.webp',
      liked: false,
      capacity: 80,
      sold: 30,
      description: "Une conférence sur les dernières innovations technologiques.",
      organizer: "Tech Events",
      organizerId: 1003
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 101,
      eventId: 1,
      bookingDate: '2025-05-16',
      status: 'upcoming', // À venir
      feedback: null // Initially no feedback
    },
    {
      id: 102,
      eventId: 2,
      bookingDate: '2025-04-15',
      status: 'past', // Passée (car événement terminé)
      feedback: null // Initially no feedback
    },
    {
      id: 103,
      eventId: 3,
      bookingDate: '2025-06-01',
      status: 'cancelled', // Annulée manuellement
      feedback: null // Initially no feedback
    }
  ]);

  const [organizers, setOrganizers] = useState([
    {
      id: 1001,
      name: "Jazz Productions",
      photo: "https://i.pravatar.cc/150?img=1",
      description: "Organisateur de festivals de jazz de renommée internationale."
    },
    {
      id: 1002,
      name: "Galerie Moderne",
      photo: "https://i.pravatar.cc/150?img=2",
      description: "Galerie d'art contemporain basée à Lyon."
    },
    {
      id: 1003,
      name: "Tech Events",
      photo: "https://i.pravatar.cc/150?img=3",
      description: "Organisateur de conférences technologiques innovantes."
    }
  ]);

  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBookingTab, setActiveBookingTab] = useState('upcoming');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
      });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  const [tempUser, setTempUser] = useState({ ...user }); // Temporary user data for editing
  const [conversations, setConversations] = useState([
    {
      id: 1,
      organizerId: 1001,
      organizerName: "Jazz Productions",
      organizerPhoto: "https://i.pravatar.cc/150?img=1",
      messages: [
        {
          id: 1,
          senderId: 1001,
          text: "Bonjour, votre réservation est confirmée !",
          timestamp: "2024-03-15T10:30:00",
          read: true
        },
        {
          id: 2,
          senderId: 'user',
          text: "Merci ! J'ai une question concernant le parking...",
          timestamp: "2024-03-15T10:35:00",
          read: true
        }
      ],
      unreadCount: 0
    },
    {
      id: 2,
      organizerId: 1002,
      organizerName: "Galerie Moderne",
      organizerPhoto: "https://i.pravatar.cc/150?img=2",
      messages: [
        {
          id: 1,
          senderId: 1002,
          text: "Bienvenue à notre exposition.",
          timestamp: "2024-03-14T15:20:00",
          read: false
        }
      ],
      unreadCount: 1
    }
  ]);
  
  const [activeConversation, setActiveConversation] = useState(null);
  
  const [messages, setMessages] = useState([ 
    { id: 1, sender: 'Jazz Productions', text: 'Bonjour, votre réservation est confirmée !' },
    { id: 2, sender: 'Galerie Moderne', text: 'Bienvenue à notre exposition.' }
  ]);
  const [newMessageText, setNewMessageText] = useState(''); 
  const [invoices, setInvoices] = useState([ //ADD THIS
    { id: 1, date: '2025-05-01', amount: '25€', event: 'Festival Jazz' },
    { id: 2, date: '2025-04-15', amount: 'Gratuit', event: 'Exposition Art Moderne' }
  ]);

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'information', 'payment', 'confirmation'

    // This useEffect hook will reset isCheckoutOpen when leaving the cart
    useEffect(() => {
      if (activeTab !== 'cart') {
        setCheckoutStep('cart');
      }
    }, [activeTab]);
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    price: 'all'
  });
  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    bookingId: null,
    reason: "",
    refundEligible: false
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nouvel événement disponible près de chez vous!", read: false },
    { id: 2, message: "Votre réservation pour le Festival Jazz a été confirmée.", read: false }
  ]);

  const isRefundEligible = (frenchDate) => {
    const eventDate = parseFrenchDate(frenchDate);
    if (isNaN(eventDate.getTime())) return false; // Si la date est invalide

    const now = new Date();
    const diffHours = (eventDate - now) / (1000 * 60 * 60);
    return diffHours > 24; // Remboursable si >24h avant
  };

  // Fonction pour liker/unliker un événement
  const toggleLike = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId ? {...event, liked: !event.liked} : event
    ));
  };
  // Fonction pour convertir "15 Mars 2025" en objet Date
const parseFrenchDate = (frenchDate) => {
  const months = {
    'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
    'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
  };

  const parts = frenchDate.split(' ');
  const day = parseInt(parts[0]);
  const monthName = parts[1].toLowerCase();
  const year = parseInt(parts[2]);

  return new Date(year, months[monthName], day);
};

  // Filtrer les événements selon la recherche et les filtres
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || event.category === filters.category;
    const matchesLocation = filters.location === 'all' || event.location === filters.location;
    const matchesPrice = filters.price === 'all' || 
                        (filters.price === 'free' ? event.price === 'Gratuit' : event.price !== 'Gratuit');

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  // Gestion du changement de filtre
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };
  
  const increaseQuantity = (eventId) => {
    setCart(cart.map(item =>
      item.eventId === eventId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  
  const decreaseQuantity = (eventId) => {
    setCart(cart.map(item =>
      item.eventId === eventId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };
  const InformationComponent = ({ cart, onConfirm, setCheckoutStep }) => {
    const [participantsData, setParticipantsData] = useState(() => {
      const initialData = [];
      cart.forEach(item => {
          for (let i = 0; i < item.quantity; i++) {
            initialData.push({ eventId: item.eventId, name: '', email: '' });
             }
            });
            return initialData;
          });
  
    const handleParticipantChange = (index, field, value) => {
      const newParticipantsData = [...participantsData];
      newParticipantsData[index][field] = value;
      setParticipantsData(newParticipantsData);
    };
  
    const calculateTotal = () => {
      return cart.reduce((total, item) => {
        const price = item.price === 'Gratuit' ? 0 : parseFloat(item.price);
        return total + price * item.quantity;
      }, 0);
    };
  
    const total = calculateTotal();
  
    return (
      <div className="checkout-page">
      <div className="checkout-header">
        <h2>Informations des Participants</h2>
        <div className="checkout-steps">
          <div className="step completed">Panier</div>
          <div className="step active">Informations</div>
          <div className="step">Paiement</div>
          <div className="step">Confirmation</div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="participants-section">
          {participantsData.map((participant, index) => {
            const event = cart.find(item => item.eventId === participant.eventId);
            return (
              <div key={index} className="participant-form">
                <h3>Participant #{index + 1} - {event?.title}</h3>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={participant.name}
                    onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={participant.email}
                    onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="checkout-sidebar">
          <div className="order-summary">
            <h3>Récapitulatif</h3>
            {cart.map(item => (
              <div key={item.eventId} className="summary-item">
                <span>{item.title} x{item.quantity}</span>
                <span>{item.price === 'Gratuit' ? 'Gratuit' : `${parseFloat(item.price) * item.quantity}€`}</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>{calculateTotal()}€</span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-footer">
        <button 
          className="back-button"
          onClick={() => setCheckoutStep('cart')}
        >
          Retour au panier
        </button>
        <button
          className="next-button"
          onClick={() => {
            if (participantsData.every(p => p.name && p.email)) {
              setCheckoutStep('payment');
            } else {
              alert('Veuillez remplir toutes les informations');
            }
          }}
        >
          Continuer vers le paiement
        </button>
      </div>
    </div>
  );
};

  const PaymentComponent = ({ setCheckoutStep }) => {
        const [paymentMethod, setPaymentMethod] = useState('card');
        const [cardInfo, setCardInfo] = useState({
          number: '',
          name: '',
          expiry: '',
          cvv: ''
        });

    return (
      <div className="checkout-page">
        <div className="checkout-header">
        <h2>Payment Information</h2>
        <div className="checkout-steps">
          <div className="step completed">Panier</div>
          <div className="step completed">Informations</div>
          <div className="step active">Paiement</div>
          <div className="step">Confirmation</div>
        </div>
        </div>
        <div className="checkout-content">
        <div className="payment-section">
          <div className="payment-methods">
            <h3>Mode de paiement</h3>
            <div className="payment-options">
              <button 
                className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <i className="fas fa-credit-card"></i>
                Carte bancaire
              </button>
              <button 
                className={`payment-method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <i className="fab fa-paypal"></i>
                PayPal
              </button>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-payment-form">
              <div className="form-group">
                <label>Numéro de carte</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                  value={cardInfo.number}
                  onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Nom sur la carte</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="JOHN DOE"
                  value={cardInfo.name}
                  onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Date d'expiration</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="MM/AA"
                    value={cardInfo.expiry}
                    onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                  />
                </div>
                <div className="form-group half">
                  <label>CVV</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="123"
                    value={cardInfo.cvv}
                    onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="paypal-section">
              <p>Vous allez être redirigé vers PayPal pour finaliser votre paiement.</p>
            </div>
          )}
        </div>

        <div className="checkout-sidebar">
          <div className="order-summary">
            <h3>Sécurité du paiement</h3>
            <div className="security-info">
              <div className="security-item">
                <i className="fas fa-lock"></i>
                <span>Paiement sécurisé SSL</span>
              </div>
              <div className="security-item">
                <i className="fas fa-shield-alt"></i>
                <span>Protection des données</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-footer">
        <button 
          className="back-button"
          onClick={() => setCheckoutStep('information')}
        >
          Retour
        </button>
        <button
          className="next-button"
          onClick={() => setCheckoutStep('confirmation')}
        >
          Confirmer le paiement
        </button>
      </div>
    </div>
  );
};

const ConfirmationComponent = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>Confirmation de commande</h2>
        <div className="checkout-steps">
          <div className="step completed">Panier</div>
          <div className="step completed">Informations</div>
          <div className="step completed">Paiement</div>
          <div className="step completed">Confirmation</div>
        </div>
      </div>

      <div className="confirmation-content">
        <div className="confirmation-message">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h3>Merci pour votre commande !</h3>
          <p>Votre réservation a été confirmée et vous recevrez un email de confirmation.</p>
        </div>

        <div className="order-details">
          <h4>Détails de la commande</h4>
          <div className="order-info">
            <p><strong>Numéro de commande:</strong> #123456</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="next-steps">
          <h4>Prochaines étapes</h4>
          <ul>
            <li>Vérifiez votre email pour la confirmation</li>
            <li>Téléchargez vos billets électroniques</li>
            <li>Ajoutez l'événement à votre calendrier</li>
          </ul>
        </div>
      </div>

      <div className="checkout-footer">
        <button 
          className="home-button"
          onClick={() => window.location.href = '/'}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

  const handleConfirmOrder = async () => {
    // 1. Process payment via Stripe or PayPal (call your backend)
    // 2. Create order in your database (call your backend)

    // Simulate success
    alert('Paiement réussi et commande créée!');

    // 3. Update bookings and invoices states
    // (Assuming you have backend endpoints to fetch these)
    // const newBooking = await fetch('/api/bookings').then(res => res.json());
    // setBookings(newBooking);

    // const newInvoice = await fetch('/api/invoices').then(res => res.json());
    // setInvoices(newInvoice);

    // 4. Clear the cart
    clearCart();

    // 5. Advance to confirmation step
    setCheckoutStep('confirmation');
  };

  // Composant EventCard
  const EventCard = ({ event, onLike, showCapacity = false }) => {
    return (
      <div className="event-card">
        <div className="event-image">
          <img src={event.image} alt={event.title} />
          <button 
            className={`like-button ${event.liked ? 'liked' : ''}`}
            onClick={() => onLike(event.id)}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
        <div className="event-info">
          <h3>{event.title}</h3>
          <p className="event-meta">
            <i className="fas fa-calendar-alt"></i> {event.date}
            <i className="fas fa-map-marker-alt"></i> {event.location}
          </p>
          {showCapacity && (
            <p className="event-capacity">
              <i className="fas fa-users"></i> Places: {event.capacity - event.sold}/{event.capacity}
            </p>
          )}
          <p className="event-price">{event.price}</p>
        </div>
        <div className="event-actions">
          <button 
            className="details-button"
            onClick={() => {
              setSelectedEvent(event);
              setActiveTab('eventDetails');
            }}
          >
            Détails
          </button>
          <button className="book-button"   onClick={() =>  addToCart(event.id)}
        disabled={event.sold >= event.capacity}
      >
        {event.sold >= event.capacity ? 'Complet' : 'Ajouter au panier'}</button>
        </div>
      </div>
    );
  };

  // Gestion des réservations
  const handleBookEvent = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event || event.sold >= event.capacity) {
      alert('Désolé, complet !');
      return;
    }

    const newBooking = {
      id: Date.now(),
      eventId,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'upcoming',
      feedback: null 
    };

    setBookings([...bookings, newBooking]);
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, sold: e.sold + 1 } : e
    ));

      // Schedule notification
    const eventDate = parseFrenchDate(event.date);
    const notificationTime = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours before

    if (notificationTime > new Date()) {
      const timeoutId = setTimeout(() => {
        setNotifications(prevNotifications => [
          ...prevNotifications,
          {
            id: Date.now(),
            message: `Votre événement "${event.title}" commence dans 24 heures!`,
            read: false
          }
        ]);
      }, notificationTime.getTime() - new Date().getTime());

      // Store timeout ID for potential cleanup (e.g., if the booking is cancelled)
      newBooking.timeoutId = timeoutId;
    }
  };

  const handleCancelBooking = (bookingId, reason) => {
    console.log("Tentative d'annulation pour:", bookingId, "Raison:", reason); // Debug
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;
      const event = events.find(e => e.id === booking.eventId);
      if (!event) return;

     // Conversion et vérification de la date
       const eventDate = parseFrenchDate(event.date);
       if (isNaN(eventDate.getTime())) {
        console.error("Date invalide :", event.date);
       return;
        }
      
        const cancellationDate = new Date().toLocaleString(); // Get current date and time
    
      setBookings(bookings.map(b => 
        b.id === bookingId ? {
          ...b,
          status: "cancelled",
          cancellationReason: reason,
          cancelledAt: cancellationDate,
          refundProcessed: event.price !== "Gratuit" && cancelModal.refundEligible
        } : b
      ));

        // Clear scheduled notification
    if (booking.timeoutId) {
      clearTimeout(booking.timeoutId);
    }

    // Libère une place
    setEvents(events.map(e => 
      e.id === booking.eventId ? { ...e, sold: e.sold - 1 } : e
    ));

    // Notification simulée à l'organisateur
    console.log(`Notification : Réservation #${bookingId} annulée. Raison : ${reason}`);
  };

     // Function to handle feedback submission
   const handleFeedbackSubmit = (bookingId, feedbackText) => {
    setBookings(bookings.map(b =>
      b.id === bookingId ? { ...b, feedback: feedbackText } : b
    ));
   };

   const handleOrganizerClick = (organizerId) => {
    const organizer = organizers.find(o => o.id === organizerId);
    setSelectedOrganizer(organizer);
    setActiveTab('organizerProfile');
  };

  const handleCheckout = () => {
    setCheckoutStep('information'); // Start checkout
  };

  const startNewConversation = (organizerId) => {
    const organizer = organizers.find(o => o.id === organizerId);
    if (!organizer) return;
  
    const existingConversation = conversations.find(c => c.organizerId === organizerId);
    if (existingConversation) {
      setActiveConversation(existingConversation.id);
      return;
    }
  
    const newConversation = {
      id: Date.now(),
      organizerId: organizer.id,
      organizerName: organizer.name,
      organizerPhoto: organizer.photo,
      messages: [],
      unreadCount: 0
    };
  
    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversation.id);
  };
  
  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Traitement des réservations
  const currentDate = new Date().toISOString().split('T')[0];

  const processedBookings = bookings.map(booking => {
    const event = events.find(e => e.id === booking.eventId);
    if (!event) return booking;
    let status = booking.status;

    // Mise à jour automatique du statut
    if (status !== 'cancelled') {
      const eventDate = parseFrenchDate(event.date);
      const now = new Date();
      status = eventDate < now ? 'past' : 'upcoming';
    }

    return { 
      ...booking, 
      status,
      event // Ajoute toutes les infos de l'événement
    };
  });
  const addToCart = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (!event || cart.some(item => item.eventId === eventId)) return;
  
    // Check if the item is already in the cart
  const existingCartItem = cart.find(item => item.eventId === eventId);

  if (existingCartItem) {
    // If the item is already in the cart, increase the quantity
    setCart(cart.map(item =>
      item.eventId === eventId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  } else {
    // If the item is not in the cart, add it with a quantity of 1
    setCart([...cart, {
      eventId,
      title: event.title,
      price: event.price,
      date: event.date,
      image: event.image,
      quantity: 1 // Initial quantity
    }]);
  }
};

   // Retirer un élément du panier
   const removeFromCart = (eventId) => {
    setCart(cart.filter(item => item.eventId !== eventId));
  };
  
  // Vider complètement le panier
  const clearCart = () => setCart([]);

  // Filtrage pour l'onglet actif
  const displayedBookings = processedBookings.filter(booking => 
    activeBookingTab === 'upcoming' ? booking.status === 'upcoming' :
    activeBookingTab === 'past' ? booking.status === 'past' :
    booking.status === 'cancelled'
  );

  // Composant BookingCard
  const BookingCard = ({ booking }) => {
    const [feedbackText, setFeedbackText] = useState(''); // Local state for feedback input
    const navigate = useNavigate();
    const handleCardClick = () => {
      if (booking.status === 'upcoming' || booking.status === 'cancelled') {
      setSelectedEvent(booking.event);
      setActiveTab('eventDetails');
      }
    };
    return (
    <div className="booking-card" onClick={handleCardClick} style={{ cursor: (booking.status === 'upcoming' || booking.status === 'cancelled') ? 'pointer' : 'default' }}
    >
      <h3>{booking.event.title}</h3>
      <p>
        <i className="fas fa-calendar-day"></i> {booking.event.date} • 
        <i className="fas fa-map-marker-alt"></i> {booking.event.location}
      </p>
      <p>
        Statut: <span className={`status-${booking.status}`}>
          {booking.status === 'upcoming' ? 'Confirmée' : 
           booking.status === 'past' ? 'Terminée' : 'Annulée'}
        </span>
      </p>
      
      {booking.status === 'cancelled' && (
        <div className="cancellation-info">
          <p>
            <i className="fas fa-ban"></i> Annulée le: {booking.cancelledAt}
          </p>
          <p>
            <i className="fas fa-comment"></i> Raison: {booking.cancellationReason}
          </p>
        </div>
      )}

    {activeBookingTab === 'past' && booking.status === 'past' && !booking.feedback && (
          <div className="feedback-section">
            <textarea
              placeholder="Donnez votre avis sur l'événement"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <button
              onClick={() => {
                handleFeedbackSubmit(booking.id, feedbackText);
              }}
              disabled={!feedbackText.trim()}
            >
              Envoyer Feedback
            </button>
          </div>
        )}

        {activeBookingTab === 'past' && booking.status === 'past' && booking.feedback && (
          <div className="feedback-display">
            <p>
              <i className="fas fa-comment"></i> Votre Feedback: {booking.feedback}
            </p>
          </div>
        )}

      {booking.status === 'upcoming' && (
        <div className="booking-actions">
          <button 
            className="cancel-btn"
            onClick={() => {
              const event = events.find(e => e.id === booking.eventId);
              setCancelModal(prev=>({
                ...prev, 
                isOpen: true,
                bookingId: booking.id,
                reason: "",
                refundEligible: event.price !== "Gratuit" && isRefundEligible(event.date) 
              }));
            }}
          >
            Annuler
          </button>
          <button className="qr-btn" onClick={() => alert(`QR Code simulé pour ${booking.id}`)}>
            Voir QR Code
          </button>
        </div>
      )}
    </div>
  );
  };
   const CancelModal = React.memo(({ isOpen, onClose, onConfirm, refundEligible, initialReason }) => {
    const [reason, setReason] = useState(initialReason);
    
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Annuler la réservation</h3>
            <button 
              className="close-button"
              onClick= {onClose}
            >
              &times;
            </button>
          </div>
          
          <div className="modal-body">
            <p className="modal-text">Veuillez nous indiquer pourquoi vous annulez cette réservation :</p>
            
            {refundEligible && (
              <div className="refund-notice">
                <i className="fas fa-check-circle"></i>
                <span>Remboursement possible (annulation plus de 24h avant l'événement)</span>
              </div>
            )}
            
            <textarea
              className="reason-textarea"
              placeholder="Ex : Changement de plans, problème de transport..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="5"
            />
          </div>
          
          <div className="modal-footer">
            <button 
              className="secondary-button"
              onClick={onClose}
               >
              Retour
            </button>
            <button
              className="primary-button"
              disabled={!reason.trim()}
              onClick={() => {
                onConfirm(reason);
              }}
            >
              Confirmer l'annulation
            </button>
          </div>
        </div>
      </div>
    );
      });

      const memoizedCancelModal = useMemo(() => (
        <CancelModal 
          isOpen={cancelModal.isOpen}
          onClose={() => setCancelModal({...cancelModal, isOpen: false})}
          onConfirm={(reason) => {
            handleCancelBooking(cancelModal.bookingId, reason);
            setCancelModal({...cancelModal, isOpen: false});
          }}
          refundEligible={cancelModal.refundEligible}
          initialReason={cancelModal.reason}
        />
       ), [cancelModal.isOpen, cancelModal.refundEligible, cancelModal.bookingId, cancelModal.reason, handleCancelBooking, cancelModal]); // Seuls ces états déclenchent un nouveau rendu


       const handleProfileEdit = () => {
        setIsEditingProfile(true);
        setTempUser({ ...user }); // Initialize tempUser with current user data
      };
    
      const handleProfileCancel = () => {
        setIsEditingProfile(false);
      };
    
      const handleProfileSave = () => {
        // Update the user state with the temporary values
        setUser({ ...tempUser });
        setIsEditingProfile(false);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUser({ ...tempUser, [name]: value });
      };
    
      const handleNewsletterChange = (e) => {
        setTempUser({ ...tempUser, newsletterFrequency: e.target.value });
      };
    
      const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          // In a real application, you would upload this file to a server
          // and get a URL to store in the user's photo field.
          // For this example, we'll just use a placeholder.
          setTempUser({ ...tempUser, photo: URL.createObjectURL(file) });
        }
      };

      const handleSendMessage = () => { 
        if (!newMessageText.trim() || !activeConversation) return;
        
        const newMessage = {
          id: Date.now(),
          senderId: 'user',
          text: newMessageText,
          timestamp: new Date().toISOString(),
          read: true
        };
          setConversations(conversations.map(conv =>
            conv.id === activeConversation
              ? {
                  ...conv,
                  messages: [...conv.messages, newMessage]
                }
              : conv
          ));
        
          setNewMessageText('');
        };
    
      const handleDownloadInvoice = (invoiceId) => { 
        alert(`Téléchargement de la facture #${invoiceId} simulé.`); 
        // In a real application, you would trigger a file download from the server here. 
      };

      const handlePasswordChange = () => {
        const errors = {};
        
        if (!passwordData.currentPassword) {
          errors.currentPassword = "Veuillez entrer votre mot de passe actuel";
        }
        
        if (!passwordData.newPassword) {
          errors.newPassword = "Veuillez entrer un nouveau mot de passe";
        } else if (passwordData.newPassword.length < 8) {
          errors.newPassword = "Le mot de passe doit contenir au moins 8 caractères";
        }
        
        if (!passwordData.confirmPassword) {
          errors.confirmPassword = "Veuillez confirmer votre nouveau mot de passe";
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
          errors.confirmPassword = "Les mots de passe ne correspondent pas";
        }
      
        if (Object.keys(errors).length > 0) {
          setPasswordErrors(errors);
          return;
        }
      
        // Ici, vous feriez normalement un appel API pour changer le mot de passe
        alert("Mot de passe modifié avec succès!");
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordErrors({});
      };
      
      const PasswordModal = () => {
        if (!showPasswordModal) return null;
      
        return (
          <div className="modal-overlay">
            <div className="modal-content password-modal">
              <div className="modal-header">
                <h3>Modifier le mot de passe</h3>
                <button 
                  className="close-button"
                  onClick={() => setShowPasswordModal(false)}
                >
                  &times;
                </button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>Mot de passe actuel</label>
                  <div className="password-input-container">
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value
                      })}
                      className={passwordErrors.currentPassword ? 'error' : ''}
                    />
                    {passwordErrors.currentPassword && (
                      <span className="error-message">{passwordErrors.currentPassword}</span>
                    )}
                  </div>
                </div>
      
                <div className="form-group">
                  <label>Nouveau mot de passe</label>
                  <div className="password-input-container">
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value
                      })}
                      className={passwordErrors.newPassword ? 'error' : ''}
                    />
                    {passwordErrors.newPassword && (
                      <span className="error-message">{passwordErrors.newPassword}</span>
                    )}
                  </div>
                  <div className="password-requirements">
                    <p>Le mot de passe doit contenir :</p>
                    <ul>
                      <li className={passwordData.newPassword.length >= 8 ? 'valid' : ''}>
                        Au moins 8 caractères
                      </li>
                      <li className={/[A-Z]/.test(passwordData.newPassword) ? 'valid' : ''}>
                        Une majuscule
                      </li>
                      <li className={/[0-9]/.test(passwordData.newPassword) ? 'valid' : ''}>
                        Un chiffre
                      </li>
                      <li className={/[!@#$%^&*]/.test(passwordData.newPassword) ? 'valid' : ''}>
                        Un caractère spécial
                      </li>
                    </ul>
                  </div>
                </div>
      
                <div className="form-group">
                  <label>Confirmer le nouveau mot de passe</label>
                  <div className="password-input-container">
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value
                      })}
                      className={passwordErrors.confirmPassword ? 'error' : ''}
                    />
                    {passwordErrors.confirmPassword && (
                      <span className="error-message">{passwordErrors.confirmPassword}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="secondary-button"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Annuler
                </button>
                <button
                  className="primary-button"
                  onClick={handlePasswordChange}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        );
      };
      
      const NotificationSettingsModal = () => {
        if (!showNotificationSettings) return null;
      
        return (
          <div className="modal-overlay">
            <div className="modal-content notification-settings-modal">
              <div className="modal-header">
                <h3>Préférences de notification</h3>
                <button 
                  className="close-button"
                  onClick={() => setShowNotificationSettings(false)}
                >
                  &times;
                </button>
              </div>
              
              <div className="modal-body">
                <div className="notification-setting">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Notifications par email
                  </label>
                  <p>Recevoir des emails pour les mises à jour importantes</p>
                </div>
      
                <div className="notification-setting">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Notifications push
                  </label>
                  <p>Recevoir des notifications sur votre navigateur</p>
                </div>
      
                <div className="notification-setting">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Rappels d'événements
                  </label>
                  <p>Recevoir des rappels avant vos événements</p>
                </div>
      
                <div className="notification-setting">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Messages des organisateurs
                  </label>
                  <p>Être notifié des messages des organisateurs</p>
                </div>
      
                <div className="notification-setting">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Promotions et offres
                  </label>
                  <p>Recevoir des offres spéciales et recommandations</p>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="secondary-button"
                  onClick={() => setShowNotificationSettings(false)}
                >
                  Annuler
                </button>
                <button
                  className="primary-button"
                  onClick={() => {
                    alert('Préférences de notification mises à jour!');
                    setShowNotificationSettings(false);
                  }}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        );
      };
      
      const DeleteAccountModal = () => {
        if (!showDeleteAccountModal) return null;
      
        return (
          <div className="modal-overlay">
            <div className="modal-content delete-account-modal">
              <div className="modal-header">
                <h3>Supprimer le compte</h3>
                <button 
                  className="close-button"
                  onClick={() => setShowDeleteAccountModal(false)}
                >
                  &times;
                </button>
              </div>
              
              <div className="modal-body">
                <div className="warning-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h4>Êtes-vous sûr de vouloir supprimer votre compte ?</h4>
                <p>Cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
                
                <div className="delete-confirmation">
                  <label>
                    <input type="checkbox" required />
                    Je comprends que cette action est irréversible
                  </label>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="secondary-button"
                  onClick={() => setShowDeleteAccountModal(false)}
                >
                  Annuler
                </button>
                <button
                  className="danger-button"
                  onClick={() => {
                    alert('Compte supprimé');
                    setShowDeleteAccountModal(false);
                  }}
                >
                  Supprimer définitivement
                </button>
              </div>
            </div>
          </div>
        );
      };
      
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
          <button className="icon-button"  onClick={() => setActiveTab('notifications')}>
            <i className="fas fa-bell"></i>
            {unreadNotificationsCount > 0 && (
            <span className="notification-badge">3</span>
            )}
          </button>
          <button className="icon-button" onClick={() => setActiveTab('inbox')}>
            <i className="fas fa-envelope"></i>
          </button>
          <button className="icon-button" onClick={() => setActiveTab(activeTab === 'cart' ? 'home' : 'cart')}>
            <i className="fas fa-shopping-cart"></i>
            {cart.length > 0 && (
            <span className="cart-badge">{cart.length}</span> )}
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
          <button
            className={`nav-button ${activeTab === 'inbox' ? 'active' : ''}`} 
            onClick={() => setActiveTab('inbox')} 
          >
            <i className="fas fa-envelope"></i> 
            <span>Inbox</span> 
          </button>
          <button 
            className={`nav-button ${activeTab === 'invoices' ? 'active' : ''}`} 
            onClick={() => setActiveTab('invoices')} 
          >
            <i className="fas fa-file-invoice"></i> 
            <span>Mes Factures</span> 
          </button>
        </nav>
        
        <div className="help-section">
          <button className="help-button">
            <i className="fas fa-question-circle"></i>
            <span>Aide & Support</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'home' && (
          <>
            <section className="welcome-banner">
              <h1>Bonjour, {user.name} !</h1>
              <p>Découvrez les événements qui vous attendent.</p>
              {user.upcomingEvents > 0 && (
                <div className="upcoming-alert">
                  Vous avez {user.upcomingEvents} événement(s) à venir ce mois-ci !
                </div>
              )}
            </section>

            <section className="recommended-section">
              <h2 className="section-title">Recommandé pour vous</h2>
              <div className="events-grid">
                {filteredEvents.slice(0, 3).map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onLike={toggleLike}
                  />
                ))}
              </div>
            </section>

            <section className="trending-section">
              <h2 className="section-title">Événements tendances</h2>
              <div className="events-grid">
                {filteredEvents.slice().reverse().map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onLike={toggleLike}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'explore' && (
          <div className="explore-page">
            <h2 className="section-title">Explorer les événements</h2>
            <div className="filters">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">Toutes catégories</option>
                <option value="musique">Musique</option>
                <option value="art">Art</option>
                <option value="technologie">Technologie</option>
              </select>
              
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="all">Tous lieux</option>
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
              </select>
              
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
              >
                <option value="all">Tous prix</option>
                <option value="free">Gratuit</option>
                <option value="paid">Payant</option>
              </select>
            </div>
            <div className="events-grid">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onLike={toggleLike}
                  showCapacity={true}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-page">
            <h2 className="section-title">Mes Réservations</h2>
            <div className="booking-tabs">
              <button className={activeBookingTab === 'upcoming' ? 'active' : ''}
                onClick={() => setActiveBookingTab('upcoming')} >À venir</button>
              <button className={activeBookingTab === 'past' ? 'active' : ''}
                onClick={() => setActiveBookingTab('past')} >Passées</button>
              <button className={activeBookingTab === 'cancelled' ? 'active' : ''}
                onClick={() => setActiveBookingTab('cancelled')} >Annulées</button>
            </div>
            <div className="bookings-list">
              {displayedBookings.length > 0 ? (
                displayedBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="empty-state">
                  <i className="fas fa-calendar-times"></i>
                  <p>Aucune réservation {activeBookingTab === 'upcoming' ? 'à venir' : 
                    activeBookingTab === 'past' ? 'passée' : 'annulée'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-page">
            <h2 className="section-title">Mes Événements Favoris</h2>
            {events.filter(e => e.liked).length > 0 ? (
              <div className="events-grid">
                {events.filter(e => e.liked).map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onLike={toggleLike}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-heart-broken"></i>
                <p>Vous n'avez aucun événement favori pour le moment</p>
                <button className="explore-button" onClick={() => setActiveTab('explore')}>
                  Explorer les événements
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-page">
            <h2 className="section-title">Mon Profil</h2>
            {!isEditingProfile ? (
            <div className="profile-card">
              <div className="profile-header">
                <img src={user.photo} alt={user.name} />
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.address}, {user.city}, {user.country}</p>
                </div>
                <button className="edit-button" onClick={handleProfileEdit}>
                  <i className="fas fa-edit"></i> Modifier
                </button>
              </div>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <h4>Événements</h4>
                  <p>12</p>
                </div>
                <div className="stat-item">
                  <h4>Favoris</h4>
                  <p>5</p>
                </div>
                <div className="stat-item">
                  <h4>Depuis</h4>
                  <p>2022</p>
                </div>
              </div>
              
              <div className="profile-actions">
                <button className="action-button" onClick={() => setShowPasswordModal(true)}>
                  <i className="fas fa-key"></i> 
                  <span> Changer mot de passe </span>
                </button>
                <button className="action-button" onClick={() => setShowNotificationSettings(true)}>
                  <i className="fas fa-bell"></i> 
                  <span> Préférences de notification </span>
                </button>
                <div className="newsletter-preferences">
                    <h4>Préférences Newsletter</h4>
                    <p>Fréquence: {user.newsletterFrequency}</p>
                    <select
                         value={user.newsletterFrequency}
                         onChange={(e) => setUser({...user, newsletterFrequency: e.target.value})}
                         className="newsletter-select"
                          >
                           <option value="daily">Quotidien</option>
                           <option value="weekly">Hebdomadaire</option>
                           <option value="monthly">Mensuel</option>
                           <option value="never">Désactiver</option>
                    </select>
                  </div>

                  <button className="action-button danger" onClick={() => setShowDeleteAccountModal(true)}>
                      <i className="fas fa-trash-alt"></i>
                     <span>Supprimer le compte</span>
                  </button>

                <button className="action-button">
                  <i className="fas fa-sign-out-alt"></i> 
                  <span> Déconnexion </span>
                </button>
              </div>
            </div>
            ):(
              <div className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="photo">Photo de profil</label>
                <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
                {tempUser.photo && <img src={tempUser.photo} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '50%', marginTop: '10px' }} />}
              </div>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" value={tempUser.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={tempUser.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Téléphone</label>
                <input type="tel" id="phone" name="phone" value={tempUser.phone} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Adresse</label>
                <input type="text" id="address" name="address" value={tempUser.address} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="city">Ville</label>
                <input type="text" id="city" name="city" value={tempUser.city} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="country">Pays</label>
                <input type="text" id="country" name="country" value={tempUser.country} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Fréquence Newsletter</label>
                <select value={tempUser.newsletterFrequency} onChange={handleNewsletterChange}>
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                  <option value="never">Jamais</option>
                </select>
              </div>
              <div className="form-actions">
                <button className="secondary-button" onClick={handleProfileCancel}>Annuler</button>
                <button className="primary-button" onClick={handleProfileSave}>Enregistrer</button>
              </div>
            </div>
          )}
          </div>
          
        )}

{activeTab === 'inbox' && (
  <div className="inbox-page">
    <h2 className="section-title">Messages</h2>
    <div className="inbox-container">
      {/* Liste des conversations */}
      <div className="conversations-list">
        {conversations.map(conversation => (
          <div
            key={conversation.id}
            className={`conversation-item ${activeConversation === conversation.id ? 'active' : ''}`}
            onClick={() => setActiveConversation(conversation.id)}
          >
            <img src={conversation.organizerPhoto} alt={conversation.organizerName} />
            <div className="conversation-info">
              <h3>{conversation.organizerName}</h3>
              <p>{conversation.messages[conversation.messages.length - 1]?.text}</p>
            </div>
            {conversation.unreadCount > 0 && (
              <span className="unread-badge">{conversation.unreadCount}</span>
            )}
          </div>
        ))}
      </div>

      {/* Zone de chat active */}
      <div className="chat-area">
        {activeConversation ? (
          <>
            <div className="chat-header">
              <img
                src={conversations.find(c => c.id === activeConversation)?.organizerPhoto}
                alt="Organizer"
              />
              <h3>{conversations.find(c => c.id === activeConversation)?.organizerName}</h3>
            </div>

            <div className="messages-container">
              {conversations
                .find(c => c.id === activeConversation)
                ?.messages.map(message => (
                  <div
                    key={message.id}
                    className={`message ${message.senderId === 'user' ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            <div className="message-input">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessageText.trim()) {
                    handleSendMessage();
                  }
                }}
              />
              <button onClick={handleSendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </>
        ) : (
          <div className="no-conversation-selected">
            <i className="fas fa-comments"></i>
            <p>Sélectionnez une conversation pour commencer à chatter</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}

        {activeTab === 'eventDetails' && selectedEvent && (
          <div className="event-details-page">
            <button 
              className="back-button"
              onClick={() => {
                setSelectedEvent(null);
                setActiveTab('home');
              }}
            >
              <i className="fas fa-arrow-left"></i> Retour
            </button>

            <div className="event-details-content">
              <div className="event-details-header">
                <img src={selectedEvent.image} alt={selectedEvent.title} />
                <div className="event-details-info">
                  <h1>{selectedEvent.title}</h1>
                  <div className="event-meta">
                    <p><i className="fas fa-calendar-alt"></i> {selectedEvent.date}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {selectedEvent.location}</p>
                    <p><i className="fas fa-tag"></i> {selectedEvent.category}</p>
                  </div>
                </div>
              </div>

              <div className="event-details-body">
                <div className="event-details-main">
                  <section className="description-section">
                    <h2>Description</h2>
                    <p>{selectedEvent.description}</p>
                  </section>

                  <section className="details-section">
                    <h2>Informations</h2>
                    <div className="details-grid">
                      <div className="detail-item">
                        <h3>Organisateur</h3>
                        <p className="organizer-link"
                          onClick={() => handleOrganizerClick(selectedEvent.organizerId)}
                          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>{selectedEvent.organizer}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Capacité</h3>
                        <p>{selectedEvent.capacity} places</p>
                      </div>
                      <div className="detail-item">
                        <h3>Places restantes</h3>
                        <p>{selectedEvent.capacity - selectedEvent.sold}</p>
                      </div>
                      <div className="detail-item">
                        <h3>Prix</h3>
                        <p>{selectedEvent.price}</p>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="event-details-sidebar">
                  <div className="action-card">
                    <button 
                      className={`like-button ${selectedEvent.liked ? 'liked' : ''}`}
                      onClick={() => toggleLike(selectedEvent.id)}
                    >
                      {selectedEvent.liked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    </button>
                    <button className="book-button">Réserver maintenant</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
              {activeTab === 'organizerProfile' && selectedOrganizer && (
          <div className="organizer-profile-page">
            <button
              className="back-button"
              onClick={() => {
                setSelectedOrganizer(null);
                setActiveTab('home');
              }}
            >
              <i className="fas fa-arrow-left"></i> Retour
            </button>
            <h2>Profil de l'organisateur</h2>
            <div className="organizer-profile">
              <img src={selectedOrganizer.photo} alt={selectedOrganizer.name} />
              <h3>{selectedOrganizer.name}</h3>
              <p>{selectedOrganizer.description}</p>
              <h4>Événements organisés par {selectedOrganizer.name}:</h4>
              <ul>
                {events
                  .filter(event => event.organizerId === selectedOrganizer.id)
                  .map(event => (
                    <li key={event.id}>{event.title}</li>
                  ))}
              </ul>
            </div>
          </div>
        )}

  {activeTab === 'notifications' && (
          <div className="notifications-page">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
              <p>Aucune notification pour le moment.</p>
            ) : (
              <ul>
                {notifications.map(notification => (
                  <li
                    key={notification.id}
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  >
                    <span className="notification-message">{notification.message}</span>
                    {!notification.read && (
                      <button onClick={() => markNotificationAsRead(notification.id)}>
                        Marquer comme lu
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

    {activeTab === 'invoices' && ( 
      <div className="invoices-page"> 
           <h2 className="section-title">Mes Factures</h2> 
              <table className="invoices-table">  
                <thead>  
                    <tr>  
                        <th>Date</th>  
                        <th>Événement</th>  
                        <th>Montant</th>  
                        <th>Action</th>  
                     </tr>  
                </thead>  
                <tbody> 
                  {invoices.map(invoice => ( 
                    <tr key={invoice.id}> 
                        <td>{invoice.date}</td> 
                       <td>{invoice.event}</td> 
                       <td>{invoice.amount}</td> 
                       <td> 
                           <button 
                             className="download-button" 
                              onClick={() => handleDownloadInvoice(invoice.id)} 
                            > 
                                         Télécharger 
                            </button> 
                      </td> 
                    </tr> 
                  ))} 
                </tbody> 
              </table> 
      </div> 
    )} 

{activeTab === 'cart' && checkoutStep === 'cart' && (
  <div className="checkout-page">
    <div className="checkout-header">
      <h2>Votre Panier</h2>
      <div className="checkout-steps">
        <div className="step active">Panier</div>
        <div className="step">Informations</div>
        <div className="step">Paiement</div>
        <div className="step">Confirmation</div>
      </div>
    </div>

    {cart.length === 0 ? (
      <div className="empty-cart">
        <i className="fas fa-shopping-cart"></i>
        <p>Votre panier est vide</p>
        <button 
          className="explore-button"
          onClick={() => setActiveTab('explore')}
        >
          Explorer les événements
        </button>
      </div>
    ) : (
      <>
        <div className="checkout-content">
          <div className="cart-items-section">
            {cart.map(item => (
              <div key={item.eventId} className="cart-item-card">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p className="event-date">
                      <i className="fas fa-calendar-alt"></i> {item.date}
                    </p>
                    <p className="event-price">{item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => decreaseQuantity(item.eventId)}
                        disabled={item.quantity <= 1}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.eventId)}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <button 
                      className="remove-button"
                      onClick={() => removeFromCart(item.eventId)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary">
              <h3>Récapitulatif</h3>
              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.eventId} className="summary-item">
                    <span>{item.title} x{item.quantity}</span>
                    <span>{item.price === 'Gratuit' ? 'Gratuit' : 
                      `${parseFloat(item.price) * item.quantity}€`}</span>
                  </div>
                ))}
              </div>
              <div className="summary-fees">
                <div className="fee-item">
                  <span>Frais de service</span>
                  <span>5.00€</span>
                </div>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{cart.reduce((total, item) => {
                  const price = item.price === 'Gratuit' ? 0 : parseFloat(item.price);
                  return total + (price * item.quantity);
                }, 5)}€</span>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-footer">
          <button 
            className="back-button"
            onClick={clearCart}
          >
            Vider le panier
          </button>
          <button
            className="next-button"
            onClick={() => setCheckoutStep('information')}
          >
            Passer à la caisse
          </button>
        </div>
      </>
    )}
  </div>
)}

{checkoutStep === 'information' && (
              <InformationComponent
                cart={cart}
                onConfirm={(participantsData) => {
                  // Process the checkout
                  console.log('Participants Data:', participantsData);
                  alert('Paiement simulé réussi!');
                  clearCart(); // Do not clear cart here, do it at the end after payment
                  setCheckoutStep('payment');
                  //setIsCheckoutOpen(false); // No longer used
                  //setActiveTab('home'); // Return to home after checkout
                }}
                setCheckoutStep={setCheckoutStep}
              />
            )}

            {checkoutStep === 'payment' && (
              <PaymentComponent setCheckoutStep={setCheckoutStep} />
            )}

            {checkoutStep === 'confirmation' && (
              <ConfirmationComponent />
            )}
        
      </main>

      <PasswordModal />
      <NotificationSettingsModal />
      <DeleteAccountModal />
       {memoizedCancelModal}
    </div>
  );
};

export default DashboardParticipant;