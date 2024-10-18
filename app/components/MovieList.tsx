'use client';
import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { Movies, Showtimes } from '@prisma/client';
import MoviePicker from './MoviePicker';

interface MovieWithShowtimes extends Movies {
    Showtimes: Showtimes[];
}

interface MovieListProps {
  movies: MovieWithShowtimes[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [filter, setFilter] = useState<string>('');

  const filteredMovies = filter
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(filter.toLowerCase())
      )
    : movies;

  return (
    <div className='flex flex-col gap-12'>
        <MoviePicker movies={movies} onChange={setFilter}/>
        {filteredMovies.map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
        ))}
    </div>
  );
};

export default MovieList;