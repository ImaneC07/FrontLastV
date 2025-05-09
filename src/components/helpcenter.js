import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Header from "./header";
import Footer from "./footer";
import "../App.css";
import "./home.css";
import "./helpcenter.css";

const faqData = [
  {
    category: "Compte et inscription",
    questions: [
      {
        q: "Comment créer un compte ?",
        a: "On peut s’inscrire sur la plateforme en cliquant sur le bouton 'S'inscrire' en haut à droite, puis en remplissant le formulaire et en suivant les instructions."
      },
      {
        q: "J'ai oublié mon mot de passe, que faire ?",
        a: "Cliquez sur 'Mot de passe oublié' dans la page de connexion, et suivez les instructions pour réinitialiser votre mot de passe."
      },
      {
        q: "Peut-on modifier ses informations personnelles ?",
        a: "Oui, dans l’espace personnel, sous 'Gestion du compte personnel'."
      },
      {
        q: "Comment supprimer son compte ?",
        a: "Allez dans les paramètres, puis dans 'Gérer mon compte personnel'."
      }
    ]
  },
  {
    category: "Réservations & billets",
    questions: [
      {
        q: "Comment faire une réservation ?",
        a: "Ajoutez l'événement au panier, remplissez les informations nécessaires, effectuez le paiement si nécessaire, et vous recevrez un e-ticket ou un QR code."
      },
      {
        q: "Peut-on annuler ou modifier une réservation ?",
        a: "Oui, dans l’espace participant, sous 'Mes réservations'."
      },
      {
        q: "Comment vérifier le statut d’une réservation ?",
        a: "Dans 'Mes réservations', vous verrez les réservations en cours, confirmées, ou annulées."
      },
      {
        q: "Y a-t-il une limite de réservation par utilisateur ?",
        a: "Oui, il est possible de réserver pour soi et pour d'autres (amis, famille), mais une limite sera fixée (6 ou 8 réservations maximum)."
      },
      {
        q: "Quelles sont les règles en cas de retard ou d’absence ?",
        a: "Cela dépend de chaque événement. Veuillez consulter les conditions spécifiques de l'organisateur ou le contacter pour plus d'informations."
      }
    ]
  },
  {
    category: "Paiement & remboursement",
    questions: [
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Nous acceptons les cartes bancaires, comme Visa ou PayPal. Les paiements se font en ligne uniquement."
      },
      {
        q: "Peut-on payer en plusieurs fois ?",
        a: "Non, un seul paiement est accepté."
      },
      {
        q: "Que faire en cas d’échec de paiement ?",
        a: "Vos articles resteront dans le panier. Vous pouvez réessayer le paiement ultérieurement."
      },
      {
        q: "Comment demander un remboursement ?",
        a: "Si vous êtes éligible (annulation dans les délais, etc.), le remboursement sera automatiquement effectué sur la même carte utilisée. Pour plus d'informations, contactez le support."
      }
    ]
  },
  {
    category: "Assistance & support",
    questions: [
      {
        q: "Comment contacter le support ?",
        a: "Allez sur le Help Center et remplissez le formulaire. Pensez à consulter les FAQ d’abord."
      },
      {
        q: "Quel est le délai moyen de réponse ?",
        a: "48h en moyenne."
      },
      {
        q: "Y a-t-il un support téléphonique ?",
        a: "Oui, consultez la page 'Contactez-nous' pour plus d’infos."
      },
      {
        q: "À quels horaires le support est-il disponible ?",
        a: "De 08h00 à 18h00."
      }
    ]
  },
  {
    category: "Utilisation de la plateforme",
    questions: [
      {
        q: "Comment utiliser le tableau de bord ?",
        a: "Des guides détaillés seront bientôt disponibles."
      },
      {
        q: "Comment devenir partenaire ou organisateur ?",
        a: "Lors de l’inscription, indiquez que vous êtes un organisateur et suivez les instructions."
      },
      {
        q: "Comment gérer ses préférences ?",
        a: "Fonctionnalité en cours de clarification, restez connecté pour plus d’infos."
      },
      {
        q: "Comment inviter d'autres utilisateurs ?",
        a: "Vous pouvez leur partager le lien de l'événement ou de la plateforme directement."
      }
    ]
  }
];

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSupportForm, setShowSupportForm] = useState(false);

  const handleToggle = (idx) => {
    setOpenQuestionIndex(openQuestionIndex === idx ? null : idx);
  };

  const getFilteredQuestions = () => {
    if (activeCategory !== null) {
      return faqData[activeCategory].questions.filter((q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Rechercher dans toutes les catégories si aucune sélection
    return faqData.flatMap((section) =>
      section.questions.filter((q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="event-website">
      <Header />

      <div className="help-center-container">
        <h1 className="help-title">Centre d’aide</h1>

        <input
          type="text"
          placeholder="Tapez votre question ici..."
          className="help-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="faq-categories">
          {faqData.map((section, idx) => (
            <div
              key={idx}
              className={`faq-category ${activeCategory === idx ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(idx === activeCategory ? null : idx);
                setOpenQuestionIndex(null);
              }}
            >
              {section.category}
            </div>
          ))}
        </div>

        <div className="faq-questions">
          {filteredQuestions.length === 0 ? (
            <p>Aucun résultat trouvé.</p>
          ) : (
            filteredQuestions.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${openQuestionIndex === idx ? "open" : ""}`}
              >
                <div
                  className="faq-item-header"
                  onClick={() => handleToggle(idx)}
                >
                  <span>{item.q}</span>
                  <FiChevronDown className="chevron" />
                </div>
                {openQuestionIndex === idx && (
                  <div className="faq-item-body">{item.a}</div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="contact-support">
          <h2>Besoin d’aide supplémentaire ?</h2>
          <p>Vous n’avez pas trouvé la réponse à votre question ?</p>
          <button onClick={() => setShowSupportForm((prev) => !prev)}>
            {showSupportForm ? "Fermer le formulaire" : "Contacter le support"}
          </button>

          {showSupportForm && (
            <form className="support-form">
              <input type="text" placeholder="Votre nom complet" required />
              <input type="email" placeholder="Votre adresse e-mail" required />
              <select required>
                <option value="">Sujet</option>
                <option value="reservation">Problème de réservation</option>
                <option value="remboursement">Demande de remboursement</option>
                <option value="technique">Assistance technique</option>
                <option value="autre">Autre</option>
              </select>
              <textarea
                placeholder="Votre message"
                rows="5"
                required
              ></textarea>
              <button type="submit">Envoyer la demande</button>
            </form>
          )}
        </div>

        <div className="popular-articles">
          <h3>Articles populaires</h3>
          <ul>
            <li><a href="#">Comment réserver un événement ?</a></li>
            <li><a href="#">Comprendre votre tableau de bord</a></li>
            <li><a href="#">Modifier vos informations personnelles</a></li>
          </ul>
        </div>

        <div className="chatbot-banner">
          <img src="/icons/chatbot.svg" alt="Assistant" />
          <span>👋 Je suis là pour vous aider, posez-moi une question !</span>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpCenter;
