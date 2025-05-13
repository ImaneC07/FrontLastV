import React, { useState, useMemo } from 'react';
import './dashboardorganizer.css';


const Messages = ({ messages = [], participants = [], onSendMessage, onMarkAsRead, onDeleteConversation, onStartConversation }) => {
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [filter, setFilter] = useState('all'); // Filtres : all, unread, read
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newMessageRecipient, setNewMessageRecipient] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');

  // Regrouper les messages par conversation
  const conversations = useMemo(() => {
    const grouped = messages.reduce((acc, msg) => {
      const convId = msg.conversationId;
      if (!acc[convId]) {
        acc[convId] = {
          conversationId: convId,
          participantId: msg.participantId,
          messages: [],
          lastMessage: msg,
          isRead: msg.isRead,
        };
      }
      acc[convId].messages.push(msg);
      if (new Date(msg.timestamp) > new Date(acc[convId].lastMessage.timestamp)) {
        acc[convId].lastMessage = msg;
        acc[convId].isRead = msg.isRead;
      }
      return acc;
    }, {});
    return Object.values(grouped);
  }, [messages]);

  // Filtrer les conversations par recherche et statut
  const filteredConversations = useMemo(() => {
    return conversations.filter(conv => {
      const participant = participants.find(p => p.id === conv.participantId);
      const participantName = participant ? participant.name.toLowerCase() : '';
      const lastMessageContent = conv.lastMessage.content.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = participantName.includes(query) || lastMessageContent.includes(query);
      const matchesFilter = filter === 'all' || (filter === 'unread' && !conv.isRead) || (filter === 'read' && conv.isRead);
      return matchesSearch && matchesFilter;
    });
  }, [conversations, filter, searchQuery, participants]);

  // Trouver la conversation sélectionnée
  const selectedConversation = conversations.find(conv => conv.conversationId === selectedConversationId);

  // Trouver le nom et l'avatar du participant
  const getParticipantInfo = (participantId) => {
    const participant = participants.find(p => p.id === participantId);
    return {
      name: participant ? participant.name : 'Inconnu',
      avatar: participant?.avatar || 'https://via.placeholder.com/40?text=User', // Avatar par défaut
    };
  };

  // Formater la date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
  };

  // Envoyer un message dans une conversation existante
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      onSendMessage({
        conversationId: selectedConversation.conversationId,
        participantId: selectedConversation.participantId,
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: false,
        sender: 'organizer',
      });
      setNewMessage('');
    }
  };

  // Démarrer une nouvelle conversation
  const handleStartConversation = (e) => {
    e.preventDefault();
    if (newMessageRecipient && newMessageContent.trim()) {
      const recipient = participants.find(p => p.name === newMessageRecipient);
      if (recipient) {
        const newConversationId = Math.max(0, ...conversations.map(c => c.conversationId)) + 1;
        onStartConversation({
          conversationId: newConversationId,
          participantId: recipient.id,
          content: newMessageContent,
          timestamp: new Date().toISOString(),
          isRead: false,
          sender: 'organizer',
        });
        setShowNewMessageModal(false);
        setNewMessageRecipient('');
        setNewMessageContent('');
        setSelectedConversationId(newConversationId);
      }
    }
  };

  return (
    <div className="inbox-page">
      <h2>Messages</h2>
      <div className="inbox-container">
        <div className="conversations-list">
          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une discussion..."
              />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Tous</option>
              <option value="unread">Non lus</option>
              <option value="read">Lus</option>
            </select>
            <button
              className="new-message-button"
              onClick={() => setShowNewMessageModal(true)}
            >
              <i className="fas fa-plus"></i> Nouveau message
            </button>
          </div>
          {filteredConversations.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-envelope"></i>
              <p>Aucune discussion trouvée.</p>
            </div>
          ) : (
            filteredConversations.map(conv => {
              const { name, avatar } = getParticipantInfo(conv.participantId);
              return (
                <div
                  key={conv.conversationId}
                  className={`conversation-item ${selectedConversationId === conv.conversationId ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedConversationId(conv.conversationId);
                    if (!conv.isRead) {
                      onMarkAsRead(conv.conversationId);
                    }
                  }}
                >
                  <img src={avatar} alt={name} onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=User'} />
                  <div className="conversation-info">
                    <h3>{name}</h3>
                    <p>{conv.lastMessage.content.slice(0, 50)}{conv.lastMessage.content.length > 50 ? '...' : ''}</p>
                  </div>
                  {!conv.isRead && <span className="unread-badge">1</span>}
                </div>
              );
            })
          )}
        </div>
        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <img src={getParticipantInfo(selectedConversation.participantId).avatar} alt="Participant" onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=User'} />
                <h3>{getParticipantInfo(selectedConversation.participantId).name}</h3>
                <div className="conversation-actions">
                  <button
                    className="action-icon"
                    title="Marquer comme lu"
                    onClick={() => onMarkAsRead(selectedConversation.conversationId)}
                    disabled={selectedConversation.isRead}
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    className="action-icon danger"
                    title="Supprimer la conversation"
                    onClick={() => {
                      onDeleteConversation(selectedConversation.conversationId);
                      setSelectedConversationId(null);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="messages-container">
                {selectedConversation.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender === 'organizer' ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{msg.content}</p>
                      <span className="message-time">{formatDate(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <form className="message-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrire un message..."
                  required
                />
                <button type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </>
          ) : (
            <div className="no-conversation-selected">
              <i className="fas fa-comment-alt"></i>
              <p>Sélectionnez une discussion pour commencer.</p>
            </div>
          )}
        </div>
      </div>
      {showNewMessageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Nouveau message</h3>
              <button className="close-button" onClick={() => setShowNewMessageModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleStartConversation}>
                <div className="form-group">
                  <label>Destinataire</label>
                  <select
                    value={newMessageRecipient}
                    onChange={(e) => setNewMessageRecipient(e.target.value)}
                    required
                  >
                    <option value="">Sélectionner un destinataire</option>
                    {participants.map(participant => (
                      <option key={participant.id} value={participant.name}>{participant.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    placeholder="Écrire votre message..."
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="secondary-button" onClick={() => setShowNewMessageModal(false)}>
                    Annuler
                  </button>
                  <button type="submit" className="primary-button">
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;