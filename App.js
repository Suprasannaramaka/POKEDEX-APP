
import React, { useEffect, useState } from "react";
import Header from "./components/Header.js";
import PokemonCard from "./components/card.js";
import SearchBar from "./components/Searchbar.js";
import FilterDropdown from "./components/FilterDropdown.js";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();

        const details = await Promise.all(
          data.results.map(async (pokemon) => {
            const response  = await fetch(pokemon.url);
            return await response.json();
          })
        );

        setPokemons(details);
        setFiltered(details);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Pokémon data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let results = pokemons;

    if (searchTerm) {
      results = results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter) {
      results = results.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === typeFilter)
      );
    }

    setFiltered(results);
  }, [searchTerm, typeFilter, pokemons]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <SearchBar setSearchTerm={setSearchTerm} />
        <FilterDropdown setTypeFilter={setTypeFilter} />
      </div>
      {filtered.length === 0 ? (
        <p className="empty">No Pokémon found.</p>
      ) : (
        <div className="pokemon-grid">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
