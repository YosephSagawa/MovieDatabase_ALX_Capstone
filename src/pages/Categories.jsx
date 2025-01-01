import React from "react";
import MovieGenreService from "../services/MovieGenreService";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Discover from "../services/MovieDiscoverService";
import ScrollToTopButton from "../components/ScrollToTop";

//Images
import CategoriesBackground from "../assets/CategoriesBackground.jpg";
import TrySearching from "../assets/TrySearching.svg";

const Categories = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchMovies = async () => {
      try {
        const response = await Discover(selectedGenre, 0, 10);
        setMovies(response.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    await fetchMovies();
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 60%, rgba(26, 26, 29, 1) 100%), url(${CategoriesBackground})`,
          height: "300px",
          width: "100%",
        }}
      >
        <h1 className="text-5xl font-normal text-textreel text-center pt-36 font-montserrat">
          EXPLORE GENRES
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center py-6">
        <div className="bg-searchbg/25 rounded-full w-fit py-3 px-2">
          <select
            name="genres"
            id="genres"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
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
          <button type="submit" className="text-white">
            Submit
          </button>
        </div>
      </form>

      {!movies || movies.length === 0 ? (
        <div className="px-8 pb-8">
          <img
            src={TrySearching}
            alt="Try Searching"
            className="w-64 mx-auto"
          />
          <p className="text-white/25 text-center text-xl">
            Try searching for a movie to see results
          </p>
        </div>
      ) : (
        <div className="px-8">
          <h1 className="text-xl text-gray-300 border-b font-montserrat font-medium mb-12">
            {selectedGenre && (movies || movies.length !== 0)
              ? `Movies in ${
                  genres.find((g) => g.id === Number(selectedGenre))?.name || ""
                }`
              : "Results will show here"}
          </h1>
          <div className="flex flex-wrap gap-x-20 gap-y-4 lg:gap-4 justify-center mb-6">
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
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default Categories;
