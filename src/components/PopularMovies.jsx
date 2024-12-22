import React, { useEffect, useState } from "react";
import fetchPopularMovies from "../services/TmdbService";

//Components
import MovieCard from "./MovieCard";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchPopularMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div className="px-8">
      <h1 className="text-xl text-gray-300 border-b font-montserrat font-medium mb-12">
        Popular Movies
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {movies.map((movie) => (
          <MovieCard
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

export default PopularMovies;
