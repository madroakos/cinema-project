'use client'
import React from 'react';
import MovieCard from './MovieCard';
import { Movies, Showtimes } from '@prisma/client';
import MoviePicker from './MoviePicker';
import { useSearchParams } from 'next/navigation';

interface MovieWithShowtimes extends Movies {
  Showtimes: Showtimes[];
}

interface MovieListProps {
movies: MovieWithShowtimes[];
}

export default function MovieList({ movies }: MovieListProps) {
  const searchParams = useSearchParams();
  const choosenMovie = searchParams.get('movie');

  return (
    <div className='flex flex-col gap-12'>
        <MoviePicker movies={movies}/>
        {choosenMovie ? (
          movies
            .filter((movie) => movie.movie_id === Number(choosenMovie))
            .map((movie) => (
              <MovieCard key={movie.movie_id} movie={movie} />
            ))
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))
        )}
    </div>
  );
};