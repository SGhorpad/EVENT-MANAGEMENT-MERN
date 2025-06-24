import React, { useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

const socket = io('http://localhost:5000');

const Chat = () => {
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChatMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
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
      style={{ minHeight: '100vh', backgroundColor: '#e6f0ff' }} // light blue background
    >
      <div
        className="container py-5"
        style={{
          maxWidth: '650px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // slightly translucent white
          borderRadius: '15px',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)', // subtle blue shadow
          border: '1px solid #b3c7ff', // soft blue border
        }}
      >
        <h3
          className="text-center mb-4 fw-bold"
          style={{ color: '#2563eb' }} // sky blue heading
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
            boxShadow: 'inset 0 0 8px rgba(59, 130, 246, 0.1)', // subtle blue inset shadow
            border: '1px solid #93c5fd', // light blue border
            color: '#1e293b', // dark slate text
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
              backgroundColor: '#3b82f6', // sky blue button
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
