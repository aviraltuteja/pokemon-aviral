"use client";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { Button, IconButton } from "@mui/material";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center items-center">
        <IconButton>
          <CatchingPokemonIcon fontSize="large" />
        </IconButton>
        <div className="text-4xl">Pokedex Clone by Aviral Tuteja</div>
      </div>
      <div>
        <Link href="/part-one">
          <Button variant="outlined">Part One</Button>
        </Link>
        <Link href="/part-two">
          <Button variant="outlined">Part Two</Button>
        </Link>
        <Link href="/part-three">
          <Button variant="outlined">Part Three</Button>
        </Link>
      </div>
      <div>
        Tools used : tRPC with React Query, Prisma ORM with PostgreSQL, NextJS
        with Typescript and App Router, Tailwind, Material UI
      </div>
      <div className="text-center">
        No styles have been added here because of some personal issues. To check
        out my front end skills, visit{" "}
        <span className="text-xl text-[#1212fe] ">
          <Link href="https://aviraltuteja.netlify.app/">My Portfolio</Link>
        </span>{" "}
        which has been made completely in React using MaterialUI and Framer
        Motion.
      </div>
    </main>
  );
}
