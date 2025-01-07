import React from "react";
import useMoviesStore from "../stores/moviesStore";

//components
import MovieCard from "./MovieCard";

//Images
import TrySearching from "../assets/TrySearching.svg";

const MovieResults = () => {
  const movies = useMoviesStore((state) => state.movies);
  const loading = useMoviesStore((state) => state.loading);

  if (loading) {
    return (
      <div className="px-8 mx-auto">
        <div class="flex flex-row gap-2 justify-center">
          <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <p className="text-white/25 text-center text-xl mt-9">
          Searching for movies
        </p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="px-8">
        <img src={TrySearching} alt="Try Searching" className="w-64 mx-auto" />
        <p className="text-white/25 text-center text-xl">
          Try searching for a movie to see results
        </p>
      </div>
    );
  }
  return (
    <div className="px-8">
      <div className="flex flex-wrap gap-x-20 gap-y-4 lg:gap-4 justify-center mb-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieResults;
