import { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../contexts/PokemonContext";

const PokemonCard = ({ pokemon }) => {
  const { favorites, toggleFavorite } = useContext(PokemonContext);
  const isFavorite = favorites.includes(pokemon.name);

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="w-full">
      <div className="bg-gradient-to-b from-white to-gray-100 p-6 rounded-2xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center relative">
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent navigation when clicking heart
            toggleFavorite(pokemon.name);
          }}
          className={`absolute cursor-pointer top-2 right-2 text-xl transition ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          ♥
        </button>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24 mb-4 drop-shadow-md"
        />
        <h2 className="capitalize text-xl font-bold text-gray-800">{pokemon.name}</h2>
        <p className="text-gray-500 text-sm mb-3">
          ID: #{pokemon.id.toString().padStart(3, '0')}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {pokemon.types.map((typeObj) => (
            <span
              key={typeObj.type.name}
              className="bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full text-xs capitalize"
            >
              {typeObj.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
