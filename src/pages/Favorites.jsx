import { useContext, useEffect, useState } from 'react';
import { fetchPokemons } from '../api/pokemonApi';
import PokemonCard from '../components/PokemonCard';
import { PokemonContext } from '../contexts/PokemonContext';

const FavoritesPage = () => {
  const { favorites } = useContext(PokemonContext);
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons();
      setAllPokemons(data);
    };
    getPokemons();
  }, []);

  const favoritePokemons = allPokemons.filter(p => favorites.includes(p.name));

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">My Favorite Pokémon</h1>
      {favoritePokemons.length === 0 ? (
        <p className="text-center">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {favoritePokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
