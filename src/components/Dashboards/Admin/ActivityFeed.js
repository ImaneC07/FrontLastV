import React, { useState } from 'react';
import './ActivityFeed.css';

const ActivityFeed = () => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    actor: 'all',
    actionType: 'all',
    customStartDate: '',
    customEndDate: '',
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Données simulées
  const activities = [
    {
      id: 1,
      actionType: 'event_created',
      actor: { type: 'organizer', id: 201, name: 'Jazz Productions', email: 'jazz@example.com' },
      details: { eventTitle: 'Festival Jazz 2025', eventId: 301 },
      timestamp: '2025-05-01T09:00:00Z',
    },
    {
      id: 2,
      actionType: 'payment',
      actor: { type: 'participant', id: 101, name: 'John Doe', email: 'john@example.com' },
      details: { eventTitle: 'Festival Jazz 2025', amount: 150, status: 'completed' },
      timestamp: '2025-05-01T10:30:00Z',
    },
    {
      id: 3,
      actionType: 'dispute_submitted',
      actor: { type: 'participant', id: 102, name: 'Jane Smith', email: 'jane@example.com' },
      details: { disputeId: 2, reason: 'Événement annulé sans remboursement' },
      timestamp: '2025-05-10T14:00:00Z',
    },
    {
      id: 4,
      actionType: 'dispute_resolved',
      actor: { type: 'admin', id: 1, name: 'Admin User', email: 'admin@example.com' },
      details: { disputeId: 3, resolution: 'Remboursement partiel accordé (50€)' },
      timestamp: '2025-05-07T16:00:00Z',
    },
    {
      id: 5,
      actionType: 'platform_payment',
      actor: { type: 'organizer', id: 202, name: 'Art Gallery', email: 'art@example.com' },
      details: { amount: 300, status: 'pending' },
      timestamp: '2025-05-12T11:00:00Z',
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

  // Filtrer les activités
  const filteredActivities = activities.filter(a => {
    const actionTypeMatch = filters.actionType === 'all' || a.actionType === filters.actionType;
    const actorMatch = filters.actor === 'all' || a.actor.type === filters.actor;
    const dateMatch = filterByDateRange(a.timestamp, filters.dateRange, filters.customStartDate, filters.customEndDate);
    return actionTypeMatch && actorMatch && dateMatch;
  });

  // Calcul des métriques
  const metrics = {
    todayCount: filteredActivities.filter(a => {
      const date = new Date(a.timestamp);
      const now = new Date();
      return date.toDateString() === now.toDateString();
    }).length,
    monthCount: filteredActivities.filter(a => {
      const date = new Date(a.timestamp);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    disputeCount: filteredActivities.filter(a => a.actionType.includes('dispute')).length,
    paymentCount: filteredActivities.filter(a => a.actionType.includes('payment')).length,
  };

  // Formatage des détails
  const formatDetails = (action) => {
    switch (action.actionType) {
      case 'event_created':
        return `Événement "${action.details.eventTitle}" (ID: ${action.details.eventId}) créé.`;
      case 'payment':
        return `Paiement de ${action.details.amount}€ pour "${action.details.eventTitle}" (${action.details.status}).`;
      case 'dispute_submitted':
        return `Litige #${action.details.disputeId} soumis : "${action.details.reason}".`;
      case 'dispute_resolved':
        return `Litige #${action.details.disputeId} résolu : "${action.details.resolution}".`;
      case 'platform_payment':
        return `Paiement plateforme de ${action.details.amount}€ (${action.details.status}).`;
      default:
        return 'Action inconnue.';
    }
  };

  return (
    <div className="activity-feed">

        <main className="content">
          <div className="section-header">
            <h2>Flux d’Activité</h2>
            <div className="filters">
              <select
                value={filters.dateRange}
                onChange={e => setFilters({ ...filters, dateRange: e.target.value })}
              >
                <option value="all">Toutes les dates</option>
                <option value="today">Aujourd’hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="custom">Période personnalisée</option>
              </select>
              <select
                value={filters.actor}
                onChange={e => setFilters({ ...filters, actor: e.target.value })}
              >
                <option value="all">Tous les acteurs</option>
                <option value="admin">Admin</option>
                <option value="organizer">Organisateur</option>
                <option value="participant">Participant</option>
              </select>
              <select
                value={filters.actionType}
                onChange={e => setFilters({ ...filters, actionType: e.target.value })}
              >
                <option value="all">Tous les types</option>
                <option value="event_created">Événement créé</option>
                <option value="payment">Paiement</option>
                <option value="dispute_submitted">Litige soumis</option>
                <option value="dispute_resolved">Litige résolu</option>
                <option value="platform_payment">Paiement plateforme</option>
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
                    { header: 'Date', accessor: item => new Date(item.timestamp).toLocaleString('fr-FR') },
                    { header: 'Acteur', accessor: item => `${item.actor.name} (${item.actor.type})` },
                    { header: 'Type d’action', accessor: item => item.actionType },
                    { header: 'Détails', accessor: item => formatDetails(item) },
                  ];
                  exportToCSV(filteredActivities, columns, 'activites.csv');
                }}
                disabled={isExporting}
              >
                <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
              </button>
            </div>
          </div>

          <div className="summary">
            <div className="summary-card">
              <h3>Actions Aujourd’hui</h3>
              <p className="amount">{metrics.todayCount}</p>
            </div>
            <div className="summary-card">
              <h3>Actions ce Mois</h3>
              <p className="amount">{metrics.monthCount}</p>
            </div>
            <div className="summary-card">
              <h3>Litiges</h3>
              <p className="amount">{metrics.disputeCount}</p>
            </div>
            <div className="summary-card">
              <h3>Paiements</h3>
              <p className="amount">{metrics.paymentCount}</p>
            </div>
          </div>

          <div className="table-container table-scrollable">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Acteur</th>
                  <th>Type d’action</th>
                  <th>Détails</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map(a => (
                  <tr key={a.id}>
                    <td>{new Date(a.timestamp).toLocaleString('fr-FR')}</td>
                    <td>
                      <div className="actor-info">
                        <span>{a.actor.name}</span>
                        <span className="email">{a.actor.email}</span>
                      </div>
                    </td>
                    <td>{a.actionType.replace('_', ' ')}</td>
                    <td>{formatDetails(a)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
   
  );
};

export default ActivityFeed;