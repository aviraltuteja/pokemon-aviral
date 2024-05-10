import { procedure, router } from "./trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const appRouter = router({
  getPokemon: procedure.query(() => {
    return {
      id: 1,
      name: "Bulbasaur",
      types: ["grass"],
      sprite: "https://pokemon.com/pictures/bulbasaur.png",
    };
  }),
  fetchPokemonByName: procedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const pokemonData = await prisma.pokemon.findMany({
        where: {
          name: input.name,
        },
      });
      return pokemonData;
    }),
});

export type appRouter = typeof appRouter;
