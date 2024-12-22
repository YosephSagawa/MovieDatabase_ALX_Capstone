import React, { useState, useEffect } from "react";
import MovieGenreService from "../services/MovieGenreService";
import SearchMovies from "../services/MovieSearchService";
import Discover from "../services/MovieDiscoverService";
import MovieCard from "./MovieCard";
import MovieResults from "./MovieResults";

const MovieSearchForm = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    minRating: 0,
    maxRating: 10,
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await MovieGenreService();
        setGenres(response);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchMovies = async () => {
      try {
        if (formData.name) {
          const response = await SearchMovies(formData.name);
          setMovies(response.results);
        } else {
          const response = await Discover(
            formData.genre,
            formData.minRating,
            formData.maxRating
          );
          setMovies(response.results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    await fetchMovies();
  };
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <form onSubmit={handleSubmit} className="-mt-[500px] mb-[300px]">
        <h1>What are you in the mood to watch?</h1>
        <h3>Ready to watch? Search by name or select a genre</h3>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Search for a movie"
          />
        </div>
        <div>
          <select
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <input
              type="number"
              name="minRating"
              value={formData.minRating}
              onChange={handleChange}
              min="0"
              max="10"
              placeholder="Min Rating"
            />
            <span>-</span>
            <input
              type="number"
              name="maxRating"
              value={formData.maxRating}
              onChange={handleChange}
              min="0"
              max="10"
              placeholder="Max Rating"
            />
          </div>
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
      <MovieResults movies={movies} />
    </div>
  );
};

export default MovieSearchForm;
