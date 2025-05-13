import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';
import AdminUsers from './AdminUsers';
import AdminEvents from './AdminEvents';
import AdminOrganizerApprovals from './AdminOrganizerApprovals';
import AdminRefunds from './AdminRefunds';

const DashboardAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const notifications = [
    { id: 1, message: "Événement #1 en attente d’approbation", date: "2025-05-12" },
    { id: 2, message: "Demande de remboursement #1 en attente", date: "2025-05-12" },
    { id: 3, message: "Nouvelle demande d’approbation d’organisateur", date: "2025-05-11" },
  ];

  return (
    <div className="dashboard-admin">
      {/* Header */}
      <div className="header">
        <h1>Tableau de bord Admin</h1>
        <div className="header-actions">
          <div className="notifications" onClick={() => setShowNotifications(true)}>
            <i className="fas fa-bell"></i>
            <span className="badge">{notifications.length}</span>
          </div>
          <div className="messages" onClick={() => setShowMessages(true)}>
            <i className="fas fa-envelope"></i>
          </div>
          <div className="admin-name">Admin: Alice</div>
        </div>
      </div>

      {/* Sidebar */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-tachometer-alt"></i> Tableau de bord
          </NavLink>
          <NavLink to="users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-users"></i> Utilisateurs
          </NavLink>
          <NavLink to="events" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-calendar-alt"></i> Événements
          </NavLink>
          <NavLink to="organizer-approvals" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-user-check"></i> Approbation des organisateurs
          </NavLink>
          <NavLink to="refunds" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-money-bill-wave"></i> Remboursements
          </NavLink>
          <NavLink to="payments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-credit-card"></i> Paiements
          </NavLink>
          <NavLink to="platform-payments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-hand-holding-usd"></i> Paiements Plateforme
          </NavLink>
          <NavLink to="disputes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-gavel"></i> Litiges
          </NavLink>
          <NavLink to="maintenance" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-tools"></i> Maintenance
          </NavLink>
          <NavLink to="statistics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <i className="fas fa-chart-bar"></i> Statistiques
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="users" element={<AdminUsers />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="organizer-approvals" element={<AdminOrganizerApprovals />} />
          <Route path="refunds" element={<AdminRefunds />} />
          <Route path="*" element={<div><h2>Tableau de bord</h2><p>Section en cours de développement</p></div>} />
        </Routes>
      </div>

      {/* Modale Notifications */}
      {showNotifications && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Notifications</h3>
              <button className="close-button" onClick={() => setShowNotifications(false)}>×</button>
            </div>
            <div className="modal-body">
              {notifications.length === 0 ? (
                <p>Aucune notification</p>
              ) : (
                <ul className="notification-list">
                  {notifications.map(notif => (
                    <li key={notif.id}>{notif.message} - {notif.date}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modale Messages */}
      {showMessages && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Messages</h3>
              <button className="close-button" onClick={() => setShowMessages(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Boîte de réception en cours de développement</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;