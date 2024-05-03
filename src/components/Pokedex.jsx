import React, { useState, useEffect } from "react";
import pokearena from "./../img/pokebattle.jpeg";

const Pokedex = () => {
  const [pokeList, setPokeList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0")
      .then((res) => res.json())
      .then((data) => {
        setPokeList(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemonImageUrl(data.sprites.back_default);
          setPokemonAbilities(
            data.abilities.map((ability) => ability.ability.name)
          );
        })
        .catch((err) => console.error(err));
    } else {
      // Reset image and abilities when no Pokemon is selected
      setPokemonImageUrl("");
      setPokemonAbilities([]);
    }
  }, [selectedPokemon]);

  const handleSelectChange = (e) => {
    setSelectedPokemon(e.target.value);
  };

  return (
    

    
    <div
      style={{
        backgroundImage: `url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d843fov-5ad2d436-789b-48f4-91ac-7a553ca26306.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg0M2Zvdi01YWQyZDQzNi03ODliLTQ4ZjQtOTFhYy03YTU1M2NhMjYzMDYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4WU23QrSu_7CD6c4MJIYPEeIvE5o8maEEkqYM40mwus')`
      }}
      className="h-screen w-screen bg-no-repeat bg-contain bg-center mt-10">
        
      
      
      <div className="text-white">
        <select value={selectedPokemon} onChange={handleSelectChange}>
          <option value="" className="h-12">
            <p className="text-blacka">Pokemon</p>
          </option>
          {pokeList.map((pokemon, index) => (
            <option key={index} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
        {selectedPokemon && (
          <div>
            <p className="mt-4">You selected: {selectedPokemon}</p>

            {pokemonImageUrl && (
              <img
                src={pokemonImageUrl}
                alt={selectedPokemon}
                className="h-32 w-32 ml-32"
              />
            )}

            <div className="pokemon-abilities  ">
              {pokemonAbilities.map((ability, index) => (
                <div key={index} className="">
                  {ability}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Pokedex;
