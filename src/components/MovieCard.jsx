import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import fetchMovieDetails from "../services/MovieDetailService";
import { NavLink } from "react-router-dom";

/**
 * A reusable React component to display a movie card.
 * @param {string} id The ID of the movie.
 * @param {string} title The title of the movie.
 * @param {string} poster_path The path to the movie poster.
 * @param {number} vote_average The average rating of the movie.
 */
const MovieCard = ({ id, title, poster_path, vote_average }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    /**
     * Fetch the movie details and set the genres state.
     */
    const fetchGenres = async () => {
      try {
        const movieDetails = await fetchMovieDetails(id);
        setGenres(movieDetails.genres || []);
      } catch (error) {
        console.error("Failed to fetch movie genres:", error);
      }
    };
    fetchGenres();
  }, [id]);

  return (
    <NavLink to={`/movies/${id}`}>
      <div
        key={id}
        className="text-start
     w-fit mx-auto bg-secondary rounded-xl items-center gap-4 overflow-hidden justify-center"
      >
        <div className="relative w-[225px] h-[337.5px] overflow-hidden group">
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={title}
            className="w-full h-full object-cover shadow-md group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <button className="text-white rounded-lg">View Details</button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-2">
          <div className="flex flex-col">
            <p className="font-montserrat text-sm text-movietitle w-[150px] text-wrap font-medium mb-1">
              {title}
            </p>
            <p className="font-nunito text-gray-200 text-xs text-wrap truncate w-[150px]">
              {genres.map((genre) => genre.name).join(",")}
            </p>
          </div>

          <p className="font-nunito text-white flex flex-row items-center">
            <span className="text-yellow-300">
              <FaStar />
            </span>
            {vote_average}
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default MovieCard;
