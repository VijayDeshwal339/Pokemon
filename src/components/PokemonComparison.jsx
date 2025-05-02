import React, { useState, useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const PokemonComparison = () => {
  const { pokemons } = useContext(PokemonContext);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  const handlePokemonSelect = (event, index) => {
    const selectedPokemon = pokemons.find(pokemon => pokemon.id === parseInt(event.target.value));
    if (index === 1) {
      setPokemon1(selectedPokemon);
    } else {
      setPokemon2(selectedPokemon);
    }
  };

  const renderComparison = () => {
    if (!pokemon1 || !pokemon2) return <p className="mt-4 text-center text-gray-600">Please select two Pokémon to compare.</p>;

    const statsComparison = pokemon1.stats.map((stat1, index) => {
      const stat2 = pokemon2.stats[index];
      return (
        <div key={stat1.stat.name} className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-medium text-center w-1/3">{stat1.stat.name}</span>
          <span className="text-center w-1/3">{stat1.base_stat}</span>
          <span className="text-center w-1/3">{stat2.base_stat}</span>
        </div>
      );
    });

    return (
      <div className="mt-8 space-y-6">
        <h3 className="text-2xl text-center font-semibold text-blue-600">Comparison</h3>
        <div className="flex flex-col md:flex-row justify-between items-center space-x-8 mt-4">
          <div className="text-center w-full md:w-1/2 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold">{pokemon1.name}</h4>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon1.id}.png`}
              alt={pokemon1.name}
              className="mx-auto w-32 h-32 shadow-lg rounded-full transform hover:scale-110 transition duration-300"
            />
          </div>
          <div className="text-center w-full md:w-1/2">
            <h4 className="text-lg font-semibold">{pokemon2.name}</h4>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon2.id}.png`}
              alt={pokemon2.name}
              className="mx-auto w-32 h-32 shadow-lg rounded-full transform hover:scale-110 transition duration-300"
            />
          </div>
        </div>
        <div className="mt-4 border-t pt-4">
          <h5 className="text-lg font-semibold text-center text-blue-600">Stats Comparison:</h5>
          <div className="mt-4">
            {statsComparison}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-xl max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Compare Pokémon</h2>
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-medium mb-3">Select Pokémon 1</h3>
          <select
            onChange={(e) => handlePokemonSelect(e, 1)}
            value={pokemon1 ? pokemon1.id : ""}
            className="w-full px-4 py-3 text-sm font-medium rounded-lg border-2 border-blue-400 bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
          >
            <option value="" disabled>Select a Pokémon</option>
            {pokemons.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-medium mb-3">Select Pokémon 2</h3>
          <select
            onChange={(e) => handlePokemonSelect(e, 2)}
            value={pokemon2 ? pokemon2.id : ""}
            className="w-full px-4 py-3 text-sm font-medium rounded-lg border-2 border-blue-400 bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
          >
            <option value="" disabled>Select a Pokémon</option>
            {pokemons.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {renderComparison()}
    </div>
  );
};

export default PokemonComparison;
