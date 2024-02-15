import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pokedex.css";

interface Props {}

const Pokedex: React.FC<Props> = ({}) => {
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allPokemonData = [];
      for (let i = 1; i <= 12; i++) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        );
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${i}`
        );
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        allPokemonData.push({ ...response.data, korean_name: koreanName.name });
      }
      setPokemonData(allPokemonData);
    };

    fetchData();
    console.log(pokemonData);
  }, []);

  const renderPokemonList = () => {
    return pokemonData.map((pokemon) => (
      <div key={pokemon.id} className="pokemon">
        <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
        <div>
          <p>{pokemon.korean_name}</p>
          <p className="eng">{pokemon.name}</p>
          <br />
          <p>ID: {pokemon.id}</p>
        </div>
      </div>
    ));
  };

  return <div className="container">{renderPokemonList()}</div>;
};

export default Pokedex;
