import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import pokemons from "./pokemon/pokemon.json";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { getColors } from "./utils/ReturnCardColor";
import Header from "./components/Header/Header.js";
const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  
  }
`;
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  justify-items: center;
`;
function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [typeSelected, setTypeSelected] = useState();
  const [orderSelected, setOrderSelected] = useState("order");

  return (
    <>
      <GlobalStyle />
      <Header
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
        orderSelected={orderSelected}
        setOrderSelected={setOrderSelected}
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        pesquisa={pesquisa}
        setPesquisa={setPesquisa}
      />
      <CardsContainer>
        {pokemons
          .filter((pokemon) => {
            return idFilter ? pokemon.id.includes(idFilter) : pokemon;
          })
          .filter((pokemon) => {
            return pokemon.name.english
              .toLowerCase()
              .includes(pesquisa.toLowerCase());
          })

          .filter((pokemon) => {
            if (
              pokemon.type[0] === typeSelected ||
              pokemon.type[1] === typeSelected
            ) {
              return true;
            } else if (!typeSelected) {
              return pokemon;
            }
          })
          .sort((currentPokemon, nexPokemon) => {
            if (orderSelected === "asc") {
              return currentPokemon.name.english.localeCompare(
                nexPokemon.name.english
              );
            } else if (orderSelected === "desc") {
              return nexPokemon.name.english.localeCompare(
                currentPokemon.name.english
              );
            } else {
              return "order";
            }
          })

          .map((pokemon) => {
            return (
              <PokemonCard
                cardColor={getColors(pokemon.type[0])}
                key={pokemon.id}
                pokemon={pokemon}
              />
            );
          })}
      </CardsContainer>
    </>
  );
}

export default App;
