import { type Pokemon } from "@prisma/client";

export default function PokemonRow({
  item,
}: {
  item: Pokemon | null | undefined;
}): React.ReactElement {
  return (
    <div className="flex  w-full md:h-1/6 h-auto gap-12 justify-center items-center my-4 text-xl text-center overflow-scroll">
      <div className="w-1/3 justify-center text-center flex-grow">
        {" "}
        {item ? item.name : ""}
      </div>
      <div className="w-1/3 justify-center text-center flex-grow">
        {item ? item.types : ""}
      </div>
      <div className="w-1/3 justify-center text-center flex-grow">
        <img src={item ? item.sprite : ""} alt="pokemon image"></img>
      </div>
    </div>
  );
}
