import { FiSearch } from "react-icons/fi"; 

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center w-full max-w-md bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
      <FiSearch className="text-gray-400 mr-2" size={20} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Pokémon..."
        className="outline-none w-full text-gray-700 placeholder-gray-400 bg-transparent"
      />
    </div>
  );
};

export default SearchBar;
