"use client";
import { trpc } from "../_trpc/client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import PokemonRow from "../compoenents/pokemon-row";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function partOne(): React.ReactElement {
  const pokemonNames = trpc.getAllPokemonNames.useQuery();
  const pokemonOptions = pokemonNames.data ? pokemonNames.data : [];

  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const pokemon = trpc.fetchPokemonByName.useQuery({
    name: selectedPokemon ? selectedPokemon : "",
  });

  return (
    <div className="flex flex-col justify-center items-center p-12 gap-12">
      <Link href="/">
        <IconButton>
          <HomeIcon fontSize="large" />
        </IconButton>
      </Link>
      <div className="text-4xl">Part One</div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={pokemonOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Pokemon" />}
        onChange={(event, newValue) => {
          setSelectedPokemon(newValue);
        }}
      />
      {selectedPokemon && (
        <PokemonRow item={pokemon && pokemon.data ? pokemon.data[0] : null} />
      )}
    </div>
  );
}
