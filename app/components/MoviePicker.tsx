import { Movies } from "@prisma/client";

interface MoviePickerProps {
  movies: Movies[];
  onChange: (movieId: string) => void;
}

const MoviePicker: React.FC<MoviePickerProps> = ({ movies, onChange }) => {
  return (
    <div className="mb-6">
      <select
        name="movies"
        id="movies"
        className="w-full p-2 text-lg rounded-xl"
        defaultValue="Choose a movie"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Choose a movie" disabled>
          Choose a movie
        </option>
        {movies.map((movie) => (
          <option key={movie.movie_id} value={movie.title}>
            {movie.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MoviePicker;