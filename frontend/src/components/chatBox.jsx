import { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/chat", {
        message: input,
      });

      const botMsg = { sender: "bot", text: res.data.response };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "❌ Error contacting assistant." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 border rounded-lg shadow p-4 bg-white">
      <div className="h-96 overflow-y-auto flex flex-col gap-2 mb-4 p-2 border bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm p-2 rounded ${
              msg.sender === "user"
                ? "bg-blue-100 self-end"
                : "bg-green-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border p-2 rounded"
          placeholder="Ask something..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;