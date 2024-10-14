import prisma from "@/prisma/db";
import React from "react";
import { formatTimeToHHMM } from "@/scripts/time";
import MovieCard from "./components/MovieCard";
import DatePicker from "./components/DatePicker";

export default async function Page() {
  const movies = await prisma.movies.findMany( {
    include: {
      Showtimes: true,
    }
  } );

  return (
    <div className="w-full p-6">
      <h1 className="mb-8">Movies</h1>
      {/* <DatePicker /> */}
      <ul>
        {movies.map((movie) => (
          <MovieCard key={movie.movie_id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};