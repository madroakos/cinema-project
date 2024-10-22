'use client'
import { Movies } from "@prisma/client";
import { useRouter } from "next/navigation";

interface MoviePickerProps {
  movies: Movies[];
}

const MoviePicker: React.FC<MoviePickerProps> = ({ movies }) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const movieId = event.target.value;

    if (movieId) {
      router.push(`?movie=${movieId}`);
    } else {
      router.push("/");
    }
  };
  
  return (
    <div className="mb-6">
      <select
        name="movies"
        id="movies"
        className="select select-bordered w-full"
        onChange={handleChange}
      >
        <option value="">
          Choose a movie
        </option>
        {movies.map((movie) => (
          <option key={movie.movie_id} value={movie.movie_id}>
            {movie.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MoviePicker;