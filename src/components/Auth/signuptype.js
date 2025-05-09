import React from "react";
import { useNavigate } from 'react-router-dom';
import "./signuptype.css";

const SignUpType = () => {
  const navigate = useNavigate();

  // Données dynamiques pour les cartes
  const accountTypes = [
    {
      title: "Participant",
      description: "Je veux réserver des événements",
      features: [
        "Accès à tous les événements",
        "Gestion de mes réservations",
        "Paiement sécurisé",
        "Historique des participations"
      ],
      color: "#FFC107", // Jaune
      route: '/Auth/participantsignup'
    },
    {
      title: "Organisateur",
      description: "Je veux créer des événements",
      features: [
        "Publication d'événements",
        "Gestion des participants",
        "Paiements sécurisés",
        "Statistiques détaillées"
      ],
      color: "#E91E63", // Rose
      route: '/Auth/organizersignup'
    }
  ];

  return (
    <div className="signup-type-container">
      <div className="signup-type-content">
        <h2 className="signup-title">Rejoignez notre communauté</h2>
        <p className="signup-subtitle">Choisissez votre profil pour commencer l'aventure</p>
        
        <div className="account-cards-grid">
          {accountTypes.map((account, index) => (
            <div 
              key={index}
              className="account-card"
              onClick={() => navigate(account.route)}
              style={{ '--card-color': account.color }}
            >
              <div className="card-header">
                <h3>{account.title}</h3>
                <p>{account.description}</p>
              </div>
              <ul className="card-features">
                {account.features.map((feature, i) => (
                  <li key={i}>
                    <span className="feature-icon">✓</span> 
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className="card-button"
                style={{ backgroundColor: account.color }}
              >
                Choisir ce profil
              </button>
            </div>
          ))}
        </div>

        <div className="already-member">
          Déjà membre ? <span onClick={() => navigate('/Auth/login')}>Connectez-vous</span>
        </div>
      </div>
    </div>
  );
};

export default SignUpType;