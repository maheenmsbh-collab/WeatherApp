import logo from "./7133364.png"

function Search({ handleSearch, search, setSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <nav className="bg-blue-950 text-white py-4 h-28 font-serif flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Logo"
          className="w-17 h-17"
        />
        <span className="font-bold text-lg">Weather.com</span>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-3 py-2 text-black rounded-l-md bg-white"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="bg-amber-500 hover:bg-amber-400 py-2 px-4 rounded-r-md transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </nav>
  );
}

export default Search;
