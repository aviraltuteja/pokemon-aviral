"use client";
import { trpc } from "./_trpc/client";
export default function Home() {
  const randomdata = trpc.getPokemon.useQuery();
  const pokemon = trpc.fetchPokemonByName.useQuery({ name: "Pikachu" });
  console.log(pokemon);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{JSON.stringify(randomdata.data)}</div>
      <div>{JSON.stringify(pokemon.data)}</div>
    </main>
  );
}
