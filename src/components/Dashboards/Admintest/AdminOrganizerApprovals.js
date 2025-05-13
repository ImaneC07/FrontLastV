import React, { useState } from 'react';
import { organizerApprovals } from './adminData';
import './AdminOrganizerApprovals.css';

const AdminOrganizerApprovals = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDetails, setShowDetails] = useState(null);
  const [showActionModal, setShowActionModal] = useState(null);
  const [actionType, setActionType] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [toast, setToast] = useState(null);

  const filteredApprovals = organizerApprovals
    .filter(approval => filterStatus ? approval.status === filterStatus : true)
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
      setToast({ type: 'success', message: `Demande de ${showDetails.name} approuvée. Organisateur notifié.` });
    } else if (actionType === 'reject') {
      if (!rejectionReason) {
        setToast({ type: 'error', message: 'Veuillez indiquer une raison de rejet' });
        return;
      }
      setToast({ type: 'success', message: `Demande de ${showDetails.name} rejetée. Organisateur notifié.` });
    }
    setShowActionModal(null);
    setAdminPassword('');
    setConfirmChecked(false);
    setRejectionReason('');
    setTimeout(() => setToast(null), 3000);
  };

  const stats = {
    pending: organizerApprovals.filter(a => a.status === 'pending').length,
    approved: organizerApprovals.filter(a => a.status === 'approved').length,
    rejected: organizerApprovals.filter(a => a.status === 'rejected').length,
  };

  return (
    <div className="admin-organizer-approvals">
      <h2>Approbation des organisateurs</h2>

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
      </div>

      {/* Tableau */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('name')}>Nom {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('email')}>Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('submittedAt')}>Date de soumission {sortBy === 'submittedAt' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('status')}>Statut {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredApprovals.map(approval => (
              <tr key={approval.id} onClick={() => setShowDetails(approval)}>
                <td>{approval.id}</td>
                <td>{approval.name}</td>
                <td>{approval.email}</td>
                <td>{approval.submittedAt}</td>
                <td>{approval.status === 'pending' ? 'En attente' : approval.status === 'approved' ? 'Approuvé' : 'Rejeté'}</td>
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
              <h3>Détails de la demande de {showDetails.name}</h3>
              <button className="close-button" onClick={() => setShowDetails(null)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Email:</strong> {showDetails.email}</p>
              <p><strong>Contrat:</strong> {showDetails.contract}</p>
              <p><strong>Carte d’identité:</strong> {showDetails.idCard}</p>
              <p><strong>Portfolio:</strong> {showDetails.portfolio}</p>
              <p><strong>Statut:</strong> {showDetails.status === 'pending' ? 'En attente' : showDetails.status === 'approved' ? 'Approuvé' : 'Rejeté'}</p>
              <p><strong>Date de soumission:</strong> {showDetails.submittedAt}</p>
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
                <button
                  className="secondary-button"
                  onClick={() => {
                    setToast({ type: 'success', message: `Message envoyé à ${showDetails.email}` });
                    setTimeout(() => setToast(null), 3000);
                  }}
                >
                  Contacter
                </button>
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
                Vous allez {actionType === 'approve' ? 'approuver' : 'rejeter'} la demande de {showActionModal.name}.
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

export default AdminOrganizerApprovals;