import React, { useState } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      // Replace with your backend API endpoint
      const result = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
        query: message
      });
      setResponse(result.data.response);
    } catch (error) {
      setResponse('Sorry, I encountered an error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    "Which customers are due and by what amount in July 2025?",
    "Record invoice for customer ABC Corp - $5000",
    "Set reminder to follow up with XYZ Ltd next week",
    "Show all pending payments",
    "Record payment from DEF Company - $2500"
  ];

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Ask your Personal Assistant</h2>
        <p>Manage invoices, payments, and reminders effortlessly</p>
      </div>

      <div className="example-queries">
        <h3>Example Queries:</h3>
        <div className="query-grid">
          {exampleQueries.map((query, index) => (
            <button 
              key={index}
              className="example-query"
              onClick={() => setMessage(query)}
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here... (e.g., 'Which customers are due in July 2025?')"
            className="chat-input"
            rows="3"
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={loading || !message.trim()}
          >
            {loading ? <FaSpinner className="spinner" /> : <FaPaperPlane />}
          </button>
        </div>
      </form>

      {response && (
        <div className="response-container">
          <h4>Assistant Response:</h4>
          <div className="response-content">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
