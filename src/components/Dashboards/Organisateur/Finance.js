import React, { useState } from 'react';
import './Finance.css';

const Finance = () => {
  const [activeTab, setActiveTab] = useState('payments');
  const [filters, setFilters] = useState({
    dateRange: 'all',
    eventId: 'all',
    status: 'all',
    customStartDate: '',
    customEndDate: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  // États pour les données
  const [payments, setPayments] = useState([
    {
      id: 1,
      eventId: 1,
      eventTitle: "Festival Jazz 2025",
      participantName: "John Doe",
      participantEmail: "john@example.com",
      amount: 150,
      platformFee: 7.50,
      netAmount: 142.50,
      date: "2025-05-12",
      status: "completed"
    },
    {
      id: 2,
      eventId: 1,
      eventTitle: "Festival Jazz 2025",
      participantName: "Alice Brown",
      participantEmail: "alice@example.com",
      amount: 200,
      platformFee: 10.00,
      netAmount: 190.00,
      date: "2025-05-10",
      status: "pending"
    },
    {
      id: 3,
      eventId: 1,
      eventTitle: "Festival Jazz 2025",
      participantName: "Bob Wilson",
      participantEmail: "bob@example.com",
      amount: 100,
      platformFee: 5.00,
      netAmount: 95.00,
      date: "2025-04-01",
      status: "completed"
    },
  ]);

  const [refunds, setRefunds] = useState([
    {
      id: 1,
      eventId: 1,
      eventTitle: "Festival Jazz 2025",
      participantName: "Jane Smith",
      participantEmail: "jane@example.com",
      amount: 150,
      refundAmount: 150,
      bookingDate: "2025-03-01",
      cancellationDate: "2025-05-12",
      reason: "Personal emergency",
      status: "pending"
    },
    {
      id: 2,
      eventId: 1,
      eventTitle: "Festival Jazz 2025",
      participantName: "Tom Clark",
      participantEmail: "tom@example.com",
      amount: 200,
      refundAmount: 200,
      bookingDate: "2025-03-01",
      cancellationDate: "2025-05-01",
      reason: "Event cancelled",
      status: "processed"
    },
  ]);

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      period: "Mars 2025",
      totalSales: 15000,
      platformFee: 750,
      dueAmount: 750,
      dueDate: "2025-04-15",
      status: "unpaid"
    },
    {
      id: 2,
      period: "Avril 2025",
      totalSales: 20000,
      platformFee: 1000,
      dueAmount: 1000,
      dueDate: "2025-05-15",
      status: "paid"
    },
  ]);

  // Calcul des métriques pour les remboursements
  const refundMetrics = {
    pendingCount: refunds.filter(r => r.status === 'pending').length,
    totalPendingAmount: refunds
      .filter(r => r.status === 'pending')
      .reduce((sum, r) => sum + r.refundAmount, 0),
    monthlyAmount: refunds
      .filter(r => {
        const cancelDate = new Date(r.cancellationDate);
        const now = new Date();
        return cancelDate.getMonth() === now.getMonth() && cancelDate.getFullYear() === now.getFullYear();
      })
      .reduce((sum, r) => sum + r.refundAmount, 0),
  };

  // Fonction utilitaire pour filtrer par période
  const filterByDateRange = (itemDate, dateRange, customStartDate, customEndDate) => {
    const date = new Date(itemDate);
    const now = new Date();
    
    switch (dateRange) {
      case 'today':
        return date.toDateString() === now.toDateString();
      case 'week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        return date >= startOfWeek && date <= endOfWeek;
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
      columns.map(col => {
        const value = col.accessor(item);
        return `"${String(value).replace(/"/g, '""')}"`; // Échapper les guillemets
      }).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    setTimeout(() => setIsExporting(false), 500); // Simuler un délai
  };

  // Composant pour l'onglet Paiements
  const PaymentsTab = () => {
    const filteredPayments = payments.filter(payment => {
      const statusMatch = filters.status === 'all' || payment.status === filters.status;
      const dateMatch = filterByDateRange(payment.date, filters.dateRange, filters.customStartDate, filters.customEndDate);
      return statusMatch && dateMatch;
    });

    const handleExportPayments = () => {
      const columns = [
        { header: 'Date', accessor: item => new Date(item.date).toLocaleDateString('fr-FR') },
        { header: 'Événement', accessor: item => item.eventTitle },
        { header: 'Participant', accessor: item => item.participantName },
        { header: 'Email', accessor: item => item.participantEmail },
        { header: 'Montant', accessor: item => `${item.amount.toLocaleString('fr-FR')}MAD` },
        { header: 'Statut', accessor: item => item.status },
      ];
      exportToCSV(filteredPayments, columns, 'paiements.csv');
    };

    return (
      <div className="payments-section">
        <div className="section-header">
          <h2>Paiements reçus</h2>
          <div className="filters">
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="custom">Période personnalisée</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Complétés</option>
              <option value="pending">En attente</option>
            </select>
            {filters.dateRange === 'custom' && (
              <div className="custom-date-range">
                <input
                  type="date"
                  value={filters.customStartDate}
                  onChange={(e) => setFilters({...filters, customStartDate: e.target.value})}
                />
                <input
                  type="date"
                  value={filters.customEndDate}
                  onChange={(e) => setFilters({...filters, customEndDate: e.target.value})}
                />
              </div>
            )}
            <button
              className="export-button"
              onClick={handleExportPayments}
              disabled={isExporting}
            >
              <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
            </button>
          </div>
        </div>

        <div className="payments-summary">
          <div className="summary-card">
            <h3>Total des ventes</h3>
            <p className="amount">{filteredPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString('fr-FR')}MAD</p>
            <span className="trend positive">+12.5% ce mois</span>
          </div>
          <div className="summary-card">
            <h3>Frais de plateforme</h3>
            <p className="amount">{filteredPayments.reduce((sum, p) => sum + p.platformFee, 0).toLocaleString('fr-FR')}MAD</p>
            <span className="percentage">5% des ventes</span>
          </div>
          <div className="summary-card">
            <h3>Montant net</h3>
            <p className="amount">{filteredPayments.reduce((sum, p) => sum + p.netAmount, 0).toLocaleString('fr-FR')}MAD</p>
          </div>
        </div>

        <div className="table-container table-scrollable">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Événement</th>
                <th>Participant</th>
                <th>Email</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td>{new Date(payment.date).toLocaleDateString('fr-FR')}</td>
                  <td>{payment.eventTitle}</td>
                  <td>{payment.participantName}</td>
                  <td>{payment.participantEmail}</td>
                  <td>{payment.amount.toLocaleString('fr-FR')}MAD</td>
                  <td>
                    <span className={`status-badge ${payment.status}`}>
                      {payment.status}
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
    const [selectedRefund, setSelectedRefund] = useState(null);
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [rejectionError, setRejectionError] = useState('');

    const filteredRefunds = refunds.filter(refund => {
      const statusMatch = filters.status === 'all' || refund.status === filters.status;
      const dateMatch = filterByDateRange(refund.cancellationDate, filters.dateRange, filters.customStartDate, filters.customEndDate);
      return statusMatch && dateMatch;
    });

    const handleExportRefunds = () => {
      const columns = [
        { header: 'Date demande', accessor: item => new Date(item.cancellationDate).toLocaleDateString('fr-FR') },
        { header: 'Événement', accessor: item => item.eventTitle },
        { header: 'Participant', accessor: item => item.participantName },
        { header: 'Email', accessor: item => item.participantEmail },
        { header: 'Montant', accessor: item => `${item.refundAmount.toLocaleString('fr-FR')}MAD` },
        { header: 'Raison', accessor: item => item.reason },
        { header: 'Statut', accessor: item => item.status },
      ];
      exportToCSV(filteredRefunds, columns, 'remboursements.csv');
    };

    const handleApproveRefund = (refundId) => {
      setRefunds(refunds.map(refund =>
        refund.id === refundId ? { ...refund, status: 'processed' } : refund
      ));
      setShowRefundModal(false);
      setSelectedRefund(null);
    };

    const handleRejectRefund = (refundId) => {
      if (!rejectionReason.trim()) {
        setRejectionError('Veuillez fournir un motif de rejet.');
        return;
      }
      setRefunds(refunds.map(refund =>
        refund.id === refundId ? { ...refund, status: 'rejected', rejectionReason } : refund
      ));
      setShowRefundModal(false);
      setSelectedRefund(null);
      setRejectionReason('');
      setRejectionError('');
    };

    return (
      <div className="refunds-section">
        <div className="section-header">
          <h2>Gestion des Remboursements</h2>
          <div className="filters">
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            >
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="custom">Période personnalisée</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="processed">Traités</option>
              <option value="rejected">Rejetés</option>
            </select>
            {filters.dateRange === 'custom' && (
              <div className="custom-date-range">
                <input
                  type="date"
                  value={filters.customStartDate}
                  onChange={(e) => setFilters({...filters, customStartDate: e.target.value})}
                />
                <input
                  type="date"
                  value={filters.customEndDate}
                  onChange={(e) => setFilters({...filters, customEndDate: e.target.value})}
                />
              </div>
            )}
            <button
              className="export-button"
              onClick={handleExportRefunds}
              disabled={isExporting}
            >
              <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
            </button>
          </div>
        </div>

        <div className="refunds-summary">
          <div className="summary-card">
            <h3>Remboursements en attente</h3>
            <p className="amount">{refundMetrics.pendingCount}</p>
          </div>
          <div className="summary-card">
            <h3>Montant total à rembourser</h3>
            <p className="amount">{refundMetrics.totalPendingAmount.toLocaleString('fr-FR')}MAD</p>
          </div>
          <div className="summary-card">
            <h3>Remboursements du mois</h3>
            <p className="amount">{refundMetrics.monthlyAmount.toLocaleString('fr-FR')}MAD</p>
          </div>
        </div>

        <div className="table-container table-scrollable">
          <table className="refunds-table">
            <thead>
              <tr>
                <th>Date demande</th>
                <th>Événement</th>
                <th>Participant</th>
                <th>Montant</th>
                <th>Raison</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRefunds.map(refund => (
                <tr key={refund.id}>
                  <td>{new Date(refund.cancellationDate).toLocaleDateString('fr-FR')}</td>
                  <td>{refund.eventTitle}</td>
                  <td>
                    <div className="participant-info">
                      <span>{refund.participantName}</span>
                      <span className="email">{refund.participantEmail}</span>
                    </div>
                  </td>
                  <td>{refund.refundAmount.toLocaleString('fr-FR')}MAD</td>
                  <td>
                    <span className="reason-text" title={refund.reason}>
                      {refund.reason.length > 30 
                        ? refund.reason.substring(0, 30) + '...' 
                        : refund.reason}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${refund.status}`}>
                      {refund.status}
                    </span>
                  </td>
                  <td>
                    {refund.status === 'pending' && (
                      <div className="action-buttons">
                        <button 
                          className="process-button"
                          onClick={() => {
                            setSelectedRefund(refund);
                            setShowRefundModal(true);
                          }}
                        >
                          Traiter
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de traitement des remboursements */}
        {showRefundModal && selectedRefund && (
          <div className="modal-overlay">
            <div className="modal-content refund-modal">
              <div className="modal-header">
                <h3><i className="fas fa-undo"></i> Traiter le remboursement</h3>
                <button 
                  className="close-button"
                  onClick={() => {
                    setShowRefundModal(false);
                    setSelectedRefund(null);
                    setRejectionReason('');
                    setRejectionError('');
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="refund-details">
                  <p><strong>Participant :</strong> {selectedRefund.participantName}</p>
                  <p><strong>Event :</strong> {selectedRefund.eventTitle}</p>
                  <p><strong>Amount :</strong> {selectedRefund.refundAmount.toLocaleString('fr-FR')}MAD</p>
                  <p><strong>Reason :</strong> {selectedRefund.reason}</p>
                  <p><strong>Booking Date :</strong> {new Date(selectedRefund.bookingDate).toLocaleDateString('fr-FR')}</p>
                  <p><strong>Cancellation Date :</strong> {new Date(selectedRefund.cancellationDate).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="refund-actions">
                  <button 
                    className="approve-button"
                    onClick={() => handleApproveRefund(selectedRefund.id)}
                  >
                    <i className="fas fa-check"></i> Approuver et rembourser
                  </button>
                  <div className="reject-section">
                    <label>Reason for rejection (if applicable)</label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Entrez le motif de rejet..."
                      rows="3"
                    />
                    {rejectionError && <p className="error-text">{rejectionError}</p>}
                    <button 
                      className="reject-button"
                      onClick={() => handleRejectRefund(selectedRefund.id)}
                    >
                      <i className="fas fa-times"></i> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Composant pour l'onglet Factures
  const InvoicesTab = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardInfo, setCardInfo] = useState({
      number: '',
      name: '',
      expiry: '',
      cvv: ''
    });

    const filteredInvoices = invoices.filter(invoice => {
      const statusMatch = filters.status === 'all' || invoice.status === filters.status;
      return statusMatch;
    });

    const handleExportInvoices = () => {
      const columns = [
        { header: 'Période', accessor: item => item.period },
        { header: 'Ventes totales', accessor: item => `${item.totalSales.toLocaleString('fr-FR')}MAD` },
        { header: 'Frais plateforme', accessor: item => `${item.platformFee.toLocaleString('fr-FR')}MAD` },
        { header: 'Montant dû', accessor: item => `${item.dueAmount.toLocaleString('fr-FR')}MAD` },
        { header: 'Date limite', accessor: item => new Date(item.dueDate).toLocaleDateString('fr-FR') },
        { header: 'Statut', accessor: item => item.status },
      ];
      exportToCSV(filteredInvoices, columns, 'factures.csv');
    };

    return (
      <div className="invoices-section">
        <div className="section-header">
          <h2>Invoices</h2>
          <div className="filters">
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All status</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="overdue">Overdue</option>
            </select>
            <button
              className="export-button"
              onClick={handleExportInvoices}
              disabled={isExporting}
            >
              <i className="fas fa-download"></i> {isExporting ? 'Exportation...' : 'Exporter'}
            </button>
          </div>
        </div>

        <div className="invoices-summary">
          <div className="summary-card">
            <h3>Pending invoices</h3>
            <p className="amount">{invoices.filter(i => i.status === 'unpaid').length}</p>
          </div>
          <div className="summary-card warning">
            <h3>Amount owed</h3>
            <p className="amount">{invoices.filter(i => i.status === 'unpaid').reduce((sum, i) => sum + i.dueAmount, 0).toLocaleString('fr-FR')}MAD</p>
          </div>
          <div className="summary-card">
            <h3>Total paid</h3>
            <p className="amount">{invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.dueAmount, 0).toLocaleString('fr-FR')}MAD</p>
          </div>
        </div>

        <div className="table-container table-scrollable">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Total sales</th>
                <th>Platform fees</th>
                <th>Amount owed</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.period}</td>
                  <td>{invoice.totalSales.toLocaleString('fr-FR')}MAD</td>
                  <td>{invoice.platformFee.toLocaleString('fr-FR')}MAD</td>
                  <td>{invoice.dueAmount.toLocaleString('fr-FR')}MAD</td>
                  <td>{new Date(invoice.dueDate).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <span className={`status-badge ${invoice.status}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    {invoice.status === 'unpaid' && (
                      <button 
                        className="pay-button"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowPaymentModal(true);
                        }}
                      >
                        Payer
                      </button>
                    )}
                    <button className="download-button">
                      <i className="fas fa-download"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de paiement */}
        {showPaymentModal && selectedInvoice && (
          <div className="modal-overlay">
            <div className="modal-content payment-modal">
              <div className="modal-header">
                <h3>Pay the invoice</h3>
                <button 
                  className="close-button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedInvoice(null);
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="invoice-summary">
                  <p><strong>Period:</strong> {selectedInvoice.period}</p>
                  <p><strong>Amount:</strong> {selectedInvoice.dueAmount.toLocaleString('fr-FR')}MAD</p>
                </div>
                <div className="payment-methods">
                  <div className="method-selection">
                    <button
                      className={`method-button ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <i className="fas fa-credit-card"></i> Credit card
                    </button>
                    <button
                      className={`method-button ${paymentMethod === 'bank' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <i className="fas fa-university"></i> Bank transfer
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="card-payment-form">
                      <div className="form-group">
                        <label>Card number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Name on card</label>
                        <input
                          type="text"
                          placeholder="JOHN DOE"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiration date</label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="bank-transfer-info">
                      <h4>Bank transfer information</h4>
                      <p><strong>IBAN:</strong> FR76 1234 5678 9012 3456 7890 123</p>
                      <p><strong>BIC:</strong> ABCDEFGHIJK</p>
                      <p><strong>Reference:</strong> INVOICE-{selectedInvoice.id}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="secondary-button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedInvoice(null);
                  }}
                >
                  Annuler
                </button>
                {paymentMethod === 'card' && (
                  <button 
                    className="primary-button"
                    onClick={() => {
                      setShowPaymentModal(false);
                      setSelectedInvoice(null);
                    }}
                  >
                    Pay {selectedInvoice.dueAmount.toLocaleString('fr-FR')}MAD
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="finance-page">
      <div className="finance-tabs">
        <button
          className={`tab-button ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
        <button
          className={`tab-button ${activeTab === 'refunds' ? 'active' : ''}`}
          onClick={() => setActiveTab('refunds')}
        >
          Refunds
        </button>
        <button
          className={`tab-button ${activeTab === 'invoices' ? 'active' : ''}`}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'payments' && <PaymentsTab />}
        {activeTab === 'refunds' && <RefundsTab />}
        {activeTab === 'invoices' && <InvoicesTab />}
      </div>
    </div>
  );
};

export default Finance;