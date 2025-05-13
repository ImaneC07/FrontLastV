import React, { useState } from 'react';
import './ProfileOrga.css';

const ProfileOrga = () => {
  // Données simulées
  const [profile, setProfile] = useState({
    profilePhoto: null,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+33 123 456 789",
    address: "123 Rue Exemple",
    address2: "",
    city: "Paris",
    country: "France",
    zipCode: "75001",
  });

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "1234", expiry: "12/26" },
    { id: 2, type: "Mastercard", last4: "5678", expiry: "06/25" },
  ]);

  // États pour les formulaires et modales
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [cardForm, setCardForm] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(null);
  const [showCloseAccountModal, setShowCloseAccountModal] = useState(false);
  const [closeAccountConfirmation, setCloseAccountConfirmation] = useState("");
  const [closeAccountError, setCloseAccountError] = useState("");

  // Liste des pays
  const countries = ["France", "United States", "Canada", "United Kingdom", "Germany"];

  // Gestion de la mise à jour du profil
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!profile.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert("Veuillez entrer un email valide.");
      return;
    }
    setIsEditingProfile(false);
    alert("Profil mis à jour avec succès !");
    // TODO: Appeler l'API /api/user/update-profile
  };

  // Gestion du changement de mot de passe
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError("");
    alert("Mot de passe changé avec succès !");
    // TODO: Appeler l'API /api/user/change-password
  };

  // Gestion des cartes
  const handleCardChange = (e) => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value });
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    const newCard = {
      id: paymentMethods.length + 1,
      type: cardForm.number.startsWith("4") ? "Visa" : "Mastercard",
      last4: cardForm.number.slice(-4),
      expiry: cardForm.expiry,
    };
    setPaymentMethods([...paymentMethods, newCard]);
    setCardForm({ number: "", name: "", expiry: "", cvv: "" });
    setShowAddCardModal(false);
    alert("Carte ajoutée avec succès !");
    // TODO: Appeler l'API /api/user/add-payment-method
  };

  const handleDeleteCard = (cardId) => {
    setPaymentMethods(paymentMethods.filter(card => card.id !== cardId));
    setShowDeleteCardModal(null);
    alert("Carte supprimée avec succès !");
    // TODO: Appeler l'API /api/user/delete-payment-method
  };

  // Gestion de la fermeture du compte
  const handleCloseAccount = () => {
    if (closeAccountConfirmation !== "CONFIRMER") {
      setCloseAccountError("Veuillez taper 'CONFIRMER' pour continuer.");
      return;
    }
    setCloseAccountConfirmation("");
    setCloseAccountError("");
    setShowCloseAccountModal(false);
    alert("Compte fermé avec succès !");
    // TODO: Appeler l'API /api/user/close-account
  };

  return (
    <div className="profile-orga-page">
      <h1>Paramètres du Profil</h1>

      {/* Informations personnelles */}
      <div className="profile-section summary-card">
        <h2>Informations personnelles</h2>
        <div className="profile-photo-section">
          <div className="profile-photo">
            {profile.profilePhoto ? (
              <img src={profile.profilePhoto} alt="Profil" />
            ) : (
              <i className="fas fa-user-circle"></i>
            )}
          </div>
          <button className="secondary-button">
            <i className="fas fa-camera"></i> Changer la photo
          </button>
        </div>
        <form onSubmit={handleProfileSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileChange}
                required
                disabled={!isEditingProfile}
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileChange}
                required
                disabled={!isEditingProfile}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
                disabled={!isEditingProfile}
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
            </div>
            <div className="form-group">
              <label>Adresse</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
                required
                disabled={!isEditingProfile}
              />
            </div>
            <div className="form-group">
              <label>Adresse 2</label>
              <input
                type="text"
                name="address2"
                value={profile.address2}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
              />
            </div>
            <div className="form-group">
              <label>Ville</label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleProfileChange}
                required
                disabled={!isEditingProfile}
              />
            </div>
            <div className="form-group">
              <label>Pays</label>
              <select
                name="country"
                value={profile.country}
                onChange={handleProfileChange}
                required
                disabled={!isEditingProfile}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Code postal</label>
              <input
                type="text"
                name="zipCode"
                value={profile.zipCode}
                onChange={handleProfileChange}
                required
                disabled={!isEditingProfile}
              />
            </div>
          </div>
          <div className="form-actions">
            {isEditingProfile ? (
              <>
                <button type="submit" className="primary-button">
                  Enregistrer
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setIsEditingProfile(false)}
                >
                  Annuler
                </button>
              </>
            ) : (
              <button
                type="button"
                className="primary-button"
                onClick={() => setIsEditingProfile(true)}
              >
                Modifier
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Mot de passe */}
      <div className="profile-section summary-card">
        <h2>Changer le mot de passe</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label>Mot de passe actuel</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {passwordError && <p className="error-text">{passwordError}</p>}
          <button type="submit" className="primary-button">
            Changer le mot de passe
          </button>
        </form>
      </div>

      {/* Moyens de paiement */}
      <div className="profile-section summary-card">
        <h2>Moyens de paiement</h2>
        {paymentMethods.length === 0 ? (
          <p>Aucune carte enregistrée.</p>
        ) : (
          <div className="payment-methods-list">
            {paymentMethods.map(card => (
              <div key={card.id} className="payment-method">
                <span>{card.type} **** {card.last4}</span>
                <span>Expire {card.expiry}</span>
                <button
                  className="delete-button"
                  onClick={() => setShowDeleteCardModal(card.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="primary-button"
          onClick={() => setShowAddCardModal(true)}
        >
          Ajouter une carte
        </button>
      </div>

      {/* Fermer le compte */}
      <div className="profile-section summary-card danger">
        <h2>Fermer le compte</h2>
        <p>
          La fermeture de votre compte est irréversible. Vous perdrez l'accès à
          tous vos événements et données.
        </p>
        <button
          className="reject-button"
          onClick={() => setShowCloseAccountModal(true)}
        >
          Fermer mon compte
        </button>
      </div>

      {/* Modale pour ajouter une carte */}
      {showAddCardModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Ajouter une carte</h3>
              <button
                className="close-button"
                onClick={() => setShowAddCardModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddCard}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Numéro de carte</label>
                  <input
                    type="text"
                    name="number"
                    value={cardForm.number}
                    onChange={handleCardChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nom sur la carte</label>
                  <input
                    type="text"
                    name="name"
                    value={cardForm.name}
                    onChange={handleCardChange}
                    placeholder="JOHN DOE"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date d'expiration</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardForm.expiry}
                      onChange={handleCardChange}
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={cardForm.cvv}
                      onChange={handleCardChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddCardModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="primary-button">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale pour supprimer une carte */}
      {showDeleteCardModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Supprimer la carte</h3>
              <button
                className="close-button"
                onClick={() => setShowDeleteCardModal(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Êtes-vous sûr de vouloir supprimer cette carte ?</p>
            </div>
            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setShowDeleteCardModal(null)}
              >
                Annuler
              </button>
              <button
                className="reject-button"
                onClick={() => handleDeleteCard(showDeleteCardModal)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale pour fermer le compte */}
      {showCloseAccountModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Fermer le compte</h3>
              <button
                className="close-button"
                onClick={() => setShowCloseAccountModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                La fermeture de votre compte est irréversible. Tapez "CONFIRMER"
                pour continuer.
              </p>
              <div className="form-group">
                <input
                  type="text"
                  value={closeAccountConfirmation}
                  onChange={(e) => setCloseAccountConfirmation(e.target.value)}
                  placeholder="CONFIRMER"
                />
              </div>
              {closeAccountError && (
                <p className="error-text">{closeAccountError}</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setShowCloseAccountModal(false)}
              >
                Annuler
              </button>
              <button
                className="reject-button"
                onClick={handleCloseAccount}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOrga;