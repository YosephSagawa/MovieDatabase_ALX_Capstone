import React, { useEffect, useState } from "react";
import MovieGenreService from "../services/MovieGenreService";
import MovieCard from "../components/MovieCard";
import Discover from "../services/MovieDiscoverService";
import ScrollToTopButton from "../components/ScrollToTop";

// Images
import CategoriesBackground from "../assets/CategoriesBackground.jpg";
import TrySearching from "../assets/TrySearching.svg";

const Categories = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const fetchMovies = async (genre, pageNumber = 1) => {
    if (!genre) return;

    try {
      setLoading(true);
      const response = await Discover(genre, pageNumber);
      setMovies(response.results || []);
      setTotalPages(response.total_pages || 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(selectedGenre, 1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
    fetchMovies(selectedGenre, pageNumber);
  };

  return (
    <div>
      {/* Header */}
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

      {/* Genre Selection Form */}
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

      {/* Movies Section */}
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
            {selectedGenre && movies.length !== 0
              ? `Movies in ${
                  genres.find((g) => g.id === Number(selectedGenre))?.name || ""
                }`
              : "Results will show here"}
          </h1>
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4 flex-wrap pb-6">
            {/* Button to go 10 pages back */}
            {page > 10 && (
              <button
                onClick={() => handlePageChange(Math.max(page - 10, 1))}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-secondary text-white rounded"
              >
                &laquo; Prev 10
              </button>
            )}

            {/* Button to go to the previous page */}
            {page > 1 && (
              <button
                onClick={() => handlePageChange(page - 1)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-secondary text-white rounded"
              >
                Prev
              </button>
            )}

            {/* Show only 2 page numbers: current page and next page */}
            {Array.from(
              { length: Math.min(2, totalPages - page + 1) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(page + index)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded ${
                    page === page + index
                      ? "bg-button text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {page + index}
                </button>
              )
            )}

            {/* Button to go to the next page */}
            {page < totalPages && (
              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-secondary text-white rounded"
              >
                Next
              </button>
            )}

            {/* Button to go 10 pages forward */}
            {page <= totalPages - 10 && (
              <button
                onClick={() =>
                  handlePageChange(Math.min(page + 10, totalPages))
                }
                className="px-3 py-1 sm:px-4 sm:py-2 bg-secondary text-white rounded"
              >
                Next 10 &raquo;
              </button>
            )}
          </div>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default Categories;
