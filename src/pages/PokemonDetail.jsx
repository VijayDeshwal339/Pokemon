import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();
        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        const extractEvolutions = (chain) => {
          const evoNames = [];
          let current = chain;
          while (current) {
            evoNames.push(current.species.name);
            current = current.evolves_to[0];
          }
          return evoNames;
        };

        setEvolution(extractEvolutions(evoData.chain));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) return <div className="flex justify-center items-center h-64"><Loading /></div>;
  if (!pokemon) return <p className="text-center mt-8">Pokémon not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-500 underline">&larr; Back</Link>
      <div className="mt-6 bg-white shadow-lg rounded-xl p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 mb-4"
          />
          <h1 className="text-3xl font-bold capitalize mb-2">{pokemon.name}</h1>
          <p className="text-gray-500 mb-2">ID: #{pokemon.id}</p>

          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {pokemon.types.map(t => (
              <span key={t.type.name} className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm capitalize">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-2">Stats</h2>
        <ul className="grid grid-cols-2 gap-2">
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name} className="capitalize text-sm">
              {stat.stat.name}: <span className="font-semibold">{stat.base_stat}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Abilities</h2>
        <ul className="list-disc ml-6 text-sm">
          {pokemon.abilities.map(ab => (
            <li key={ab.ability.name} className="capitalize">{ab.ability.name}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">Moves</h2>
        <div className="flex flex-wrap gap-2 text-sm max-h-32 overflow-y-auto">
          {pokemon.moves.map(move => (
            <span key={move.move.name} className="bg-gray-100 px-2 py-1 rounded capitalize">
              {move.move.name}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-4 mb-2">Evolution Chain</h2>
        <div className="flex flex-wrap gap-4 text-sm capitalize">
          {evolution.map((evoName, index) => (
            <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              {evoName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
