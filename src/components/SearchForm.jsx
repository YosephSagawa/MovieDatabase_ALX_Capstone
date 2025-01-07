import React, { useState, useEffect } from "react";
import MovieGenreService from "../services/MovieGenreService";
import SearchMovies from "../services/MovieSearchService";
import Discover from "../services/MovieDiscoverService";
import MovieResults from "./MovieResults";
import { IoIosSearch } from "react-icons/io";
import useMoviesStore from "../stores/moviesStore";

/**
 * MovieSearchForm component
 *
 * This component renders a search form for movies.
 * The form has a text input for searching by name, a select input for searching by genre, and two number inputs for searching by rating.
 * The component also renders a button to submit the form.
 * The component uses the MovieSearchService to fetch the movies based on the search criteria.
 * The component uses the useMoviesStore hook to set the movies state in the store.
 * The component uses the useState hook to keep track of the search criteria.
 * The component uses the useEffect hook to fetch the genres from the API and set the genres state.
 * The component uses the handleChange function to update the search criteria state on change.
 * The component uses the handleSubmit function to fetch the movies based on the search criteria on submit.
 * The component renders a MovieResults component to display the search results.
 *
 * @returns {JSX.Element} The MovieSearchForm component
 */
const MovieSearchForm = () => {
  const setMovies = useMoviesStore((state) => state.setMovies);
  const setLoading = useMoviesStore((state) => state.setLoading);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    minRating: 0,
    maxRating: 10,
  });

  /**
   * Fetch the genres from the API and set the genres state.
   */
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

  /**
   * Update the search criteria state on change.
   * @param {React.ChangeEvent<HTMLInputElement>} e The change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Fetch the movies based on the search criteria on submit.
   * @param {React.FormEvent<HTMLFormElement>} e The form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fetchMovies = async () => {
      try {
        if (formData.name) {
          const response = await SearchMovies(formData.name);
          setMovies(response.results);
        } else {
          const response = await Discover(
            formData.genre,
            1,
            formData.minRating,
            formData.maxRating
          );
          setMovies(response.results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
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
        <h1 className="font-montserrat font-semibold text-4xl sm:text-6xl text-white text-center sm:w-3/5">
          What are you in the mood to watch?
        </h1>
        <h3 className="font-nunito w-3/5 sm:w-full sm:font-semibold sm:text-lg text-sm font-light  text-white text-center">
          Ready to watch? Search by name or select a genre
        </h3>
        <div className="bg-searchbg/25 rounded-full w-fit pr-24 sm:pr-72 py-3 flex flex-row">
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
        <button
          type="submit"
          className="text-white w-fit bg-button/40 px-4 py-1 rounded-full hover:bg-button transition-colors duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default MovieSearchForm;
