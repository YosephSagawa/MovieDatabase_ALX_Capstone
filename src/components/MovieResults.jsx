import React from "react";

//components
import MovieCard from "./MovieCard";

const MovieResults = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p>No movies found</p>;
  }
  return (
    <div className="px-8">
      <h1 className="text-xl text-gray-300 border-b font-montserrat font-medium mb-12">
        Search Results
      </h1>
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
