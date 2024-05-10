import PokemonRow from "./pokemon-row";
import { Pokemon } from "@prisma/client";

export default function PokedexTable({
  items,
}: {
  items: Pokemon[] | null;
}): React.ReactElement {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <PokemonRow
        item={{ id: 10000, name: "Name", types: ["Type"], sprite: "" }}
      />
      {items?.map((item, key) => {
        return (
          <div key={key}>
            <PokemonRow item={item} />
          </div>
        );
      })}
    </div>
  );
}
