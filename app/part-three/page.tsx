"use client";
import { trpc } from "../_trpc/client";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import PokedexTable from "../compoenents/pokedex-table";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function PartThree(): React.ReactElement {
  const pokemonTypes = trpc.getAllTypes.useQuery();
  const pokemonOptions = pokemonTypes.data ? pokemonTypes.data : [];
  const [selectedpokemonTypes, setSelectedpokemonTypes] = useState<string[]>(
    []
  );
  const fetchedPokemon =
    trpc.fetchPokemonByTypes.useQuery(selectedpokemonTypes);
  const selectedPokemon = fetchedPokemon.data || [];
  return (
    <div className="flex flex-col justify-center items-center gap-12 p-12">
      <Link href="/">
        <IconButton>
          <HomeIcon fontSize="large" />
        </IconButton>
      </Link>
      <div className="text-4xl">Part Three</div>
      <div>As you keep on choosing, the list will keep on expanding</div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={pokemonOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Type" />}
        onChange={(event, newValue) => {
          setSelectedpokemonTypes((prevNames) =>
            newValue ? [...prevNames, newValue] : prevNames
          );
        }}
      />
      <PokedexTable items={selectedPokemon} />
    </div>
  );
}
