import React from "react";
import Header from "./header";
import Footer from "./footer";
import "../App.css";
import "./home.css";
import "./about.css";

const About = () => {
  // Témoignages adaptés à votre double public
  const testimonials = [
    {
      id: 1,
      name: "Lina P.",
      role: "Participante",
      text: "J'ai découvert des concerts exclusifs grâce à GetUrTicket. La réservation est plus simple qu'un achat e-commerce !",
      rating: "★★★★★"
    },
    {
      id: 2,
      name: "Mehdi R.",
      role: "Organisateur",
      text: "Gérer mes festivals est devenu intuitif. Les outils d'inscription et de QR codes m'économisent 10h/semaine !",
      rating: "★★★★☆"
    }
  ];

  return (
    <div className="event-website">
      <Header onLoginClick={() => {}} />

      {/* Bannière thématique événements */}
      <div className="about-banner">
        <img 
          src="/images/event-crowd.webp"  // Image de foule/événement
          alt="Communauté EventLink" className="banner-image"
        />

        <div className="banner-overlay">
          <h1>GetUrTicket : Votre pont vers l'expérience événementielle</h1>
        </div>
      </div>

      <div className="about-content">

         {/* --- Notre Histoire --- */}
         <section className="about-section">
          <h2 className="section-title">Notre histoire</h2>
          <div className="history-timeline">
            <div className="timeline-item">
              <h3>2023 : L'idée 💡</h3>
              <p>
                Tout commence à la fac, lors d'un projet de développement. 
                <strong> Frustrées par la complexité des réservations événementielles</strong>, 
                nous décidons de créer une solution simple et moderne.
              </p>
            </div>
            <div className="timeline-item">
              <h3>2024 : Le lancement 🚀</h3>
              <p>
                Après des mois de codage intensif entre cours à la Faculté des Sciences, 
                GetYourTicket voit le jour avec <strong>15 événements pilotes</strong> organisés 
                par des associations étudiantes.
              </p>
            </div>
            <div className="timeline-item">
              <h3>Aujourd'hui : L'ambition ✨</h3>
              <p>
                Devenir la référence pour les <strong>événements universitaires et culturels au Maroc</strong>, 
                tout en gardant notre âme de développeuses passionnées.
              </p>
            </div>
          </div>
        </section>

        {/* --- Équipe --- */}
        <section className="about-section">
          <h2 className="section-title">L'équipe derrière GetYourTicket</h2>
          <div className="team-grid">
            {[
              { 
                name: "Oumaima Bimesmaren", 
                role: "Développeuse Full-Stack", 
                bio: "Spécialisée en UX/UI, elle rend l'application intuitive comme une seconde nature.",
                funFact: "🎧 Playlist coding : Lo-fi beats & Rai"
              },
              { 
                name: "Imane Chaabani", 
                role: "Responsable Back-End", 
                bio: "Génie des bases de données et de la sécurité, elle garantit des transactions fluides et sécurisées.",
                funFact: "⚡ Fun fact : Peut résoudre un Rubik's cube en 2 min"
              },
              { 
                name: "Assia Tamai", 
                role: "Cheffe de projet", 
                bio: "Transforme les bugs en fonctionnalités et les idées en roadmap claire.",
                funFact: "🌱 Passion : Permaculture et tech for good"
              }
            ].map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-header">
                  <h3>{member.name}</h3>
                  <p className="role-badge">{member.role}</p>
                </div>
                <p className="member-bio">{member.bio}</p>
                <p className="fun-fact">{member.funFact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Valeurs */}
        <section className="about-section">
          <h2 className="section-title">Notre philosophie</h2>
          <div className="value-cards">
            <div className="value-card">
              <h3>🎟️ Pour les participants</h3>
              <p>Trouvez l'événement parfait en 3 clics, sans stress de billetterie.</p>
            </div>
            <div className="value-card">
              <h3>📢 Pour les organisateurs</h3>
              <p>Outils tout-en-un pour maximiser votre audience et gestion.</p>
            </div>
          </div>
        </section>

        {/* Fonctionnalités phares (adaptées à vos personas) */}
        <section className="about-section">
          <h2 className="section-title">Ce qui nous différencie</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>🔍 Découverte intelligente</h4>
              <p>Algorithmes de recommandation basés sur vos centres d'intérêt.</p>
            </div>
            <div className="feature-card">
              <h4>💳 Paiement sécurisé</h4>
              <p>Intégration CMI et cartes bancaires pour transactions fluides.</p>
            </div>
            <div className="feature-card">
              <h4>📊 Dashboard organisateur</h4>
              <p>Suivi en temps réel des réservations et statistiques.</p>
            </div>
            <div className="feature-card">
              <h4>📱 QR Codes instantanés</h4>
              <p>Validation d'entrée en 2 secondes, même hors ligne.</p>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="about-section">
          <h2 className="section-title">Ils utilisent GetUrTicket</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">{testimonial.rating}</div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA différenciés */}
        <div className="dual-cta">
          <div className="cta-card participant-cta">
            <h3>Vous souhaitez participer ?</h3>
            <a href="/events" className="cta-btn">Explorer les événements</a>
          </div>
          <div className="cta-card organizer-cta">
            <h3>Vous organisez ?</h3>
            <a href="/organizer/signup" className="cta-btn">Créer un compte pro</a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;