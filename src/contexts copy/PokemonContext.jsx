import { createContext, useEffect, useState } from "react";
import { fetchPokemons } from "../api/pokemonApi";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
    };
    getData();

    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const updated = prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PokemonContext.Provider value={{ pokemons, favorites, toggleFavorite }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
