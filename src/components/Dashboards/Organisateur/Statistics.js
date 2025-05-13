import React, { useMemo } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { isThisWeek, isThisMonth, isThisQuarter, isThisYear } from './dashboardorganizer'; // Importer les fonctions utilitaires
import './dashboardorganizer.css';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = ({ events = [], participants = [], filters, setFilters, calculateStatistics }) => {
  // Calculer les statistiques
  const statistics = useMemo(() => calculateStatistics(events, participants), [events, participants]);

  // Filtrer les événements selon les filtres
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (filters.event !== 'all' && event.id.toString() !== filters.event) return false;
      const eventDate = new Date(event.rawDate);
      switch (filters.period) {
        case 'week':
          return isThisWeek(eventDate);
        case 'month':
          return isThisMonth(eventDate);
        case 'quarter':
          return isThisQuarter(eventDate);
        case 'year':
          return isThisYear(eventDate);
        case 'custom':
          if (filters.customStartDate && filters.customEndDate) {
            const start = new Date(filters.customStartDate);
            const end = new Date(filters.customEndDate);
            return eventDate >= start && eventDate <= end;
          }
          return true;
        default:
          return true;
      }
    });
  }, [events, filters]);

  // Vérifier si aucune donnée n'est disponible
  const hasData = events.length > 0 || participants.length > 0;

  // Données pour les graphiques
  const revenueByEventData = {
    labels: filteredEvents.map(e => e.title),
    datasets: [{
      label: 'Income (MAD)',
      data: filteredEvents.map(e => e.totalRevenue),
      backgroundColor: '#E91E63',
    }],
  };

  const ticketTypeData = {
    labels: ['VIP', 'Standard'],
    datasets: [{
      data: [
        filteredEvents.reduce((sum, e) => sum + e.tickets.filter(t => t.type === 'VIP').reduce((acc, t) => acc + t.sold, 0), 0),
        filteredEvents.reduce((sum, e) => sum + e.tickets.filter(t => t.type === 'Standard').reduce((acc, t) => acc + t.sold, 0), 0),
      ],
      backgroundColor: ['#E91E63', '#FFC107'],
    }],
  };

  const salesProgressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // À remplacer par des données réelles
    datasets: [{
      label: 'Sold Tickets',
      data: filteredEvents.map(e => e.tickets.reduce((acc, t) => acc + t.sold, 0)).slice(0, 4), // Exemple simplifié
      borderColor: '#E91E63',
      fill: false,
    }],
  };

  // Comparaison avec le mois précédent
  const revenueComparisonData = {
    labels: ['Current month', 'Previous month'],
    datasets: [{
      label: 'Income (MAD)',
      data: [
        filteredEvents.reduce((sum, e) => sum + e.totalRevenue, 0),
        filteredEvents.reduce((sum, e) => {
          const date = new Date(e.rawDate);
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          return isThisMonth(date, lastMonth) ? sum + e.totalRevenue : sum;
        }, 0),
      ],
      backgroundColor: ['#E91E63', '#FFC107'],
    }],
  };

  // Trouver l'événement le plus vendu
  const bestSeller = filteredEvents.reduce((best, event) => {
    const totalSold = event.tickets.reduce((acc, t) => acc + t.sold, 0);
    return !best || totalSold > best.totalSold ? { title: event.title, totalSold } : best;
  }, null);

  // Exporter en PDF
  const exportReportToPDF = async () => {
    const report = document.querySelector('.statistics-section');
    const canvas = await html2canvas(report);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('rapport_statistiques.pdf');
  };

  // Exporter en CSV
  const exportStatisticsToCSV = () => {
    const headers = ['Métrique', 'Valeur'];
    const rows = [
      ['Revenus totaux (MAD)', statistics.totalRevenue],
      ['Billets vendus', statistics.totalTicketsSold],
      ['Billets VIP vendus', statistics.vipTicketsSold],
      ['Billets Standard vendus', statistics.standardTicketsSold],
      ['Annulations', statistics.totalCancellations],
      ['Note moyenne', statistics.averageRating],
      ['Dépenses totales (MAD)', statistics.totalExpenses],
      ['Bénéfice total (MAD)', statistics.totalProfit],
      ['Meilleur événement', bestSeller ? bestSeller.title : 'N/A'],
      ['Billets vendus (meilleur)', bestSeller ? bestSeller.totalSold : 'N/A'],
    ].map(row => row.join(',')).join('\n');
    const csvContent = [headers.join(','), rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', 'statistiques.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="statistics-section">
      <div className="section-header">
        <h2>Statistics and reports</h2>
        <div className="header-actions">
          <select
            value={filters.period}
            onChange={(e) => setFilters({ ...filters, period: e.target.value })}
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
            <option value="custom">Custom</option>
          </select>
          {filters.period === 'custom' && (
            <>
              <input
                type="date"
                value={filters.customStartDate || ''}
                onChange={(e) => setFilters({ ...filters, customStartDate: e.target.value })}
              />
              <input
                type="date"
                value={filters.customEndDate || ''}
                onChange={(e) => setFilters({ ...filters, customEndDate: e.target.value })}
              />
            </>
          )}
          <select
            value={filters.event}
            onChange={(e) => setFilters({ ...filters, event: e.target.value })}
          >
            <option value="all">All events</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
          <button className="export-btn" onClick={exportReportToPDF}>
            <i className="fas fa-file-pdf"></i> Export PDF
          </button>
          <button className="export-btn" onClick={exportStatisticsToCSV}>
            <i className="fas fa-download"></i> Export CSV
          </button>
        </div>
      </div>
      <div className="statistics-grid">
        <div className="stat-card">
          <h3>Total Incomes</h3>
          <p>{statistics.totalRevenue.toLocaleString('fr-FR')} MAD</p>
        </div>
        <div className="stat-card">
          <h3>Tickets Sold</h3>
          <p>{statistics.totalTicketsSold}</p>
        </div>
        <div className="stat-card">
          <h3>VIP Tickets Sold</h3>
          <p>{statistics.vipTicketsSold}</p>
        </div>
        <div className="stat-card">
          <h3>Standard Tickets Sold</h3>
          <p>{statistics.standardTicketsSold}</p>
        </div>
        <div className="stat-card">
          <h3>Remaining Tickets</h3>
          <p>{filteredEvents.reduce((sum, e) => sum + e.tickets.reduce((acc, t) => acc + (t.quantity - t.sold), 0), 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Best Seller</h3>
          <p>{bestSeller ? bestSeller.title : 'N/A'}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p>{statistics.averageRating}/5</p>
        </div>
        <div className="stat-card">
          <h3>Total Profit</h3>
          <p>{statistics.totalProfit.toLocaleString('fr-FR')} MAD</p>
        </div>
      </div>
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Income per Event</h3>
          <Bar data={revenueByEventData} options={{ responsive: true }} />
        </div>
        <div className="chart-card">
          <h3>Distribution of Ticket Types</h3>
          <Doughnut data={ticketTypeData} options={{ responsive: true }} />
        </div>
        <div className="chart-card">
          <h3>Sales Progression</h3>
          <Line data={salesProgressData} options={{ responsive: true }} />
        </div>
        <div className="chart-card">
          <h3>Income Comparison</h3>
          <Bar data={revenueComparisonData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;