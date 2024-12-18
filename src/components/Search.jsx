import React, { useEffect, useState } from "react";
import fetchPopularMovies from "../services/TmdbService";

const Search = () => {
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
    <div>
      <h1>Popular Movies</h1>
      <div className="flex flex-wrap gap-5">
        {movies.map((movie) => (
          <div key={movie.id} className="text-center w-fit mx-auto">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-[200px] h-[300px] shadow-md rounded-md"
            />
            <p className="font-nunito text-white w-[200px] text-wrap">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
