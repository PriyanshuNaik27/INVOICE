import ChatBox from "./components/chatBox";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">💬 My Assistant</h1>
      <ChatBox />
    </div>
  );
}

export default App;