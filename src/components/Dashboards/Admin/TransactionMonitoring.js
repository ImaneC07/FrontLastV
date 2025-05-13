import React, { useState } from 'react';
import './TransactionMonitoring.css';

const TransactionMonitoring = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    organizer: 'all',
    event: 'all',
    status: 'all',
    customStartDate: '',
    customEndDate: '',
  });
  const [isExporting, setIsExporting] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Données simulées
  const transactions = [
    {
      id: 1,
      participant: { id: 101, name: 'John Doe', email: 'john@example.com' },
      organizer: { id: 201, name: 'Jazz Productions', email: 'jazz@example.com' },
      event: { id: 301, title: 'Festival Jazz 2025' },
      amount: 150,
      status: 'completed',
      date: '2025-05-01',
      details: { completedAt: '2025-05-01T10:00:00Z' },
    },
    {
      id: 2,
      participant: { id: 102, name: 'Jane Smith', email: 'jane@example.com' },
      organizer: { id: 202, name: 'Art Gallery', email: 'art@example.com' },
      event: { id: 302, title: 'Exposition Art Moderne' },
      amount: 50,
      status: 'pending',
      date: '2025-05-10',
      details: { pendingSince: '2025-05-10T12:00:00Z' },
    },
    {
      id: 3,
      participant: { id: 103, name: 'Alice Brown', email: 'alice@example.com' },
      organizer: { id: 201, name: 'Jazz Productions', email: 'jazz@example.com' },
      event: { id: 301, title: 'Festival Jazz 2025' },
      amount: 100,
      status: 'failed',
      date: '2025-05-05',
      details: { reason: 'Paiement refusé par la banque' },
    },
  ];

  const refunds = [
    {
      id: 1,
      event: { id: 301, title: 'Festival Jazz 2025' },
      participant: { id: 101, name: 'John Doe', email: 'john@example.com' },
      amount: 150,
      status: 'approved',
      submissionDate: '2025-05-02',
      details: { approvedAt: '2025-05-03T14:00:00Z' },
    },
    {
      id: 2,
      event: { id: 302, title: 'Exposition Art Moderne' },
      participant: { id: 102, name: 'Jane Smith', email: 'jane@example.com' },
      amount: 50,
      status: 'pending',
      submissionDate: '2025-05-11',
      details: { pendingSince: '2025-05-11T09:00:00Z' },
    },
    {
      id: 3,
      event: { id: 301, title: 'Festival Jazz 2025' },
      participant: { id: 103, name: 'Alice Brown', email: 'alice@example.com' },
      amount: 100,
      status: 'refused',
      submissionDate: '2025-05-06',
      details: { reason: 'Demande non justifiée' },
    },
  ];

  const platformPayments = [
    {
      id: 1,
      organizer: { id: 201, name: 'Jazz Productions', email: 'jazz@example.com' },
      amount: 750,
      status: 'paid',
      date: '2025-05-05',
      details: { paidAt: '2025-05-05T16:00:00Z' },
    },
    {
      id: 2,
      organizer: { id: 202, name: 'Art Gallery', email: 'art@example.com' },
      amount: 300,
      status: 'pending',
      date: '2025-05-12',
      details: { pendingSince: '2025-05-12T10:00:00Z' },
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

  // Composant pour l'onglet Transactions
  const TransactionsTab = () => {
    const filteredTransactions = transactions.filter(t => {
      const statusMatch = filters.status === 'all' || t.status === filters.status;
      const organizerMatch = filters.organizer === 'all' || t.organizer.id.toString() === filters.organizer;
      const eventMatch = filters.event === 'all' || t.event.id.toString() === filters.event;
      const dateMatch = filterByDateRange(t.date, filters.dateRange, filters.customStartDate, filters.customEndDate);
      return statusMatch && organizerMatch && eventMatch && dateMatch;
    });

    const metrics = {
      totalAmount: filteredTransactions.reduce((sum, t) => sum + t.amount, 0),
      pendingCount: filteredTransactions.filter(t => t.status === 'pending').length,
      completedAmount: filteredTransactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0),
    };

    const handleExport = () => {
      const columns = [
        { header: 'ID', accessor: item => item.id },
        { header: 'Date', accessor: item => new Date(item.date).toLocaleDateString('fr-FR') },
        { header: 'Participant', accessor: item => item.participant.name },
        { header: 'Organisateur', accessor: item => item.organizer.name },
        { header: 'Événement', accessor: item => item.event.title },
        { header: 'Montant', accessor: item => `${item.amount}€` },
        { header: 'Statut', accessor: item => item.status },
      ];
      exportToCSV(filteredTransactions, columns, 'transactions.csv');
    };

    return (
      <div className="transactions-section">
        <div className="section-header">
          <h2>Transactions Participants-Organisateurs</h2>
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
              {[...new Set(transactions.map(t => t.organizer.id))].map(id => (
                <option key={id} value={id}>
                  {transactions.find(t => t.organizer.id === id).organizer.name}
                </option>
              ))}
            </select>
            <select
              value={filters.event}
              onChange={e => setFilters({ ...filters, event: e.target.value })}
            >
              <option value="all">Tous les événements</option>
              {[...new Set(transactions.map(t => t.event.id))].map(id => (
                <option key={id} value={id}>
                  {transactions.find(t => t.event.id === id).event.title}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Complété</option>
              <option value="pending">En attente</option>
              <option value="failed">Échoué</option>
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
              onClick={handleExport}
              disabled={isExporting}
            >
              <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
            </button>
          </div>
        </div>

        <div className="summary">
          <div className="summary-card">
            <h3>Total des Transactions</h3>
            <p className="amount">{metrics.totalAmount.toLocaleString('fr-FR')}€</p>
          </div>
          <div className="summary-card">
            <h3>Transactions en Attente</h3>
            <p className="amount">{metrics.pendingCount}</p>
          </div>
          <div className="summary-card">
            <h3>Montant Complété</h3>
            <p className="amount">{metrics.completedAmount.toLocaleString('fr-FR')}€</p>
          </div>
        </div>

        <div className="table-container table-scrollable">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Participant</th>
                <th>Organisateur</th>
                <th>Événement</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td
                    className="clickable"
                    onClick={() => {
                      setSelectedItem(t);
                      setShowDetailsModal(true);
                    }}
                  >
                    {t.id}
                  </td>
                  <td>{new Date(t.date).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <div className="participant-info">
                      <span>{t.participant.name}</span>
                      <span className="email">{t.participant.email}</span>
                    </div>
                  </td>
                  <td>{t.organizer.name}</td>
                  <td>{t.event.title}</td>
                  <td>{t.amount.toLocaleString('fr-FR')}€</td>
                  <td>
                    <span className={`status-badge ${t.status}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Composant pour l'onglet Remboursements
  const RefundsTab = () => {
    const filteredRefunds = refunds.filter(r => {
      const statusMatch = filters.status === 'all' || r.status === filters.status;
      const eventMatch = filters.event === 'all' || r.event.id.toString() === filters.event;
      const dateMatch = filterByDateRange(r.submissionDate, filters.dateRange, filters.customStartDate, filters.customEndDate);
      return statusMatch && eventMatch && dateMatch;
    });

    const metrics = {
      pendingCount: filteredRefunds.filter(r => r.status === 'pending').length,
      totalPendingAmount: filteredRefunds
        .filter(r => r.status === 'pending')
        .reduce((sum, r) => sum + r.amount, 0),
      approvedAmount: filteredRefunds
        .filter(r => r.status === 'approved')
        .reduce((sum, r) => sum + r.amount, 0),
    };

    const handleExport = () => {
      const columns = [
        { header: 'ID', accessor: item => item.id },
        { header: 'Date Soumission', accessor: item => new Date(item.submissionDate).toLocaleDateString('fr-FR') },
        { header: 'Participant', accessor: item => item.participant.name },
        { header: 'Événement', accessor: item => item.event.title },
        { header: 'Montant', accessor: item => `${item.amount}€` },
        { header: 'Statut', accessor: item => item.status },
      ];
      exportToCSV(filteredRefunds, columns, 'remboursements.csv');
    };

    return (
      <div className="refunds-section">
        <div className="section-header">
          <h2>Gestion des Remboursements</h2>
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
              value={filters.event}
              onChange={e => setFilters({ ...filters, event: e.target.value })}
            >
              <option value="all">Tous les événements</option>
              {[...new Set(refunds.map(r => r.event.id))].map(id => (
                <option key={id} value={id}>
                  {refunds.find(r => r.event.id === id).event.title}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">Tous les statuts</option>
              <option value="approved">Approuvé</option>
              <option value="pending">En attente</option>
              <option value="refused">Refusé</option>
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
              onClick={handleExport}
              disabled={isExporting}
            >
              <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
            </button>
          </div>
        </div>

        <div className="summary">
          <div className="summary-card">
            <h3>Remboursements en Attente</h3>
            <p className="amount">{metrics.pendingCount}</p>
          </div>
          <div className="summary-card">
            <h3>Montant en Attente</h3>
            <p className="amount">{metrics.totalPendingAmount.toLocaleString('fr-FR')}€</p>
          </div>
          <div className="summary-card">
            <h3>Montant Approuvé</h3>
            <p className="amount">{metrics.approvedAmount.toLocaleString('fr-FR')}€</p>
          </div>
        </div>

        <div className="table-container table-scrollable">
          <table className="refunds-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Soumission</th>
                <th>Participant</th>
                <th>Événement</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredRefunds.map(r => (
                <tr key={r.id}>
                  <td
                    className="clickable"
                    onClick={() => {
                      setSelectedItem(r);
                      setShowDetailsModal(true);
                    }}
                  >
                    {r.id}
                  </td>
                  <td>{new Date(r.submissionDate).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <div className="participant-info">
                      <span>{r.participant.name}</span>
                      <span className="email">{r.participant.email}</span>
                    </div>
                  </td>
                  <td>{r.event.title}</td>
                  <td>{r.amount.toLocaleString('fr-FR')}€</td>
                  <td>
                    <span className={`status-badge ${r.status}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Composant pour l'onglet Paiements Plateforme
  const PlatformPaymentsTab = () => {
    const filteredPayments = platformPayments.filter(p => {
      const statusMatch = filters.status === 'all' || p.status === filters.status;
      const organizerMatch = filters.organizer === 'all' || p.organizer.id.toString() === filters.organizer;
      const dateMatch = filterByDateRange(p.date, filters.dateRange, filters.customStartDate, filters.customEndDate);
      return statusMatch && organizerMatch && dateMatch;
    });

    const metrics = {
      totalAmount: filteredPayments.reduce((sum, p) => sum + p.amount, 0),
      pendingCount: filteredPayments.filter(p => p.status === 'pending').length,
      paidAmount: filteredPayments
        .filter(p => p.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0),
    };

    const handleExport = () => {
      const columns = [
        { header: 'ID', accessor: item => item.id },
        { header: 'Date', accessor: item => new Date(item.date).toLocaleDateString('fr-FR') },
        { header: 'Organisateur', accessor: item => item.organizer.name },
        { header: 'Montant', accessor: item => `${item.amount}€` },
        { header: 'Statut', accessor: item => item.status },
      ];
      exportToCSV(filteredPayments, columns, 'paiements-plateforme.csv');
    };

    return (
      <div className="platform-payments-section">
        <div className="section-header">
          <h2>Paiements Organisateurs-Plateforme</h2>
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
              {[...new Set(platformPayments.map(p => p.organizer.id))].map(id => (
                <option key={id} value={id}>
                  {platformPayments.find(p => p.organizer.id === id).organizer.name}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">Tous les statuts</option>
              <option value="paid">Payé</option>
              <option value="pending">En attente</option>
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
              onClick={handleExport}
              disabled={isExporting}
            >
              <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
            </button>
          </div>
        </div>

        <div className="summary">
          <div className="summary-card">
            <h3>Total des Paiements</h3>
            <p className="amount">{metrics.totalAmount.toLocaleString('fr-FR')}€</p>
          </div>
          <div className="summary-card">
            <h3>Paiements en Attente</h3>
            <p className="amount">{metrics.pendingCount}</p>
          </div>
          <div className="summary-card">
            <h3>Montant Payé</h3>
            <p className="amount">{metrics.paidAmount.toLocaleString('fr-FR')}€</p>
          </div>
        </div>

        <div className="table-container table-scrollable">
          <table className="platform-payments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Organisateur</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(p => (
                <tr key={p.id}>
                  <td
                    className="clickable"
                    onClick={() => {
                      setSelectedItem(p);
                      setShowDetailsModal(true);
                    }}
                  >
                    {p.id}
                  </td>
                  <td>{new Date(p.date).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <div className="participant-info">
                      <span>{p.organizer.name}</span>
                      <span className="email">{p.organizer.email}</span>
                    </div>
                  </td>
                  <td>{p.amount.toLocaleString('fr-FR')}€</td>
                  <td>
                    <span className={`status-badge ${p.status}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Modal pour les détails
  const DetailsModal = () => {
    if (!selectedItem) return null;

    const isTransaction = 'participant' in selectedItem;
    const isRefund = 'submissionDate' in selectedItem;
    const isPlatformPayment = !isTransaction && !isRefund;

    return (
      <div className="modal-overlay">
        <div className="modal-content details-modal">
          <div className="modal-header">
            <h3>
              <i className="fas fa-info-circle"></i> Détails {isTransaction ? 'Transaction' : isRefund ? 'Remboursement' : 'Paiement'} #{selectedItem.id}
            </h3>
            <button
              className="close-button"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedItem(null);
              }}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            {isTransaction && (
              <div className="details">
                <p><strong>Participant :</strong> {selectedItem.participant.name} ({selectedItem.participant.email})</p>
                <p><strong>Organisateur :</strong> {selectedItem.organizer.name}</p>
                <p><strong>Événement :</strong> {selectedItem.event.title}</p>
                <p><strong>Montant :</strong> {selectedItem.amount.toLocaleString('fr-FR')}€</p>
                <p><strong>Statut :</strong> {selectedItem.status}</p>
                <p><strong>Date :</strong> {new Date(selectedItem.date).toLocaleDateString('fr-FR')}</p>
                {selectedItem.status === 'completed' && (
                  <p><strong>Complété le :</strong> {new Date(selectedItem.details.completedAt).toLocaleString('fr-FR')}</p>
                )}
                {selectedItem.status === 'pending' && (
                  <p><strong>En attente depuis :</strong> {new Date(selectedItem.details.pendingSince).toLocaleString('fr-FR')}</p>
                )}
                {selectedItem.status === 'failed' && (
                  <p><strong>Raison de l'échec :</strong> {selectedItem.details.reason}</p>
                )}
              </div>
            )}
            {isRefund && (
              <div className="details">
                <p><strong>Participant :</strong> {selectedItem.participant.name} ({selectedItem.participant.email})</p>
                <p><strong>Événement :</strong> {selectedItem.event.title}</p>
                <p><strong>Montant :</strong> {selectedItem.amount.toLocaleString('fr-FR')}€</p>
                <p><strong>Statut :</strong> {selectedItem.status}</p>
                <p><strong>Date de soumission :</strong> {new Date(selectedItem.submissionDate).toLocaleDateString('fr-FR')}</p>
                {selectedItem.status === 'approved' && (
                  <p><strong>Approuvé le :</strong> {new Date(selectedItem.details.approvedAt).toLocaleString('fr-FR')}</p>
                )}
                {selectedItem.status === 'pending' && (
                  <p><strong>En attente depuis :</strong> {new Date(selectedItem.details.pendingSince).toLocaleString('fr-FR')}</p>
                )}
                {selectedItem.status === 'refused' && (
                  <p><strong>Raison du refus :</strong> {selectedItem.details.reason}</p>
                )}
              </div>
            )}
            {isPlatformPayment && (
              <div className="details">
                <p><strong>Organisateur :</strong> {selectedItem.organizer.name} ({selectedItem.organizer.email})</p>
                <p><strong>Montant :</strong> {selectedItem.amount.toLocaleString('fr-FR')}€</p>
                <p><strong>Statut :</strong> {selectedItem.status}</p>
                <p><strong>Date :</strong> {new Date(selectedItem.date).toLocaleDateString('fr-FR')}</p>
                {selectedItem.status === 'paid' && (
                  <p><strong>Payé le :</strong> {new Date(selectedItem.details.paidAt).toLocaleString('fr-FR')}</p>
                )}
                {selectedItem.status === 'pending' && (
                  <p><strong>En attente depuis :</strong> {new Date(selectedItem.details.pendingSince).toLocaleString('fr-FR')}</p>
                )}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="secondary-button"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedItem(null);
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="transaction-monitoring">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`tab-button ${activeTab === 'refunds' ? 'active' : ''}`}
          onClick={() => setActiveTab('refunds')}
        >
          Remboursements
        </button>
        <button
          className={`tab-button ${activeTab === 'platform-payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('platform-payments')}
        >
          Paiements Plateforme
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'transactions' && <TransactionsTab />}
        {activeTab === 'refunds' && <RefundsTab />}
        {activeTab === 'platform-payments' && <PlatformPaymentsTab />}
      </div>

      {showDetailsModal && <DetailsModal />}
    </div>
  );
};

export default TransactionMonitoring;