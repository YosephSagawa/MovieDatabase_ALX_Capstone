import React, { useState, useEffect } from "react";
import MovieGenreService from "../services/MovieGenreService";
import SearchMovies from "../services/MovieSearchService";
import Discover from "../services/MovieDiscoverService";
import MovieResults from "./MovieResults";
import { IoIosSearch } from "react-icons/io";
import useMoviesStore from "../stores/moviesStore";

const MovieSearchForm = () => {
  const setMovies = useMoviesStore((state) => state.setMovies);
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
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4 p-6"
      >
        <h1 className="font-montserrat font-semibold text-8xl text-white text-center">
          What are you in the mood to watch?
        </h1>
        <h3 className="font-nunito font-semibold text-3xl text-white text-center">
          Ready to watch? Search by name or select a genre
        </h3>
        <div className="bg-searchbg/25 rounded-full w-fit pr-72 py-3 flex flex-row">
          <IoIosSearch className="text-white font-medium text-3xl mx-2" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Search for a movie"
            className="bg-transparent focus:outline-none text-white"
          />
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="bg-searchbg/25 rounded-full w-fit py-3 px-2">
            <select
              name="genre"
              id="genre"
              value={formData.genre}
              onChange={handleChange}
              className="bg-transparent focus:outline-none text-white/45"
            >
              <option value="" className="bg-primary text-white">
                Select Genre
              </option>
              {genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  className="bg-primary text-white"
                >
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row w-fit items-center">
            <div className="bg-searchbg/25 rounded-full w-fit py-3 px-3">
              <input
                type="number"
                name="minRating"
                value={formData.minRating}
                onChange={handleChange}
                min="0"
                max="10"
                placeholder="Min Rating"
                className="bg-transparent focus:outline-none text-white"
              />
            </div>
            <span className="text-white mx-2">-</span>
            <div className="bg-searchbg/25 rounded-full w-fit py-3 px-3">
              <input
                type="number"
                name="maxRating"
                value={formData.maxRating}
                onChange={handleChange}
                min="0"
                max="10"
                placeholder="Max Rating"
                className="bg-transparent focus:outline-none text-white"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="text-white w-fit">
          Search
        </button>
      </form>
    </div>
  );
};

export default MovieSearchForm;