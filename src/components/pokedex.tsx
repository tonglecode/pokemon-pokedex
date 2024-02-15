import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pokedex.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

interface Props {}

// Define an interface that represents the structure of the Pokémon data
interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  korean_name: string;
}

const Pokedex: React.FC<Props> = ({}) => {
  // Use the PokemonData[] type for the state variable
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      const allPokemonData: PokemonData[] = []; // Explicitly type as an array of PokemonData
      const startId = (currentPage - 1) * pokemonPerPage + 1;
      const endId = currentPage * pokemonPerPage;

      for (let i = startId; i <= endId; i++) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`
          );
          const speciesResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${i}`
          );
          const koreanName = speciesResponse.data.names.find(
            (name: any) => name.language.name === "ko"
          );
          allPokemonData.push({
            ...response.data,
            korean_name: koreanName ? koreanName.name : "",
          });
        } catch (error) {
          console.error("Failed to fetch data for pokemon with id:", i, error);
        }
      }
      setPokemonData((prevData) => [...prevData, ...allPokemonData]);
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
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
              textAlign: "center",
            }}
            to={`/pokemon/${pokemon.id}`}
          >
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.korean_name}
            />
            <div>
              <p>{pokemon.korean_name}</p>
              <p className="eng">{pokemon.name}</p>
              <br />
              <p>ID: {pokemon.id}</p>
            </div>
          </Link>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Pokedex;
