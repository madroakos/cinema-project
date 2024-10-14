
import prisma from "@/prisma/db";
import React from "react";
import MovieList from "@/app/components/MovieList";

export default async function Page() {
  const movies = await prisma.movies.findMany({
    include: {
      Showtimes: true,
    },
  });

  return (
    <div className="w-full p-6">
      <h1 className="mb-8">Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};