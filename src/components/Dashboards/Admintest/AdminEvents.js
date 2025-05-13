import React, { useState } from 'react';
import { events, users } from './adminData';
import './AdminEvents.css';

const AdminEvents = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterOrganizer, setFilterOrganizer] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDetails, setShowDetails] = useState(null);
  const [showActionModal, setShowActionModal] = useState(null);
  const [actionType, setActionType] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [editForm, setEditForm] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredEvents = events
    .filter(event => filterStatus ? event.status === filterStatus : true)
    .filter(event => filterOrganizer ? event.organizerId === parseInt(filterOrganizer) : true)
    .filter(event => event.title.toLowerCase().includes(search.toLowerCase()))
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
    if (actionType === 'approve') {
      setToast({ type: 'success', message: `Événement ${showDetails.title} approuvé et publié. Organisateur notifié.` });
    } else if (actionType === 'reject') {
      if (!rejectionReason) {
        setToast({ type: 'error', message: 'Veuillez indiquer une raison de rejet' });
        return;
      }
      setToast({ type: 'success', message: `Événement ${showDetails.title} rejeté. Organisateur notifié.` });
    } else if (actionType === 'delete') {
      setToast({ type: 'success', message: `Événement ${showDetails.title} supprimé. Organisateur notifié.` });
    }
    setShowActionModal(null);
    setAdminPassword('');
    setConfirmChecked(false);
    setRejectionReason('');
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = () => {
    setToast({ type: 'success', message: `Événement ${editForm.title} modifié. Organisateur notifié.` });
    setEditForm(null);
    setShowDetails(null);
    setTimeout(() => setToast(null), 3000);
  };

  const stats = {
    pending: events.filter(e => e.status === 'pending').length,
    approved: events.filter(e => e.status === 'approved').length,
    rejected: events.filter(e => e.status === 'rejected').length,
  };

  return (
    <div className="admin-events">
      <h2>Événements</h2>

      {/* Statistiques */}
      <div className="stats-cards">
        <div className="summary-card">
          <h3>En attente</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="summary-card">
          <h3>Approuvés</h3>
          <p>{stats.approved}</p>
        </div>
        <div className="summary-card">
          <h3>Rejetés</h3>
          <p>{stats.rejected}</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters">
        <div className="form-group">
          <label>Statut</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Tous</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
            <option value="deleted">Supprimé</option>
          </select>
        </div>
        <div className="form-group">
          <label>Organisateur</label>
          <select value={filterOrganizer} onChange={(e) => setFilterOrganizer(e.target.value)}>
            <option value="">Tous</option>
            {users.filter(u => u.type === 'organizer').map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Recherche</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Titre"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('title')}>Titre {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th>Organisateur</th>
              <th onClick={() => handleSort('date')}>Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('location')}>Lieu {sortBy === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('status')}>Statut {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('submittedAt')}>Soumission {sortBy === 'submittedAt' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map(event => (
              <tr key={event.id} onClick={() => setShowDetails(event)}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{users.find(u => u.id === event.organizerId)?.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>{event.status === 'pending' ? 'En attente' : event.status === 'approved' ? 'Approuvé' : event.status === 'rejected' ? 'Rejeté' : 'Supprimé'}</td>
                <td>{event.submittedAt}</td>
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
              <h3>Détails de {showDetails.title}</h3>
              <button className="close-button" onClick={() => setShowDetails(null)}>×</button>
            </div>
            <div className="modal-body">
              {editForm ? (
                <form onSubmit={handleEdit}>
                  <div className="form-group">
                    <label>Titre</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Lieu</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Catégorie</label>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Prix du billet</label>
                    <input
                      type="number"
                      value={editForm.ticketPrice}
                      onChange={(e) => setEditForm({ ...editForm, ticketPrice: e.target.value })}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="secondary-button" onClick={() => setEditForm(null)}>Annuler</button>
                    <button type="submit" className="primary-button">Enregistrer</button>
                  </div>
                </form>
              ) : (
                <>
                  <p><strong>Description:</strong> {showDetails.description}</p>
                  <p><strong>Date:</strong> {showDetails.date}</p>
                  <p><strong>Lieu:</strong> {showDetails.location}</p>
                  <p><strong>Organisateur:</strong> {users.find(u => u.id === showDetails.organizerId)?.name}</p>
                  <p><strong>Catégorie:</strong> {showDetails.category}</p>
                  <p><strong>Prix du billet:</strong> {showDetails.ticketPrice} €</p>
                  <p><strong>Statut:</strong> {showDetails.status === 'pending' ? 'En attente' : showDetails.status === 'approved' ? 'Approuvé' : showDetails.status === 'rejected' ? 'Rejeté' : 'Supprimé'}</p>
                  {showDetails.rejectionReason && <p><strong>Raison du rejet:</strong> {showDetails.rejectionReason}</p>}
                  <p><strong>Soumission:</strong> {showDetails.submittedAt}</p>
                  <button className="primary-button" onClick={() => setShowDetails({ ...showDetails, showPreview: true })}>
                    Prévisualiser
                  </button>
                  <div className="modal-footer">
                    {showDetails.status !== 'approved' && (
                      <button
                        className="primary-button"
                        onClick={() => {
                          setActionType('approve');
                          setShowActionModal(showDetails);
                        }}
                      >
                        Approuver
                      </button>
                    )}
                    {showDetails.status !== 'rejected' && (
                      <button
                        className="reject-button"
                        onClick={() => {
                          setActionType('reject');
                          setShowActionModal(showDetails);
                        }}
                      >
                        Rejeter
                      </button>
                    )}
                    {showDetails.status !== 'deleted' && (
                      <button
                        className="reject-button"
                        onClick={() => {
                          setActionType('delete');
                          setShowActionModal(showDetails);
                        }}
                      >
                        Supprimer
                      </button>
                    )}
                    <button className="primary-button" onClick={() => setEditForm(showDetails)}>Modifier</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modale Prévisualisation */}
      {showDetails?.showPreview && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Prévisualisation de {showDetails.title}</h3>
              <button className="close-button" onClick={() => setShowDetails({ ...showDetails, showPreview: false })}>×</button>
            </div>
            <div className="modal-body">
              <div className="event-preview">
                <h4>{showDetails.title}</h4>
                <p>{showDetails.description}</p>
                <p><strong>Date:</strong> {showDetails.date}</p>
                <p><strong>Lieu:</strong> {showDetails.location}</p>
                <p><strong>Prix:</strong> {showDetails.ticketPrice} €</p>
              </div>
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
                Vous allez {actionType === 'approve' ? 'approuver' : actionType === 'reject' ? 'rejeter' : 'supprimer'} l’événement {showActionModal.title}.
              </p>
              {actionType === 'reject' && (
                <div className="form-group">
                  <label>Raison du rejet</label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Indiquez la raison"
                  />
                </div>
              )}
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

export default AdminEvents;