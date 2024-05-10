import { procedure, router } from "./trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const appRouter = router({
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
  fetchPokemonByNames: procedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      const pokemonData = await prisma.pokemon.findMany({
        where: {
          name: {
            in: input,
          },
        },
      });
      return pokemonData;
    }),
  fetchPokemonByTypes: procedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      const pokemonData = await prisma.pokemon.findMany({
        where: {
          types: {
            hasSome: input,
          },
        },
      });
      return pokemonData;
    }),
  getAllPokemonNames: procedure.query(async () => {
    const pokemonNames = await prisma.pokemon.findMany({
      select: {
        name: true,
      },
    });
    return pokemonNames.map((pokemon) => pokemon.name);
  }),
  getAllTypes: procedure.query(async () => {
    const allTypes = await prisma.pokemon.findMany({
      select: {
        types: true,
      },
    });
    const uniqueTypes = new Set(allTypes.flatMap((pokemon) => pokemon.types));
    return Array.from(uniqueTypes);
  }),
});

export type appRouter = typeof appRouter;
