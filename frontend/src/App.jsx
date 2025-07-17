import { useState } from "react";
import Navbar from "./components/Navbar";
import ChatBox from "./components/ChatBox";
import Team from "./components/Team";

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

      <main className="flex-grow flex justify-center items-start p-4">
        <div className="w-full max-w-3xl">
          {currentPage === "chat" && <ChatBox darkMode={darkMode} />}
          {currentPage === "team" && <Team />}
        </div>
      </main>
    </div>
  );
}

export default App;
