import React, { useState, useContext, useEffect, useRef } from "react";
import { PokemonContext } from "../contexts/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import SortOptions from "../components/SortOptions";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import useFilteredPokemons from "../hooks/useFilteredPokemons";

const Home = () => {
  const { pokemons } = useContext(PokemonContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("id-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  const itemsPerPage = 10;
  const randomRef = useRef();

  const filteredPokemons = useFilteredPokemons(
    pokemons,
    searchTerm,
    selectedTypes,
    sortOption
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTypes, sortOption]);

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const currentPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRandomPokemon = async () => {
    setIsLoadingRandom(true);
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    const randomPokemonData = pokemons[randomIndex];
    setRandomPokemon(randomPokemonData);
    setIsLoadingRandom(false);

    setTimeout(() => {
      randomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleClearRandomPokemon = () => {
    setRandomPokemon(null); 
  };

  const types = [
    ...new Set(pokemons.flatMap((p) => p.types.map((t) => t.type.name))),
  ];
  
  if (!pokemons.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortOptions sortOption={sortOption} setSortOption={setSortOption} />
        <TypeFilter
          types={types}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
        <button
          onClick={handleRandomPokemon}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-md hover:scale-105 transform transition-all duration-300"
        >
          {isLoadingRandom ? "Fetching..." : "🎲 Surprise Me!"}
        </button>
      </div>

      {randomPokemon && (
        <div
          ref={randomRef}
          className="mb-12 p-8 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 rounded-3xl shadow-2xl border-2 border-yellow-400 max-w-lg mx-auto transition-transform transform"
        >
          <h2 className="text-4xl font-extrabold text-center text-yellow-800 mb-6 tracking-wider">
            🎲 Random Pokémon
          </h2>
          <div className="flex justify-center min-w-sm">
            <div className="transform hover:scale-105 transition-all duration-300 ease-in-out">
              <PokemonCard pokemon={randomPokemon} />
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={handleClearRandomPokemon}
              className="px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:scale-105 transform transition-all duration-300"
            >
              Clear Pokémon
            </button>
          </div>
        </div>
      )}

      {currentPokemons.length ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentPokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg mt-10">
          No Pokémon found.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;

