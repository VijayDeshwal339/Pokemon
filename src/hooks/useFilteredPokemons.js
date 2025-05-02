import { useMemo } from "react";

const useFilteredPokemons = (pokemons, searchTerm, selectedTypes, sortOption) => {
  return useMemo(() => {
    const filtered = pokemons.filter((pokemon) => {
      const matchName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTypes = selectedTypes.length
        ? selectedTypes.every((type) => pokemon.types.some((t) => t.type.name === type))
        : true;
      return matchName && matchTypes;
    });

    return filtered.sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return a.id - b.id; 
    });
  }, [pokemons, searchTerm, selectedTypes, sortOption]);
};

export default useFilteredPokemons;
