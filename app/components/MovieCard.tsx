import React from "react";
import { Movies, Showtimes } from "@prisma/client";
import { formatTimeToHHMM } from "@/scripts/time";

type MovieWithShowtimes = Movies & {
  Showtimes: Showtimes[];
};

export default function MovieCard({ movie }: { movie: MovieWithShowtimes }) {
  return (
    <div className="flex flex-row">
      <figure className="w-48">
        <img src={movie.posterUrl} alt={movie.title} className="rounded-2xl"/>
      </figure>
      <div className="pl-6 flex flex-col gap-2">
        <h2 className="card-title">{movie.title}</h2>
        <div className="flex flex-row gap-2">
            <span>{movie.genre}</span>
            |
            <span>{movie.duration} mins</span>
        </div>
        <div className="card-actions">
          {movie.Showtimes.map((showtime) => (
            <button key={showtime.showtime_id} className="btn btn-primary">
              {formatTimeToHHMM(showtime.showtime)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}