const SortOptions = ({ sortOption, setSortOption }) => {
    return (
      <div className="w-full max-w-xs">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full bg-white border border-gray-300 text-gray-700 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="id-asc">Sort by ID</option>
          <option value="name-asc">Sort A-Z</option>
          <option value="name-desc">Sort Z-A</option>
        </select>
      </div>
    );
  };
  
  export default SortOptions;
  