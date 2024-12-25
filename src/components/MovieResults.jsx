import React from "react";
import useMoviesStore from "../stores/moviesStore";

//components
import MovieCard from "./MovieCard";

const MovieResults = () => {
  const movies = useMoviesStore((state) => state.movies);
  if (!movies || movies.length === 0) {
    return (
      /* From Uiverse.io by Javierrocadev */
      <div class="relative rounded-lg -skew-x-6 -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500 w-72 h-44 p-2 bg-neutral-50 card-compact hover:bg-base-200 transition-all [box-shadow:12px_12px] hover:[box-shadow:4px_4px]">
        <figure class="w-full h-full">
          <div
            alt="change to a img tag"
            class="bg-neutral-800 text-neutral-50 min-h-full rounded-lg border border-opacity-5"
          ></div>
        </figure>
        <div class="absolute text-neutral-50 bottom-4 left-0 px-4">
          <span class="font-bold">No matches found</span>
          <p class="text-sm opacity-60 line-clamp-2">Try searching again.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="px-8">
      <div className="flex flex-wrap gap-4 justify-center mb-6">
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
