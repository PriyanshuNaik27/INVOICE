import { useState, useRef } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const ChatBox = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // New: loading state
  const inputRef = useRef(null);

  const examples = [
    "Add invoice for JOHN of 200 RS",
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
    setLoading(true); // Start loading

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/chat`, {
          message: input,
      }, { withCredentials: true });

      const botMsg = { sender: "bot", text: res.data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error contacting assistant." },
      ]);
    } finally {
      setLoading(false); // Stop loading
    }

    setInput("");
  };

  const handleExampleClick = (example) => {
    setInput(example);
    inputRef.current.focus();
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-900 text-white">
      
      {/* Sidebar (Examples like ChatGPT history) */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold mb-3">Examples</h2>
          <div className="space-y-2">
            {examples.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(ex)}
                className="w-full text-left bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg text-sm transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full text-gray-400">
              Start a conversation...
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-xl px-6 py-4 max-w-3xl text-base leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-200"
                } shadow`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1">{line}</p>
                ))}
              </div>

            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-xl px-6 py-4 max-w-3xl text-base leading-relaxed bg-gray-700 text-gray-200 shadow animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="bg-gray-800 border-t border-gray-700 px-8 py-5">
          <div className="flex items-center gap-4">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-full px-5 py-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none shadow-inner text-base"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
//.
export default ChatBox;
