import { procedure, router } from "./trpc";

export const appRouter = router({
  getPokemon: procedure.query(() => {
    return {
      id: 1,
      name: "Bulbasaur",
      types: ["grass"],
      sprite: "https://pokemon.com/pictures/bulbasaur.png",
    };
  }),
});
