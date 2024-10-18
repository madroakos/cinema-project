'use client';
import React from "react";
import { Movies, Showtimes } from "@prisma/client";
import { formatTimeToHHMM } from "@/scripts/time";
import { useRouter } from "next/navigation";

type MovieWithShowtimes = Movies & {
  Showtimes: Showtimes[];
};

export default function MovieCard({ movie }: { movie: MovieWithShowtimes }) {
  const router = useRouter();

  const groupedShowtimes = movie.Showtimes.reduce((acc, showtime) => {
    const { dimension, language } = showtime;
    if (!acc[dimension]) {
      acc[dimension] = {};
    }
    if (!acc[dimension][language]) {
      acc[dimension][language] = [];
    }
    acc[dimension][language].push(showtime);
    return acc;
  }, {} as Record<string, Record<string, Showtimes[]>>);

  return (
    <div className="flex">
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
        <div className="card-actions flex flex-col">
          {Object.entries(groupedShowtimes).map(([dimension, languages]) => (
            <div key={dimension}>
              {Object.entries(languages).map(([language, showtimes]) => (
                <div key={dimension + language}>
                  <h4 className="flex flex-row gap-2 mt-3 mb-2">
                    <div className="badge badge-neutral text-xs sm:text-sm">{dimension}</div>
                    <div className="badge badge-neutral text-xs sm:text-sm">{language}</div>
                    {showtimes[0].subtitle && showtimes[0].subtitle.toLowerCase() !== "none" && (
                      <div className="badge badge-neutral text-xs text-nowrap sm:text-sm">
                        {showtimes[0].subtitle}
                      </div>
                    )}
                  </h4>
                  <div className="flex flex-row gap-3">
                    {showtimes.map((showtime) => (
                      <button key={showtime.showtime_id} className="btn btn-primary" onClick={() => router.push(`/reservation/${showtime.showtime_id}`)}>
                        {formatTimeToHHMM(new Date(showtime.showtime))}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}