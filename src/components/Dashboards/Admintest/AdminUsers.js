import React, { useState } from 'react';
import { users } from './adminData';
import './AdminUsers.css';

const AdminUsers = () => {
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDetails, setShowDetails] = useState(null);
  const [showActionModal, setShowActionModal] = useState(null);
  const [actionType, setActionType] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredUsers = users
    .filter(user => filterType ? user.type === filterType : true)
    .filter(user => filterStatus ? user.status === filterStatus : true)
    .filter(user => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valueA = a[sortBy] || '';
      const valueB = b[sortBy] || '';
      if (sortOrder === 'asc') {
        return valueA.localeCompare ? valueA.localeCompare(valueB) : valueA - valueB;
      }
      return valueB.localeCompare ? valueB.localeCompare(valueA) : valueB - valueA;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleAction = () => {
    if (adminPassword !== 'admin123' || !confirmChecked) {
      setToast({ type: 'error', message: 'Mot de passe incorrect ou confirmation manquante' });
      return;
    }
    if (actionType === 'delete') {
      // Simuler suppression
      setToast({ type: 'success', message: `Utilisateur ${showDetails.name} supprimé` });
    } else if (actionType === 'suspend') {
      // Simuler suspension
      setToast({ type: 'success', message: `Utilisateur ${showDetails.name} ${showDetails.status === 'active' ? 'suspendu' : 'activé'}` });
    } else if (actionType === 'reset-password') {
      setToast({ type: 'success', message: `Lien de réinitialisation envoyé à ${showDetails.email}` });
    }
    setShowActionModal(null);
    setAdminPassword('');
    setConfirmChecked(false);
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = () => {
    // Simuler modification
    setToast({ type: 'success', message: `Utilisateur ${editForm.name} modifié` });
    setEditForm(null);
    setShowDetails(null);
    setTimeout(() => setToast(null), 3000);
  };

  const stats = {
    total: users.length,
    organizers: users.filter(u => u.type === 'organizer').length,
    participants: users.filter(u => u.type === 'participant').length,
    active: users.filter(u => u.status === 'active').length,
  };

  return (
    <div className="admin-users">
      <h2>Utilisateurs</h2>

      {/* Statistiques */}
      <div className="stats-cards">
        <div className="summary-card">
          <h3>Total Utilisateurs</h3>
          <p>{stats.total}</p>
        </div>
        <div className="summary-card">
          <h3>Organisateurs</h3>
          <p>{stats.organizers}</p>
        </div>
        <div className="summary-card">
          <h3>Participants</h3>
          <p>{stats.participants}</p>
        </div>
        <div className="summary-card">
          <h3>Actifs</h3>
          <p>{stats.active}</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters">
        <div className="form-group">
          <label>Type</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Tous</option>
            <option value="organizer">Organisateur</option>
            <option value="participant">Participant</option>
          </select>
        </div>
        <div className="form-group">
          <label>Statut</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Tous</option>
            <option value="active">Actif</option>
            <option value="suspended">Suspendu</option>
            <option value="deleted">Supprimé</option>
          </select>
        </div>
        <div className="form-group">
          <label>Recherche</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom ou email"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('name')}>Nom {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('email')}>Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('type')}>Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('status')}>Statut {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('createdAt')}>Inscription {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('lastLogin')}>Dernière connexion {sortBy === 'lastLogin' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} onClick={() => setShowDetails(user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type === 'organizer' ? 'Organisateur' : 'Participant'}</td>
                <td>{user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'Supprimé'}</td>
                <td>{user.createdAt}</td>
                <td>{user.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale Détails */}
      {showDetails && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Détails de {showDetails.name}</h3>
              <button className="close-button" onClick={() => setShowDetails(null)}>×</button>
            </div>
            <div className="modal-body">
              {editForm ? (
                <form onSubmit={handleEdit}>
                  <div className="form-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Téléphone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Adresse</label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ville</label>
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pays</label>
                    <input
                      type="text"
                      value={editForm.country}
                      onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="secondary-button" onClick={() => setEditForm(null)}>Annuler</button>
                    <button type="submit" className="primary-button">Enregistrer</button>
                  </div>
                </form>
              ) : (
                <>
                  <p><strong>Email:</strong> {showDetails.email}</p>
                  <p><strong>Type:</strong> {showDetails.type === 'organizer' ? 'Organisateur' : 'Participant'}</p>
                  <p><strong>Statut:</strong> {showDetails.status === 'active' ? 'Actif' : showDetails.status === 'suspended' ? 'Suspendu' : 'Supprimé'}</p>
                  <p><strong>Téléphone:</strong> {showDetails.phone || 'Non défini'}</p>
                  <p><strong>Adresse:</strong> {showDetails.address || 'Non défini'}</p>
                  <p><strong>Ville:</strong> {showDetails.city || 'Non défini'}</p>
                  <p><strong>Pays:</strong> {showDetails.country || 'Non défini'}</p>
                  <p><strong>Inscription:</strong> {showDetails.createdAt}</p>
                  <p><strong>Dernière connexion:</strong> {showDetails.lastLogin}</p>
                  <h4>Historique</h4>
                  <p>Événements et transactions : En cours de développement</p>
                  <div className="modal-footer">
                    <button className="primary-button" onClick={() => setEditForm(showDetails)}>Modifier</button>
                    <button
                      className="secondary-button"
                      onClick={() => {
                        setActionType(showDetails.status === 'active' ? 'suspend' : 'activate');
                        setShowActionModal(showDetails);
                      }}
                    >
                      {showDetails.status === 'active' ? 'Suspendre' : 'Activer'}
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => {
                        setActionType('delete');
                        setShowActionModal(showDetails);
                      }}
                    >
                      Supprimer
                    </button>
                    <button
                      className="secondary-button"
                      onClick={() => {
                        setActionType('reset-password');
                        setShowActionModal(showDetails);
                      }}
                    >
                      Réinitialiser mot de passe
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modale Action */}
      {showActionModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirmer l’action</h3>
              <button className="close-button" onClick={() => setShowActionModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <p>
                Vous allez {actionType === 'delete' ? 'supprimer' : actionType === 'suspend' ? 'suspendre' : actionType === 'activate' ? 'activer' : 'réinitialiser le mot de passe de'} {showActionModal.name}.
              </p>
              <div className="form-group">
                <label>Mot de passe admin</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="admin123"
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={confirmChecked}
                    onChange={(e) => setConfirmChecked(e.target.checked)}
                  /> Je confirme
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={() => setShowActionModal(null)}>Annuler</button>
              <button className="primary-button" onClick={handleAction}>Confirmer</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;