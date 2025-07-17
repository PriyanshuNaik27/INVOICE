import { useState, useRef } from "react";
import axios from "axios";

const ChatBox = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const examples = [
    "Explain React in simple terms.",
    "How does Node.js handle async operations?",
    "Give me a motivational quote.",
    "What is the time complexity of quicksort?",
    "Write a short bio for LinkedIn.",
    "Explain JWT authentication."
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/chat", {
        message: input,
      });

      const botMsg = { sender: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error contacting assistant." },
      ]);
    }

    setInput("");
  };

  const handleExampleClick = (example) => {
    setInput(example);
    inputRef.current.focus();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Example prompts */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => handleExampleClick(ex)}
            className={`text-left px-4 py-2 rounded border ${
              darkMode
                ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            } transition-colors`}
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } transition-transform duration-500 transform-gpu`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-md text-sm ${
                msg.sender === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div
        className={`flex items-center gap-3 px-4 py-3 border-t ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-100"
        }`}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className={`flex-1 rounded px-3 py-2 focus:outline-none ${
            darkMode
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-white text-gray-800"
          }`}
        />
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
