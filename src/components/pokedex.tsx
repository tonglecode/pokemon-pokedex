import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pokedex.css";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {}

const Pokedex: React.FC<Props> = ({}) => {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 12;
  useEffect(() => {
    const fetchData = async () => {
      const allPokemonData = [];
      for (let i = 1; i <= currentPage * pokemonPerPage; i++) {
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
  }, [currentPage]);

  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={pokemonData.length}
      next={fetchMoreData}
      hasMore={currentPage * pokemonPerPage < 151}
      loader={<h4>Loading...</h4>}
      endMessage={<p>All Pokémon have been loaded</p>}
      className="container"
    >
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="pokemon">
          <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
          <div>
            <p>{pokemon.korean_name}</p>
            <p className="eng">{pokemon.name}</p>
            <br />
            <p>ID: {pokemon.id}</p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Pokedex;
