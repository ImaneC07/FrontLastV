import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const fakeUsers = [
  { email: 'participant@gmail.com', password: '12345678', type: 'participant' },
  { email: 'organisateur@gmail.com', password: '12345678', type: 'organizer' },
  { email: 'admin@gmail.com', password: '12345678', type: 'admin' }
];

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    userType: 'participant'
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifications simples
    if (!credentials.email.includes('@')) {
      setError('Email invalide');
      return;
    }

    if (credentials.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    // Recherche dans la "fake database"
    const foundUser = fakeUsers.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password &&
        user.type === credentials.userType
    );

    if (!foundUser) {
      setError('Identifiants incorrects');
      return;
    }

    // Stockage local
    localStorage.setItem('currentUser', JSON.stringify({
      email: foundUser.email,
      type: foundUser.type,
      token: 'fake-jwt-token'
    }));

    // Redirection selon le type
    if (foundUser.type === 'participant') {
      navigate('/Dashboards/dashboardparticipant');
    } else if (foundUser.type === 'organizer') {
      navigate('/Dashboards/dashboardorganizer');
    } else {
      navigate('/Dashboards/dashboardadmin');
    }
  };

  return (
    <div className="login-desktop-container">
      <div className="login-card">
        <h2>Connexion à GetUrTicket</h2>

        <form onSubmit={handleSubmit}>
          {/* Sélecteur de type */}
          <div className="user-type-selector">
            <button
              type="button"
              className={credentials.userType === 'participant' ? 'active' : ''}
              onClick={() => setCredentials({ ...credentials, userType: 'participant' })}
            >
              Participant
            </button>
            <button
              type="button"
              className={credentials.userType === 'organizer' ? 'active' : ''}
              onClick={() => setCredentials({ ...credentials, userType: 'organizer' })}
            >
              Organisateur
            </button>
            <button
              type="button"
              className={credentials.userType === 'admin' ? 'active' : ''}
              onClick={() => setCredentials({ ...credentials, userType: 'admin' })}
            >
              Admin
            </button>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="votre@email.com"
            />
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          {/* Bouton */}
          <button type="submit" className="login-button">Se connecter</button>

          {/* Erreur */}
          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="login-links">
          <a href="/reset-password">Mot de passe oublié ?</a>
          <a href="/signup">Créer un compte</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
