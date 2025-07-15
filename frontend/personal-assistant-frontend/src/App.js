import React, { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import TeamSection from './components/TeamSection';
import Header from './components/Header';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'team' && <TeamSection />}
      </main>
    </div>
  );
}

export default App;
