import React, { useState, useEffect } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
// import pokearena from "./img/pokebattle.jpeg";
import backGround from "./assets/pokemonbattle.webp";

const App = () => {
  const [pokeList, setPokeList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemonImageUrl, setPokemonImageUrl] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [selectedPokemonEnemy, setSelectedPokemonEnemy] = useState("");
  const [pokemonImageUrlEnemy, setPokemonImageUrlEnemy] = useState("");
  const [pokemonAbilitiesEnemy, setPokemonAbilitiesEnemy] = useState([]);

  const bgImg = {
    backgroundImage: `url(${backGround})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100vw", // ความกว้างเต็มหน้าจอ
    height: "100vh", // ความสูงเต็มหน้าจอ
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

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
          setPokemonImageUrl(data.sprites.other.showdown.back_default);
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
  
  useEffect(() => {
    if (selectedPokemonEnemy) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonEnemy}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemonImageUrlEnemy(data.sprites.other.showdown.front_default);
          setPokemonAbilitiesEnemy(
            data.abilities.map((ability) => ability.ability.name)
          );
        })
        .catch((err) => console.error(err));
    } else {
      // Reset image and abilities when no Pokemon is selected
      setPokemonImageUrlEnemy("");
      setPokemonAbilitiesEnemy([]);
    }
  }, [selectedPokemonEnemy]);

  const handleSelectEnemyChange = (e) => {
    setSelectedPokemonEnemy(e.target.value);
  };
  

 

  return (
    <div style={bgImg}>
      <div className="grid grid-cols-2 grid-rows-2 gap-24 w-full h-full ">
        <div></div>
        {/* กล่อง2 */}
        <div>
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            <div></div>
            <div>
            <select value={selectedPokemonEnemy} onChange={handleSelectEnemyChange} className="mt-24">
                  <option>
                    <p className="text-black">Pokemon</p>
                  </option>
                  {pokeList.map((pokemon, index) => (
                    <option key={index} value={pokemon.name}>
                      {pokemon.name}
                    </option>
                  ))}
                </select>

            </div>
            <div>

            {selectedPokemonEnemy && (
                <div>
                  <p className="text-3xl text-bold text-black flex justify-center h-10 text-stroke  bg-yellow-200 rounded-lg ">
                    You selected: {selectedPokemonEnemy}
                  </p>

                  {pokemonImageUrlEnemy && (
                    <img
                      src={pokemonImageUrlEnemy}
                      alt={pokemonAbilitiesEnemy}
                      className="h-48 w-48 mt-7"
                    />
                  )}

                  <div className="pokemon-abilities">
                    {pokemonAbilitiesEnemy.map((ability, index) => (
                      <div
                        key={index}
                        className="text-3xl text-bold text-black flex justify-center h-10 text-stroke mb-1 mt-3 bg-yellow-200 rounded-lg "
                      >
                        {ability}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              

            </div>
            <div></div>
          </div>
        </div>
        <div>
          {/* กล่อง3 */}
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
            <div></div>
            <div>
              {selectedPokemon && (
                <div>
                  <p className="text-3xl text-bold text-black flex justify-center h-10 text-stroke  bg-yellow-200 rounded-lg ">
                    You selected: {selectedPokemon}
                  </p>

                  {pokemonImageUrl && (
                    <img
                      src={pokemonImageUrl}
                      alt={selectedPokemon}
                      className="h-48 w-48 mt-7"
                    />
                  )}

                  <div className="pokemon-abilities">
                    {pokemonAbilities.map((ability, index) => (
                      <div
                        key={index}
                        className="text-3xl text-bold text-black flex justify-center h-10 text-stroke mb-1 mt-3 bg-yellow-200 rounded-lg "
                      >
                        {ability}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="col-start-1 row-start-2 flex justify-center items-center mb-24">
                <select value={selectedPokemon} onChange={handleSelectChange}>
                  <option>
                    <p className="text-black">Pokemon</p>
                  </option>
                  {pokeList.map((pokemon, index) => (
                    <option key={index} value={pokemon.name}>
                      {pokemon.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div></div>
          </div>
          {/* กล่อง3 */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default App;
