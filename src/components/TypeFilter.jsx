const TypeFilter = ({ types, selectedTypes, setSelectedTypes}) => {
  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => toggleType(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 shadow-sm border
            ${
              selectedTypes.includes(type)
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500 shadow-md"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }
          `}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
