import React, { useState } from 'react';
import './DisputeResolution.css';

const DisputeResolution = () => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    organizer: 'all',
    event: 'all',
    status: 'all',
    customStartDate: '',
    customEndDate: '',
  });
  const [isExporting, setIsExporting] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [adminComments, setAdminComments] = useState('');

  // Données simulées
  const disputes = [
    {
      id: 1,
      participant: { id: 101, name: 'John Doe', email: 'john@example.com' },
      organizer: { id: 201, name: 'Jazz Productions', email: 'jazz@example.com' },
      event: { id: 301, title: 'Festival Jazz 2025' },
      reason: 'Billet non livré après paiement',
      submissionDate: '2025-05-01',
      status: 'open',
      evidence: [
        { type: 'pdf', name: 'preuve_paiement.pdf', url: '/uploads/preuve_paiement.pdf' },
        { type: 'image', name: 'capture_ecran.jpg', url: '/uploads/capture_ecran.jpg' },
      ],
      resolution: null,
    },
    {
      id: 2,
      participant: { id: 102, name: 'Jane Smith', email: 'jane@example.com' },
      organizer: { id: 202, name: 'Art Gallery', email: 'art@example.com' },
      event: { id: 302, title: 'Exposition Art Moderne' },
      reason: 'Événement annulé sans remboursement',
      submissionDate: '2025-05-10',
      status: 'in_progress',
      evidence: [],
      resolution: null,
    },
    {
      id: 3,
      participant: { id: 103, name: 'Alice Brown', email: 'alice@example.com' },
      organizer: { id: 201, name: 'Jazz Productions', email: 'jazz@example.com' },
      event: { id: 301, title: 'Festival Jazz 2025' },
      reason: 'Mauvaise qualité de l’événement',
      submissionDate: '2025-05-05',
      status: 'resolved',
      evidence: [{ type: 'image', name: 'photo_event.jpg', url: '/Uploads/photo_event.jpg' }],
      resolution: {
        decision: 'Remboursement partiel accordé (50€)',
        date: '2025-05-07',
      },
    },
  ];

  // Fonction utilitaire pour filtrer par période
  const filterByDateRange = (itemDate, dateRange, customStartDate, customEndDate) => {
    const date = new Date(itemDate);
    const now = new Date();
    switch (dateRange) {
      case 'today':
        return date.toDateString() === now.toDateString();
      case 'week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return date >= startOfWeek;
      case 'month':
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      case 'custom':
        if (!customStartDate || !customEndDate) return true;
        const start = new Date(customStartDate);
        const end = new Date(customEndDate);
        return date >= start && date <= end;
      case 'all':
      default:
        return true;
    }
  };

  // Fonction pour exporter en CSV
  const exportToCSV = (data, columns, filename) => {
    setIsExporting(true);
    const headers = columns.map(col => col.header).join(',');
    const rows = data.map(item =>
      columns.map(col => `"${String(col.accessor(item)).replace(/"/g, '""')}"`).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    setTimeout(() => setIsExporting(false), 500);
  };

  // Filtrer les litiges
  const filteredDisputes = disputes.filter(d => {
    const statusMatch = filters.status === 'all' || d.status === filters.status;
    const organizerMatch = filters.organizer === 'all' || d.organizer.id.toString() === filters.organizer;
    const eventMatch = filters.event === 'all' || d.event.id.toString() === filters.event;
    const dateMatch = filterByDateRange(d.submissionDate, filters.dateRange, filters.customStartDate, filters.customEndDate);
    return statusMatch && organizerMatch && eventMatch && dateMatch;
  });

  // Calcul des métriques
  const metrics = {
    openCount: filteredDisputes.filter(d => d.status === 'open').length,
    inProgressCount: filteredDisputes.filter(d => d.status === 'in_progress').length,
    resolvedCount: filteredDisputes.filter(d => d.status === 'resolved').length,
    monthlyResolved: filteredDisputes
      .filter(d => {
        const date = new Date(d.submissionDate);
        const now = new Date();
        return d.status === 'resolved' && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      })
      .length,
  };

  // Gestion de la résolution
  const handleResolveDispute = (disputeId, resolution) => {
    const updatedDisputes = disputes.map(d =>
      d.id === disputeId ? { ...d, status: 'resolved', resolution: { decision: resolution, date: new Date().toISOString().split('T')[0] } } : d
    );
    // Simuler l'envoi d'email
    alert(`Notification envoyée à ${selectedDispute.participant.email} et ${selectedDispute.organizer.email} : Litige #${disputeId} résolu avec décision "${resolution}".`);
    setSelectedDispute({ ...selectedDispute, status: 'resolved', resolution: { decision: resolution, date: new Date().toISOString().split('T')[0] } });
    // Note : Dans un vrai système, mettez à jour l'état via setDisputes(updatedDisputes) et envoyez un email via une API.
    setAdminComments('');
  };

  // Composant principal
  return (
    <div className="dispute-resolution">
      <div className="section-header">
        <h2>Résolution des Litiges</h2>
        <div className="filters">
          <select
            value={filters.dateRange}
            onChange={e => setFilters({ ...filters, dateRange: e.target.value })}
          >
            <option value="all">Toutes les dates</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="custom">Période personnalisée</option>
          </select>
          <select
            value={filters.organizer}
            onChange={e => setFilters({ ...filters, organizer: e.target.value })}
          >
            <option value="all">Tous les organisateurs</option>
            {[...new Set(disputes.map(d => d.organizer.id))].map(id => (
              <option key={id} value={id}>
                {disputes.find(d => d.organizer.id === id).organizer.name}
              </option>
            ))}
          </select>
          <select
            value={filters.event}
            onChange={e => setFilters({ ...filters, event: e.target.value })}
          >
            <option value="all">Tous les événements</option>
            {[...new Set(disputes.map(d => d.event.id))].map(id => (
              <option key={id} value={id}>
                {disputes.find(d => d.event.id === id).event.title}
              </option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={e => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">Tous les statuts</option>
            <option value="open">Ouvert</option>
            <option value="in_progress">En cours</option>
            <option value="resolved">Résolu</option>
          </select>
          {filters.dateRange === 'custom' && (
            <div className="custom-date-range">
              <input
                type="date"
                value={filters.customStartDate}
                onChange={e => setFilters({ ...filters, customStartDate: e.target.value })}
              />
              <input
                type="date"
                value={filters.customEndDate}
                onChange={e => setFilters({ ...filters, customEndDate: e.target.value })}
              />
            </div>
          )}
          <button
            className="export-button"
            onClick={() => {
              const columns = [
                { header: 'ID', accessor: item => item.id },
                { header: 'Date Soumission', accessor: item => new Date(item.submissionDate).toLocaleDateString('fr-FR') },
                { header: 'Participant', accessor: item => item.participant.name },
                { header: 'Organisateur', accessor: item => item.organizer.name },
                { header: 'Événement', accessor: item => item.event.title },
                { header: 'Motif', accessor: item => item.reason },
                { header: 'Statut', accessor: item => item.status },
              ];
              exportToCSV(filteredDisputes, columns, 'litiges.csv');
            }}
            disabled={isExporting}
          >
            <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
          </button>
        </div>
      </div>

      <div className="summary">
        <div className="summary-card">
          <h3>Litiges Ouverts</h3>
          <p className="amount">{metrics.openCount}</p>
        </div>
        <div className="summary-card">
          <h3>Litiges en Cours</h3>
          <p className="amount">{metrics.inProgressCount}</p>
        </div>
        <div className="summary-card">
          <h3>Litiges Résolus</h3>
          <p className="amount">{metrics.resolvedCount}</p>
        </div>
        <div className="summary-card">
          <h3>Résolus ce Mois</h3>
          <p className="amount">{metrics.monthlyResolved}</p>
        </div>
      </div>

      <div className="table-container table-scrollable">
        <table className="disputes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date Soumission</th>
              <th>Participant</th>
              <th>Organisateur</th>
              <th>Événement</th>
              <th>Motif</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredDisputes.map(d => (
              <tr key={d.id}>
                <td
                  className="clickable"
                  onClick={() => {
                    setSelectedDispute(d);
                    setShowDetailsModal(true);
                    setAdminComments('');
                  }}
                >
                  {d.id}
                </td>
                <td>{new Date(d.submissionDate).toLocaleDateString('fr-FR')}</td>
                <td>
                  <div className="participant-info">
                    <span>{d.participant.name}</span>
                    <span className="email">{d.participant.email}</span>
                  </div>
                </td>
                <td>{d.organizer.name}</td>
                <td>{d.event.title}</td>
                <td>
                  <span className="reason-text" title={d.reason}>
                    {d.reason.length > 30 ? d.reason.substring(0, 30) + '...' : d.reason}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${d.status}`}>
                    {d.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal pour les détails du litige */}
      {showDetailsModal && selectedDispute && (
        <div className="modal-overlay">
          <div className="modal-content dispute-modal">
            <div className="modal-header">
              <h3><i className="fas fa-gavel"></i> Litige #{selectedDispute.id}</h3>
              <button
                className="close-button"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedDispute(null);
                  setAdminComments('');
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="dispute-details">
                <p><strong>Participant :</strong> {selectedDispute.participant.name} ({selectedDispute.participant.email})</p>
                <p><strong>Organisateur :</strong> {selectedDispute.organizer.name} ({selectedDispute.organizer.email})</p>
                <p><strong>Événement :</strong> {selectedDispute.event.title}</p>
                <p><strong>Motif :</strong> {selectedDispute.reason}</p>
                <p><strong>Date de soumission :</strong> {new Date(selectedDispute.submissionDate).toLocaleDateString('fr-FR')}</p>
                <p><strong>Statut :</strong> {selectedDispute.status.replace('_', ' ')}</p>
                {selectedDispute.evidence.length > 0 && (
                  <div className="evidence-section">
                    <strong>Preuves :</strong>
                    <ul>
                      {selectedDispute.evidence.map((e, index) => (
                        <li key={index}>
                          <a href={e.url} target="_blank" rel="noopener noreferrer">
                            {e.name} ({e.type})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedDispute.resolution && (
                  <div className="resolution-section">
                    <strong>Résolution :</strong>
                    <p>{selectedDispute.resolution.decision}</p>
                    <p><strong>Date :</strong> {new Date(selectedDispute.resolution.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                )}
              </div>
              {selectedDispute.status !== 'resolved' && (
                <div className="resolution-actions">
                  <label>Commentaires Admin / Décision</label>
                  <textarea
                    value={adminComments}
                    onChange={e => setAdminComments(e.target.value)}
                    placeholder="Entrez vos commentaires ou la décision de résolution..."
                    rows="4"
                  />
                  <button
                    className="resolve-button"
                    onClick={() => {
                      if (!adminComments.trim()) {
                        alert('Veuillez entrer une décision.');
                        return;
                      }
                      handleResolveDispute(selectedDispute.id, adminComments);
                    }}
                    disabled={!adminComments.trim()}
                  >
                    <i className="fas fa-check"></i> Résoudre et Notifier
                  </button>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedDispute(null);
                  setAdminComments('');
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeResolution;