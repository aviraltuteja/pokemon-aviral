"use client";
import { trpc } from "../_trpc/client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import PokedexTable from "../components/pokedex-table";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { Button } from "@mui/material";
import { type Pokemon } from "@prisma/client";

export default function PartThree(): React.ReactElement {
  const pokemonTypes = trpc.getAllTypes.useQuery();
  const pokemonOptions = pokemonTypes.data ? pokemonTypes.data : [];
  const [selectedPokemonTypes, setSelectedPokemonTypes] = useState<string[]>(
    []
  );
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);

  // Set up the query with `enabled: false`
  const { data: fetchedPokemon, refetch } = trpc.fetchPokemonByTypes.useQuery(
    selectedPokemonTypes,
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

  return (
    <div className="flex flex-col justify-center items-center gap-6 p-12 w-full">
      <Link href="/">
        <IconButton>
          <HomeIcon fontSize="large" />
        </IconButton>
      </Link>
      <div className="text-4xl">Part Three</div>
      <div>As you keep on choosing, the list will keep on expanding</div>
      <div>Your chosen types: {selectedPokemonTypes.join(", ")}</div>
      <div className="flex gap-2">
        <Button
          className="btn border-md"
          onClick={() => {
            fetchChosenPokemons();
          }}
        >
          Fetch Pokemons of selected types
        </Button>
        <Button
          className="btn border-md"
          onClick={() => {
            setSelectedPokemonTypes([]);
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
        renderInput={(params) => <TextField {...params} label="Type" />}
        onChange={(event, newValue) => {
          setSelectedPokemonTypes((prevTypes) =>
            newValue ? [...prevTypes, newValue] : prevTypes
          );
        }}
      />
      <PokedexTable items={selectedPokemon} />
    </div>
  );
}
