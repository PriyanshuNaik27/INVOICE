import React from 'react';
import { FaRobot, FaUsers } from 'react-icons/fa';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <FaRobot className="logo-icon" />
          <h1>Personal Assistant</h1>
        </div>
        <nav className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <FaRobot /> Chat
          </button>
          <button 
            className={`nav-tab ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            <FaUsers /> Team
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
