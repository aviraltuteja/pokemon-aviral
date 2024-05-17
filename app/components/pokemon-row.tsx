import { type Pokemon } from "@prisma/client";

export default function PokemonRow({
  item,
}: {
  item: Pokemon | null | undefined;
}): React.ReactElement {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 text-lg md:w-[50rem] w-full gap-20">
      <div className="flex justify-center items-center text-gray-700 w-1/3">
        {item ? item.name : "loading..."}
      </div>
      <div className="flex justify-center items-center text-gray-700 w-1/3">
        {item ? item.types.join(", ") : "loading..."}
      </div>
      <div className="flex justify-center items-center w-1/3">
        <img src={item ? item.sprite : ""} alt="image" className="w-10 h-10" />
      </div>
    </div>
  );
}
