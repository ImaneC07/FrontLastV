import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  // États pour la gestion des utilisateurs
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      type: "participant",
      status: "active",
      registrationDate: "2024-01-15",
      lastConnection: "2024-03-20",
      avatar: "https://i.pravatar.cc/150?img=1",
      history: [
    {
      date: "2024-03-15T14:30:00",
      description: "A réservé l'événement 'Concert Jazz'",
      icon: "calendar-check"
    },
    {
      date: "2024-02-28T10:15:00",
      description: "A donné un avis sur 'Festival Blues'",
      icon: "star"
    }
  ],
  transactions: [
    {
      id: "TX001",
      date: "2024-03-15",
      amount: 45.00,
      type: "Réservation",
      event: "Concert Jazz",
      status: "completed"
    },
    {
      id: "TX002",
      date: "2024-02-10",
      amount: 25.50,
      type: "Réservation",
      event: "Festival Blues",
      status: "refunded"
    }
  ]
    },
    {
      id: 2,
      name: "Jazz Productions",
      email: "contact@jazzproductions.com",
      type: "organizer",
      status: "active",
      registrationDate: "2024-01-10",
      lastConnection: "2024-03-21",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    // ... autres utilisateurs
  ]);

  // États pour les filtres et la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    sortBy: 'name'
  });

  // État pour le modal de détails
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeTab, setActiveTab] = useState('informations');
  const [userHistory, setUserHistory] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || user.type === filters.type;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Trier les utilisateurs
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.registrationDate) - new Date(a.registrationDate);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  // Gérer la suspension/activation d'un compte
 const handleStatusChange = () => {
  if (adminPassword === '12345678' && confirmDelete) { // Même validation que pour la suppression
    setUsers(users.map(user =>
      user.id === selectedUser.id ? { 
        ...user, 
        status: user.status === 'active' ? 'suspended' : 'active' 
      } : user
    ));
    setShowSuspendModal(false);
    setSelectedUser(null);
    setAdminPassword('');
    setConfirmDelete(false);
  } else {
    alert('Veuillez vérifier le mot de passe et la confirmation');
  }
};

  // Gérer la suppression d'un compte
  const handleDeleteUser = () => {
    if (adminPassword === '12345678' && confirmDelete) { // Remplacer par une vraie validation
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
      setAdminPassword('');
      setConfirmDelete(false);
    } else {
      alert('Veuillez vérifier le mot de passe et la confirmation');
    }
  };

  return (
    <div className="user-management">
      <div className="section-header">
        <h2>Gestion des Utilisateurs</h2>
        <div className="header-actions">
          <div className="search-filters">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filters">
              <select
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="all">Tous les types</option>
                <option value="participant">Participants</option>
                <option value="organizer">Organisateurs</option>
              </select>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="suspended">Suspendu</option>
                <option value="deleted">Supprimé</option>
              </select>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              >
                <option value="name">Trier par nom</option>
                <option value="date">Trier par date</option>
                <option value="status">Trier par statut</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Type</th>
              <th>Statut</th>
              <th>Date d'inscription</th>
              <th>Dernière connexion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="user-info">
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  <span 
                    className="user-name clickable"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserModal(true);
                    }}
                  >
                    {user.name}
                  </span>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`type-badge ${user.type}`}>
                    {user.type === 'participant' ? 'Participant' : 'Organisateur'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                <td>{new Date(user.lastConnection).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    className="action-button"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserModal(true);
                    }}
                    title="Voir les détails"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                         className="action-button"
                         onClick={() => {
                         setSelectedUser(user);
                         setShowSuspendModal(true);
                           }}
                         title={user.status === 'active' ? 'Suspendre' : 'Activer'}
                    >
                      <i className={`fas fa-${user.status === 'active' ? 'ban' : 'check'}`}></i>
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                    title="Supprimer"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de détails utilisateur */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content user-details-modal">
            <div className="modal-header">
              <h3>Détails de l'utilisateur</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-profile-header">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="user-avatar-large" />
                <div className="user-info-main">
                  <h4>{selectedUser.name}</h4>
                  <p>{selectedUser.email}</p>
                  <div className="user-badges">
                    <span className={`type-badge ${selectedUser.type}`}>
                      {selectedUser.type === 'participant' ? 'Participant' : 'Organisateur'}
                    </span>
                    <span className={`status-badge ${selectedUser.status}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="user-details-tabs">
                <button className={`tab-button ${activeTab === 'informations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('informations')}>Informations</button>
                <button className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}>Historique</button>
                <button className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('transactions')}>Transactions</button>
              </div>

              <div className="user-details-content">
                    {activeTab === 'informations' && (
                      <div className="details-section">
                           <h4>Informations personnelles</h4>
                         <div className="info-grid">
                           <div className="info-item">
                               <label>Date d'inscription</label>
                               <p>{new Date(selectedUser.registrationDate).toLocaleDateString()}</p>
                            </div>
                            <div className="info-item">
                                 <label>Dernière connexion</label>
                                 <p>{new Date(selectedUser.lastConnection).toLocaleDateString()}</p>
                            </div>
                                    {/* Autres informations */}
                          </div>
                      </div>
                   )}

                  {activeTab === 'history' && (
                       <div className="details-section">
                              <h4>Historique des activités</h4>
                          <div className="activities-list">
                               {selectedUser.history?.length > 0 ? (
                               selectedUser.history.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-icon">
                                      <i className={`fas fa-${activity.icon || 'check'}`}></i>
                               </div>
                               <div className="activity-details">
                                      <p>{activity.description}</p>
                                      <small>{new Date(activity.date).toLocaleString()}</small>
                               </div>
                            </div>
                                 ))
                            ) : (
                                       <p>Aucune activité récente</p>
                                 )}
                           </div>
  
                         </div>
                       )}

                  {activeTab === 'transactions' && (
                      <div className="details-section">
                             <h4>Transactions</h4>
                        <div className="transactions-table-container">
                            <table className="transactions-table">
                                <thead>
                                   <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Montant</th>
                                    <th>Type</th>
                                    <th>Événement</th>
                                    <th>Statut</th>
                                  </tr>
                                </thead>
                                <tbody>
                                     {selectedUser.transactions?.length > 0 ? (
                                       selectedUser.transactions.map(transaction => (
                                   <tr key={transaction.id}>
                                     <td>{transaction.id}</td>
                                     <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                     <td>{transaction.amount} MAD</td>
                                     <td>{transaction.type}</td>
                                     <td>{transaction.event || 'N/A'}</td>
                                     <td>
                                         <span className={`status-badge ${transaction.status}`}>
                                            {transaction.status}
                                         </span>
                                     </td>
                                   </tr>
                                   ))
                              ) : (
                                   <tr>
                                      <td colSpan="6">Aucune transaction trouvée</td>
                                   </tr>
                                 )}
                               </tbody>
                         </table>
                        </div>
                            </div>
                         )}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                }}
              >
                Fermer
              </button>
              <div className="action-buttons">
                <button
                  className={`status-button ${selectedUser.status === 'active' ? 'suspend' : 'activate'}`}
                  onClick={() => setShowSuspendModal(true)}
                >
                  {selectedUser.status === 'active' ? 'Suspendre' : 'Activer'}
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    setShowUserModal(false);
                    setShowDeleteModal(true);
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suppression */}
      {showDeleteModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>Confirmer la suppression</h3>
              <button 
                className="close-button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                  setAdminPassword('');
                  setConfirmDelete(false);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="warning-message">
                <i className="fas fa-exclamation-triangle"></i>
                <p>Êtes-vous sûr de vouloir supprimer le compte de <strong>{selectedUser.name}</strong> ?</p>
                <p>Cette action est irréversible.</p>
              </div>
              <div className="form-group">
                <label>Mot de passe administrateur</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.checked)}
                  />
                  Je confirme vouloir supprimer ce compte
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="secondary-button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                  setAdminPassword('');
                  setConfirmDelete(false);
                }}
              >
                Annuler
              </button>
              <button
                className="delete-button"
                onClick={handleDeleteUser}
                disabled={!adminPassword || !confirmDelete}
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suspension */}
{showSuspendModal && selectedUser && (
  <div className="modal-overlay">
    <div className="modal-content suspend-modal">
      <div className="modal-header">
        <h3>Confirmer la {selectedUser.status === 'active' ? 'suspension' : 'activation'}</h3>
        <button 
          className="close-button"
          onClick={() => {
            setShowSuspendModal(false);
            setSelectedUser(null);
            setAdminPassword('');
            setConfirmDelete(false);
          }}
        >
          ×
        </button>
      </div>
      <div className="modal-body">
        <div className="warning-message">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Êtes-vous sûr de vouloir {selectedUser.status === 'active' ? 'suspendre' : 'activer'} le compte de <strong>{selectedUser.name}</strong> ?</p>
          {selectedUser.status === 'active' && (
            <p>L'utilisateur ne pourra plus se connecter jusqu'à réactivation.</p>
          )}
        </div>
        <div className="form-group">
          <label>Mot de passe administrateur</label>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
            Je confirme vouloir {selectedUser.status === 'active' ? 'suspendre' : 'activer'} ce compte
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <button 
              className="secondary-button"
              onClick={() => {
                  setShowSuspendModal(false);
                  setSelectedUser(null);
                  setAdminPassword('');
                  setConfirmDelete(false);
             }}
              >
               Annuler
            </button>
            <button
            className={`status-button ${selectedUser.status === 'active' ? 'suspend' : 'activate'}`}
            onClick={handleStatusChange}
            disabled={!adminPassword || !confirmDelete}
          >
            Confirmer la {selectedUser.status === 'active' ? 'suspension' : 'activation'}
          </button>
       </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default UserManagement;