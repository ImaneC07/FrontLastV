import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './organizersignup.css'; // Utilisera un style similaire à ParticipantSignup avec ajustements

const OrganizerSignup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    idNumber: '',
    portfolioLink: '',
    idDocument: null,
    acceptsContract: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Nom complet requis";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email invalide";
    if (formData.password.length < 8) newErrors.password = "8 caractères minimum";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    if (!formData.phone.match(/^[0-9]{10}$/)) newErrors.phone = "Numéro invalide (10 chiffres)";
    if (!formData.idNumber.match(/^[0-9A-Za-z]{8,20}$/)) newErrors.idNumber = "Numéro de carte invalide";
    if (!formData.idDocument) newErrors.idDocument = "Document requis";
    if (!formData.acceptsContract) newErrors.acceptsContract = "Vous devez signer le contrat";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulation de soumission à l'API + modération admin
      setTimeout(() => {
        console.log("Demande organisateur soumise:", formData);
        alert("Votre demande a été reçue ! Un email vous sera envoyé après vérification.");
        navigate('/');
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const ContractModal = () => (
    <div className="contract-modal-overlay">
      <div className="contract-modal">
        <h3>Contrat Organisateur</h3>
        <div className="contract-content">
          <p><strong>En tant qu'organisateur sur GetUrTicket, vous vous engagez à :</strong></p>
          <ol>
            <li>Fournir des informations exactes sur vos événements.</li>
            <li>Respecter les lois locales et les droits des participants.</li>
            <li>Honorer les réservations payantes (remboursement intégral en cas d'annulation).</li>
            <li>Ne pas utiliser la plateforme à des fins frauduleuses.</li>
          </ol>
          <p>En cas de non-respect, votre compte pourra être suspendu sans préavis.</p>
        </div>
        <button 
          onClick={() => {
            setFormData({...formData, acceptsContract: true});
            setShowContractModal(false);
          }}
          className="sign-contract-btn"
        >
          Je signe électroniquement
        </button>
        <button 
          onClick={() => setShowContractModal(false)} 
          className="close-modal-btn"
        >
          Fermer
        </button>
      </div>
    </div>
  );

  return (
    <div className="organizer-signup-container">
      {showContractModal && <ContractModal />}
      
      <div className="signup-card">
        <div className="signup-header">
          <h2>Devenez Organisateur</h2>
          <p>Publiez vos événements et gérez vos participants en toute simplicité</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Section Informations de base */}
          <div className="form-section">
            <h4>Informations Personnelles</h4>
            
            <div className="form-group">
              <label htmlFor="fullName">Nom complet*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Jean Dupont"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="contact@votreevent.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone*</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                placeholder="0612345678"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          {/* Section Mot de passe */}
          <div className="form-section">
            <h4>Sécurité du compte</h4>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="8 caractères minimum"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmation*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Retapez votre mot de passe"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Section Vérification d'identité */}
          <div className="form-section">
            <h4>Vérification d'Identité</h4>
            
            <div className="form-group">
              <label htmlFor="idNumber">Numéro de carte d'identité*</label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className={errors.idNumber ? 'error' : ''}
                placeholder="AB12345678"
              />
              {errors.idNumber && (
                <span className="error-message">{errors.idNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label>Pièce d'identité*</label>
              <div 
                className={`file-upload-area ${errors.idDocument ? 'error' : ''}`}
                onClick={triggerFileInput}
              >
                {formData.idDocument ? (
                  <span>📄 {formData.idDocument.name}</span>
                ) : (
                  <span>📁 Glissez-déposez ou cliquez pour uploader</span>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleChange}
                  name="idDocument"
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                />
              </div>
              {errors.idDocument && (
                <span className="error-message">{errors.idDocument}</span>
              )}
              <p className="file-hint">Formats acceptés : PDF, JPG, PNG (max 5MB)</p>
            </div>

            <div className="form-group">
              <label htmlFor="portfolioLink">Portfolio/Lien (optionnel)</label>
              <input
                type="url"
                id="portfolioLink"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleChange}
                placeholder="https://votresite.com ou lien réseaux sociaux"
              />
              <p className="field-hint">Aidez-nous à vérifier votre activité d'organisateur</p>
            </div>
          </div>

          {/* Contrat */}
          <div className="form-section">
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="acceptsContract"
                name="acceptsContract"
                checked={formData.acceptsContract}
                onChange={(e) => {
                  if (e.target.checked) setShowContractModal(true);
                  else handleChange(e);
                }}
                className={errors.acceptsContract ? 'error' : ''}
              />
              <label htmlFor="acceptsContract">
                J'ai lu et je signe le <span className="contract-link">contrat organisateur</span>*
              </label>
              {errors.acceptsContract && (
                <span className="error-message">{errors.acceptsContract}</span>
              )}
            </div>
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner">⏳</span>
            ) : (
              "Soumettre ma demande"
            )}
          </button>
        </form>

        <div className="login-redirect">
          Déjà organisateur ? <span onClick={() => navigate('/Auth/login')}>Connectez-vous</span>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSignup;