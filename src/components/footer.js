import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
        <div className="footer-bg-pattern"></div>
      <div className="footer-container">
        {/* Colonne 1 : Logo + Description */}
        <div className="footer-col">
        <div className="footer-brand">
        <div className="footer-logo">
            <span className="footer-logo-getur">GetUr</span>
            <span className="footer-logo-ticket">Ticket</span>
          </div>
          <p>
            La plateforme qui connecte les passionnés d'événements et les organisateurs 
            depuis 2024. Votre passerelle vers les meilleurs événements universitaires et culturels.
          </p>
          <div className="social-links">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i> 
                    <svg className="social-icon" viewBox="0 0 24 24"  aria-label="Facebook">
                         <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="currentColor"/>
                     </svg>
                </a>
              <a href="https://www.instagram.com/imene.chaabani/" className="social-icon"><i className="fab fa-instagram"></i>  
                    
                      <svg className="social-icon" viewBox="0 0 24 24" aria-label="Instagram" width="22" height="22">
                      <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="currentColor"/>
                     </svg>
                </a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i>  
                    <svg className="social-icon" viewBox="0 0 24 24" aria-label="LinkedIn">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.3 3.3 0 0 0-3.3-3.3c-.9 0-1.7.3-2.2.9v-.9h-2.5v8.6h2.6v-4.8c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v4.8h2.6M6.9 8.3a1.7 1.7 0 0 0 1.7-1.7A1.7 1.7 0 0 0 6.9 5a1.7 1.7 0 0 0-1.7 1.6 1.7 1.7 0 0 0 1.7 1.7m1.4 10.2v-8.6H5.5v8.6h2.8z" fill="currentColor"/>
                     </svg>
                </a>
            </div>
            </div>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/events">Événements</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/helpcenter">Centre d'aide</Link></li> {/* À créer */}
          </ul>
        </div>

        {/* Colonne 3 : Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>contact@geturticket.com</li>
            <li>+212 7 62 55 08 26</li>
            <li>Faculté des Sciences, Maroc</li>
          </ul>
        </div>

        {/* Colonne 4 - Newsletter */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-btn">
              S'abonner
            </button>
          </form>
        </div>
      </div>

       {/* Footer bottom */}
       <div className="footer-bottom">
        <p className="copyright">© 2025 GetUrTicket - Tous droits réservés</p>
        <div className="legal-links">
          <a href="/privacy">Confidentialité</a>
          <a href="/terms">Conditions</a>
          <a href="/cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;