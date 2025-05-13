export const users = [
  { id: 1, name: "John Doe", email: "john@example.com", type: "organizer", status: "active", createdAt: "2025-01-01", lastLogin: "2025-05-12", phone: "+33 123 456 789", address: "123 Rue Exemple", city: "Paris", country: "France" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", type: "participant", status: "active", createdAt: "2025-02-01", lastLogin: "2025-05-10", phone: "+33 987 654 321", address: "456 Avenue Test", city: "Lyon", country: "France" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", type: "organizer", status: "suspended", createdAt: "2025-03-01", lastLogin: "2025-04-01", phone: "", address: "", city: "", country: "" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", type: "participant", status: "active", createdAt: "2025-04-01", lastLogin: "2025-05-11", phone: "+33 111 222 333", address: "789 Boulevard Demo", city: "Marseille", country: "France" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", type: "organizer", status: "active", createdAt: "2025-05-01", lastLogin: "2025-05-12", phone: "+33 444 555 666", address: "101 Rue Sample", city: "Nice", country: "France" },
  { id: 6, name: "Emma Lee", email: "emma@example.com", type: "participant", status: "active", createdAt: "2025-01-15", lastLogin: "2025-05-09", phone: "+33 777 888 999", address: "202 Avenue Exemple", city: "Toulouse", country: "France" },
  { id: 7, name: "David Miller", email: "david@example.com", type: "organizer", status: "active", createdAt: "2025-02-15", lastLogin: "2025-05-08", phone: "+33 000 111 222", address: "303 Rue Test", city: "Bordeaux", country: "France" },
  { id: 8, name: "Sophie Clark", email: "sophie@example.com", type: "participant", status: "active", createdAt: "2025-03-15", lastLogin: "2025-05-07", phone: "+33 333 444 555", address: "404 Boulevard Sample", city: "Lille", country: "France" },
  { id: 9, name: "Tom Harris", email: "tom@example.com", type: "organizer", status: "suspended", createdAt: "2025-04-15", lastLogin: "2025-04-20", phone: "", address: "", city: "", country: "" },
  { id: 10, name: "Laura White", email: "laura@example.com", type: "participant", status: "active", createdAt: "2025-05-01", lastLogin: "2025-05-06", phone: "+33 666 777 888", address: "505 Avenue Demo", city: "Strasbourg", country: "France" },
];

export const events = [
  { id: 1, title: "Festival Jazz 2025", organizerId: 1, date: "2025-06-01", location: "Paris", status: "pending", submittedAt: "2025-05-01", description: "Un festival de jazz incroyable", category: "Musique", image: null, ticketPrice: 50 },
  { id: 2, title: "Concert Rock", organizerId: 1, date: "2025-07-01", location: "Lyon", status: "approved", submittedAt: "2025-04-15", description: "Rock toute la nuit", category: "Musique", image: null, ticketPrice: 30 },
  { id: 3, title: "Atelier Art", organizerId: 5, date: "2025-08-01", location: "Marseille", status: "rejected", submittedAt: "2025-05-10", rejectionReason: "Contenu inapproprié", description: "Atelier créatif", category: "Art", image: null, ticketPrice: 20 },
  { id: 4, title: "Conférence Tech", organizerId: 7, date: "2025-09-01", location: "Bordeaux", status: "pending", submittedAt: "2025-05-05", description: "Dernières innovations", category: "Technologie", image: null, ticketPrice: 100 },
  { id: 5, title: "Marathon 2025", organizerId: 7, date: "2025-10-01", location: "Nice", status: "approved", submittedAt: "2025-04-20", description: "Course pour tous", category: "Sport", image: null, ticketPrice: 40 },
];

export const organizerApprovals = [
  { id: 1, name: "John Doe", email: "john@example.com", submittedAt: "2025-05-01", status: "pending", contract: "Signed", idCard: "recto.jpg, verso.jpg", portfolio: "event1.com, event2.com" },
  { id: 2, name: "Bob Wilson", email: "bob@example.com", submittedAt: "2025-04-15", status: "approved", contract: "Signed", idCard: "recto.jpg, verso.jpg", portfolio: "event3.com" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", submittedAt: "2025-05-05", status: "pending", contract: "Signed", idCard: "recto.jpg, verso.jpg", portfolio: "event4.com" },
  { id: 4, name: "David Miller", email: "david@example.com", submittedAt: "2025-04-25", status: "rejected", contract: "Signed", idCard: "recto.jpg, verso.jpg", portfolio: "event5.com", rejectionReason: "Portfolio insuffisant" },
  { id: 5, name: "Tom Harris", email: "tom@example.com", submittedAt: "2025-04-10", status: "pending", contract: "Signed", idCard: "recto.jpg, verso.jpg", portfolio: "event6.com" },
];

export const refunds = [
  { id: 1, requesterId: 2, organizerId: 1, eventId: 1, amount: 150, reason: "Événement annulé", status: "pending", requestedAt: "2025-05-12" },
  { id: 2, requesterId: 4, organizerId: 1, eventId: 2, amount: 200, reason: "Non satisfait", status: "rejected", requestedAt: "2025-05-01", rejectionReason: "Hors délai", processedAt: "2025-05-02" },
  { id: 3, requesterId: 6, organizerId: 5, eventId: 3, amount: 100, reason: "Erreur de commande", status: "approved", requestedAt: "2025-05-05", processedAt: "2025-05-06" },
  { id: 4, requesterId: 8, organizerId: 7, eventId: 4, amount: 300, reason: "Événement reporté", status: "pending", requestedAt: "2025-05-10" },
  { id: 5, requesterId: 10, organizerId: 7, eventId: 5, amount: 120, reason: "Problème personnel", status: "rejected", requestedAt: "2025-05-03", rejectionReason: "Non remboursable", processedAt: "2025-05-04" },
];