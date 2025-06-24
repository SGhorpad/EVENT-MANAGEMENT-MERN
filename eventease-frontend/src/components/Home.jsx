import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const featuresData = [
  {
    title: 'Effortless Event Creation & Management',
    content: 'Create and manage your events easily with intuitive tools and real-time updates.',
  },
  {
    title: 'Instant Event Joining & RSVP',
    content: 'Join events instantly and RSVP with just a click, no hassle or delays.',
  },
  {
    title: 'Smart Event Tracking & Reminders',
    content: 'Get timely reminders and track your events to never miss important moments.',
  },
  {
    title: 'Robust Security & Seamless Authentication',
    content: 'Protect your data with industry-leading encryption and secure login flows.',
  },
];

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); //  get user from AuthContext

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleGetStartedClick = () => {
    if (user) {
      navigate('/events'); // redirect to events if logged in
    } else {
      navigate('/register'); // redirect to register if not logged in
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dce9ff 0%, #f7f9ff 70%, #dbeafe 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '60px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 20,
          boxShadow: '0 12px 28px rgba(92, 122, 234, 0.25)',
          padding: 30,
          color: '#556677',
        }}
      >
        <header style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1
            style={{
              fontSize: '2.8rem',
              fontWeight: 'bold',
              marginBottom: 10,
              color: '#5C6AC4',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '1.5px',
              textShadow: '1px 1px 5px rgba(92, 106, 196, 0.3)',
            }}
          >
            Welcome to <span style={{ color: '#4f46e5' }}>EventEase</span>
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              color: '#6b7a8f',
              marginBottom: 20,
              fontWeight: 500,
            }}
          >
           Your one-stop platform to create, manage, and join amazing events seamlessly.
          </p>
          <button
            onClick={handleGetStartedClick}
            style={{
              backgroundColor: '#5C6AC4',
              color: 'white',
              padding: '12px 28px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(92, 106, 196, 0.5)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5C6AC4'}
          >
            Get Started
          </button>
        </header>

        <section id="features-section">
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: 25,
              color: '#4f46e5',
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '1px',
              textShadow: '1px 1px 3px rgba(79, 70, 229, 0.3)',
            }}
          >
            Why Choose EventEase?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {featuresData.map((feature, index) => (
              <div
                key={index}
                style={{
                  borderRadius: 10,
                  backgroundColor: activeIndex === index ? '#dbeafe' : '#e0e7ff',
                  boxShadow:
                    activeIndex === index
                      ? '0 8px 20px rgba(79, 70, 229, 0.3)'
                      : '0 3px 10px rgba(99, 102, 241, 0.15)',
                  border: '1.5px solid rgba(79, 70, 229, 0.15)',
                  transition: 'all 0.3s ease',
                  color: '#4a5a70',
                }}
              >
                <button
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    padding: '16px 24px',
                    fontSize: '1.15rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: "'Georgia', serif",
                    color: '#4a5a70',
                    textShadow: '0 0 5px rgba(74, 90, 112, 0.4)',
                    userSelect: 'none',
                  }}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  {feature.title}
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '1.5rem',
                      fontWeight: '900',
                      color: '#556677',
                    }}
                  >
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: activeIndex === index ? '160px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                    padding: activeIndex === index ? '12px 24px 20px' : '0 24px',
                    fontSize: '1rem',
                    color: '#556677',
                  }}
                >
                  <p style={{ margin: 0 }}>{feature.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
