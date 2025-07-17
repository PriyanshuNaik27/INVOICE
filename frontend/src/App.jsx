import { useState } from "react";
import Navbar from "./components/navbar";
import ChatBox from "./components/chatbox";
import Team from "./components/team";

function App() {
  const [currentPage, setCurrentPage] = useState("chat");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen flex flex-col transition-colors duration-500`}
    >
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="flex-grow flex flex-col">
        {currentPage === "chat" && <ChatBox darkMode={darkMode} />}
        {currentPage === "team" && <Team />}
      </main>
    </div>
  );
}

export default App;
