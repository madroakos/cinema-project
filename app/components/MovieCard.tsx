import React from "react";
import { Movies, Showtimes } from "@prisma/client";
import { formatTimeToHHMM } from "@/scripts/time";

type MovieWithShowtimes = Movies & {
  Showtimes: Showtimes[];
};

export default function MovieCard({ movie }: { movie: MovieWithShowtimes }) {
  return (
    <div className="flex flex-row">
      <figure className="w-52">
        <img src={movie.posterUrl} alt={movie.title} className="rounded-2xl"/>
      </figure>
      <div className="pl-6">
        <h2 className="card-title">{movie.title}</h2>
        <div className="flex flex-row gap-6">
            <span>{movie.genre}</span>
            <span>{movie.duration} min</span>
        </div>
        <div className="card-actions">
          {movie.Showtimes.map((showtime) => (
            <button key={showtime.showtime_id} className="btn btn-primary">
              {formatTimeToHHMM(new Date(showtime.showtime))}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}