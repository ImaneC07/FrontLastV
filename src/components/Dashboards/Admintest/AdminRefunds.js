import React, { useState } from 'react';
import { refunds, users, events } from './adminData';
import './AdminRefunds.css';

const AdminRefunds = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDetails, setShowDetails] = useState(null);
  const [showActionModal, setShowActionModal] = useState(null);
  const [actionType, setActionType] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [toast, setToast] = useState(null);

  const filteredRefunds = refunds
    .filter(refund => filterStatus ? refund.status === filterStatus : true)
    .filter(refund => filterEvent ? refund.eventId === parseInt(filterEvent) : true)
    .filter(refund => {
      const requester = users.find(u => u.id === refund.requesterId)?.name || '';
      return requester.toLowerCase().includes(search.toLowerCase());
    })
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
      setToast({ type: 'success', message: `Remboursement #${showDetails.id} approuvé. Demandeur et organisateur notifiés.` });
    } else if (actionType === 'reject') {
      if (!rejectionReason) {
        setToast({ type: 'error', message: 'Veuillez indiquer une raison de rejet' });
        return;
      }
      setToast({ type: 'success', message: `Remboursement #${showDetails.id} rejeté. Demandeur et organisateur notifiés.` });
    }
    setShowActionModal(null);
    setAdminPassword('');
    setConfirmChecked(false);
    setRejectionReason('');
    setTimeout(() => setToast(null), 3000);
  };

  const exportToCSV = () => {
    const headers = ['ID,Demandeur,Organisateur,Événement,Montant,Raison,Statut,Date de demande,Date de traitement,Raison du rejet'];
    const rows = filteredRefunds.map(refund => [
      refund.id,
      users.find(u => u.id === refund.requesterId)?.name || '',
      users.find(u => u.id === refund.organizerId)?.name || '',
      events.find(e => e.id === refund.eventId)?.title || '',
      refund.amount,
      refund.reason,
      refund.status,
      refund.requestedAt,
      refund.processedAt || '',
      refund.rejectionReason || '',
    ].map(val => `"${val}"`).join(','));
    const csvContent = [...headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'refunds.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ type: 'success', message: 'Exportation CSV réussie' });
    setTimeout(() => setToast(null), 3000);
  };

  const stats = {
    pending: refunds.filter(r => r.status === 'pending').length,
    approved: refunds.filter(r => r.status === 'approved').length,
    rejected: refunds.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="admin-refunds">
      <h2>Remboursements</h2>

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
          </select>
        </div>
        <div className="form-group">
          <label>Événement</label>
          <select value={filterEvent} onChange={(e) => setFilterEvent(e.target.value)}>
            <option value="">Tous</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Recherche</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom du demandeur"
          />
        </div>
        <button className="primary-button" onClick={exportToCSV}>
          Exporter CSV
        </button>
      </div>

      {/* Tableau */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th>Demandeur</th>
              <th>Organisateur</th>
              <th>Événement</th>
              <th onClick={() => handleSort('amount')}>Montant {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th>Raison</th>
              <th onClick={() => handleSort('status')}>Statut {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('requestedAt')}>Date de demande {sortBy === 'requestedAt' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.map(refund => (
              <tr key={refund.id} onClick={() => setShowDetails(refund)}>
                <td>{refund.id}</td>
                <td>{users.find(u => u.id === refund.requesterId)?.name}</td>
                <td>{users.find(u => u.id === refund.organizerId)?.name}</td>
                <td>{events.find(e => e.id === refund.eventId)?.title}</td>
                <td>{refund.amount} €</td>
                <td>{refund.reason}</td>
                <td>{refund.status === 'pending' ? 'En attente' : refund.status === 'approved' ? 'Approuvé' : 'Rejeté'}</td>
                <td>{refund.requestedAt}</td>
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
              <h3>Détails du remboursement #{showDetails.id}</h3>
              <button className="close-button" onClick={() => setShowDetails(null)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Demandeur:</strong> {users.find(u => u.id === showDetails.requesterId)?.name}</p>
              <p><strong>Organisateur:</strong> {users.find(u => u.id === showDetails.organizerId)?.name}</p>
              <p><strong>Événement:</strong> {events.find(e => e.id === showDetails.eventId)?.title}</p>
              <p><strong>Montant:</strong> {showDetails.amount} €</p>
              <p><strong>Raison:</strong> {showDetails.reason}</p>
              <p><strong>Statut:</strong> {showDetails.status === 'pending' ? 'En attente' : showDetails.status === 'approved' ? 'Approuvé' : 'Rejeté'}</p>
              <p><strong>Date de demande:</strong> {showDetails.requestedAt}</p>
              {showDetails.processedAt && <p><strong>Date de traitement:</strong> {showDetails.processedAt}</p>}
              {showDetails.rejectionReason && <p><strong>Raison du rejet:</strong> {showDetails.rejectionReason}</p>}
              <div className="modal-footer">
                {showDetails.status === 'pending' && (
                  <>
                    <button
                      className="primary-button"
                      onClick={() => {
                        setActionType('approve');
                        setShowActionModal(showDetails);
                      }}
                    >
                      Approuver
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => {
                        setActionType('reject');
                        setShowActionModal(showDetails);
                      }}
                    >
                      Rejeter
                    </button>
                  </>
                )}
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
                Vous allez {actionType === 'approve' ? 'approuver' : 'rejeter'} le remboursement #{showActionModal.id}.
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

export default AdminRefunds;