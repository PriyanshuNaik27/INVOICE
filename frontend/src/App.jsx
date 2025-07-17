import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">💬 My Assistant</h1>
        <ChatBox />
      </main>
      <Footer />
    </div>
  );
}

export default App;
