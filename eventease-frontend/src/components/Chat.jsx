import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

// Make sure this URL is your deployed backend URL with https://
const socket = io('https://eventmanagement-backend-llr2.onrender.com', {
  transports: ["websocket"],   // avoid long polling
  withCredentials: true        // allow CORS credentials
});


const Chat = () => {
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Socket connected, ID:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
    });

    socket.on('receive_message', (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
      socket.off('connect');
      socket.off('connect_error');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        sender: user?.username || user?.role || 'User',
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', msgData);
      setMessage('');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#e6f0ff' }}
    >
      <div
        className="container py-5"
        style={{
          maxWidth: '650px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
          border: '1px solid #b3c7ff',
        }}
      >
        <h3
          className="text-center mb-4 fw-bold"
          style={{ color: '#2563eb' }}
        >
          Real-Time Chat
        </h3>

        <div
          className="mb-3 p-3"
          style={{
            height: '300px',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: 'inset 0 0 8px rgba(59, 130, 246, 0.1)',
            border: '1px solid #93c5fd',
            color: '#1e293b',
          }}
        >
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <strong>{msg.sender}:</strong> {msg.text}{' '}
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        <div className="d-flex">
          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control shadow-sm"
            style={{
              borderRadius: '10px',
              fontSize: '0.9rem',
              borderColor: '#93c5fd',
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.15)',
            }}
          />
          <button
            onClick={sendMessage}
            className="btn ms-2 text-white fw-semibold"
            style={{
              backgroundColor: '#3b82f6',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
              borderRadius: '10px',
              padding: '10px 20px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563eb')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
