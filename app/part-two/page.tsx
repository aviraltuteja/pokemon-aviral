"use client";
import { trpc } from "../_trpc/client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import PokedexTable from "../components/pokedex-table";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { type Pokemon } from "@prisma/client";

export default function PartTwo(): React.ReactElement {
  const pokemonNames = trpc.getAllPokemonNames.useQuery();
  const pokemonOptions = pokemonNames.data ? pokemonNames.data : [];
  const [selectedPokemonNames, setSelectedPokemonNames] = useState<string[]>(
    []
  );
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);

  // Set up the query with `enabled: false`
  const { data: fetchedPokemon, refetch } = trpc.fetchPokemonByNames.useQuery(
    selectedPokemonNames,
    {
      enabled: false,
    }
  );

  // Function to trigger refetch
  const fetchChosenPokemons = () => {
    refetch().then(({ data }) => {
      const selectedPokemon = data || [];
      setSelectedPokemon(selectedPokemon);
    });
  };

  // const fetchedPokemon =
  //   trpc.fetchPokemonByNames.useQuery(selectedPokemonNames);
  // const selectedPokemon = fetchedPokemon.data || [];
  return (
    <div className="flex flex-col justify-center items-center gap-6 p-12 w-full">
      <Link href="/">
        <IconButton>
          <HomeIcon fontSize="large" />
        </IconButton>
      </Link>
      <div className="text-4xl">Part Two</div>
      <div>As you keep on choosing, the list will keep on expanding</div>
      <div>Your chosen pokemons : {selectedPokemonNames.join(", ")}</div>
      <div className="flex gap-2">
        {" "}
        <Button
          className="btn border-md"
          onClick={() => {
            fetchChosenPokemons();
          }}
        >
          Fetch Chosen Pokemons
        </Button>
        <Button
          className="btn border-md"
          onClick={() => {
            setSelectedPokemonNames([]);
            setSelectedPokemon([]);
          }}
        >
          Reset Selection
        </Button>
      </div>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={pokemonOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Pokemon" />}
        onChange={(event, newValue) => {
          setSelectedPokemonNames((prevNames) =>
            newValue ? [...prevNames, newValue] : prevNames
          );
        }}
      />
      <PokedexTable items={selectedPokemon} />
    </div>
  );
}
