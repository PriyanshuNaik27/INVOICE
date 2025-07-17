const Navbar = ({ currentPage, setCurrentPage, darkMode, setDarkMode }) => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow flex justify-between items-center">
      <h1 className="text-lg font-semibold">INVOICER</h1>
      <div className="space-x-4 flex items-center">
        {currentPage !== "chat" && (
          <button
            onClick={() => setCurrentPage("chat")}
            className="hover:text-green-400 transition-colors"
          >
            Chat
          </button>
        )}
        {currentPage !== "team" && (
          <button
            onClick={() => setCurrentPage("team")}
            className="hover:text-green-400 transition-colors"
          >
            Team
          </button>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition-all duration-300"
        >
          Toggle {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
};
//.
export default Navbar;
