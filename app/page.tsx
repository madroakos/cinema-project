import MovieList from './components/MovieList';
import { getAllMovies } from '@/prisma/actions';

export default async function Page() {
  const movies = await getAllMovies();

  return (
    <div className="w-full p-6">
      <h1 className="mb-8">Movies</h1>
      <MovieList movies={movies}/>
    </div>
  );
}