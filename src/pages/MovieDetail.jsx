import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchMovieDetails from "../services/MovieDetailService";
import fetchMovieCast from "../services/MovieCastService";
import fetchMovieVideos from "../services/MovieVideoService";
import ScrollToTopButton from "../components/ScrollToTop";
import useFavoritesStore from "../stores/favoritesStore";

//Icons
import { FaRegClock } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

/**
 * Movie detail page
 * @param {Object} details - Movie details data
 * @param {Object} genres - Movie genres data
 * @param {Object} productionCompanies - Movie production companies data
 * @param {Object} cast - Movie cast data
 * @param {Object} crew - Movie crew data
 * @param {String} trailerKey - Movie trailer key
 * @param {boolean} isFavorite - Is the movie a favorite
 * @param {Function} toggleFavorite - Toggle favorite function
 * @returns {JSX.Element} The movie detail page
 */
const MovieDetail = () => {
  const [details, setDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const favStatus = details?.id ? isFavorite(details.id) : false;

  /**
   * Format the movie runtime in hours and minutes
   * @param {Number} runtime - Movie runtime in minutes
   * @returns {String} Formatted runtime
   */
  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(id);
        setDetails(movieDetails || []);
        setGenres(movieDetails.genres || []);
        setProductionCompanies(movieDetails.production_companies || []);
      } catch (error) {
        console.error("Failed to fetch movie genres:", error);
      }
    };

    const fetchCast = async () => {
      try {
        const movieCast = await fetchMovieCast(id);
        setCast(movieCast.cast || []);
        setCrew(movieCast.crew || []);
      } catch (error) {
        console.error("Failed to fetch movie cast:", error);
      }
    };

    const fetchVideos = async () => {
      try {
        const videos = await fetchMovieVideos(id);
        const trailer = videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Failed to fetch movie trailer:", error);
      }
    };
    fetchDetails();
    fetchCast();
    fetchVideos();
  }, [id]);

  return (
    <main className="flex-grow text-white">
      <div
        className="bg-cover bg-center h-[300px]"
        style={{
          backgroundImage: `
      linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 60%, rgba(26, 26, 29, 1) 100%), 
      url('https://image.tmdb.org/t/p/original${details.backdrop_path}')
    `,
          backgroundColor: "#1A1A1D",
        }}
      ></div>
      <div className="-mt-[150px] flex sm:flex-row flex-col items-center gap-4 pr-8 sm:pl-24 pl-8 relative">
        <img
          src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
          alt="Poster Image"
          className="w-[300px] h-[450px] shadow-lg"
        />
        <div>
          <div className="flex flex-row gap-4">
            <p className="font-light">{details.release_date}</p>
            <p className="font-light flex items-center gap-1">
              <FaRegClock />
              {formatRuntime(details.runtime)}
            </p>
            <p className="flex flex-row items-center gap-1 font-bold text-movietitle">
              <span className="text-yellow-300">
                <FaStar />
              </span>
              {details.vote_average}
            </p>
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <h1 className="text-5xl font-montserrat font-bold mt-2 mb-2">
              {details.title}
            </h1>
            <button
              onClick={() => {
                console.log("Toggling favorite for:", details.id);
                console.log("Current favorite status:", favStatus);
                toggleFavorite(details);
              }}
              className={`${
                favStatus ? "text-red-500" : "text-white"
              } text-2xl hover:bg-secondary p-3 rounded-full z-10`}
            >
              <FaHeart />
            </button>
          </div>

          <p className="text-lg font-nunito font-semibold mb-2">
            {details.tagline}
          </p>
          <p className="text-base font-light font-nunito mb-6">
            {details.overview}
          </p>
          <div className="flex flex-row flex-wrap gap-6 items-center mb-8">
            Genres
            {genres.map((genre) => (
              <p
                key={genre.id}
                className="border-2 border-gray-600 px-2 py-1 rounded-full font-light font-nunito"
              >
                {genre.name}
              </p>
            ))}
          </div>

          <div className="flex flex-row gap-4 flex-wrap">
            {productionCompanies
              .filter((member) => member.logo_path !== null)
              .map((company) => (
                <div className="flex flex-col w-fit">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt=""
                    className="w-[100px] h-auto"
                  />
                  <p key={company.id}>{company.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl text-gray-300 border-b font-montserrat font-medium mb-4">
          Trailer
        </h3>
        {trailerKey ? (
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available for this movie.</p>
        )}
      </div>
      <div className="p-8">
        <h3 className="text-xl text-gray-300 border-b font-montserrat font-medium">
          Cast
        </h3>
        <div className="flex flex-row flex-wrap sm:grid sm:grid-cols-4 sm:gap-4 sm:gap-y-12 mt-6 justify-start sm:justify-center px-12 ">
          {cast
            .filter(
              (member) => member.name && member.profile_path && member.character
            )
            .map((actor) => (
              <div>
                {actor.profile_path && (
                  <div className="flex flex-row mt-8 sm:mt-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt=""
                      className="w-10 h-10 rounded-full scale-150 mr-6 object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-start font-montserrat font-semibold">
                        {actor.name}
                      </p>
                      <p className="text-start font-nunito text-xs font-light text-[#C9C9C9]">
                        As {actor.character}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-xl text-gray-300 border-b font-montserrat font-medium">
          Crew
        </h3>
        <div className="flex flex-row flex-wrap sm:grid sm:grid-cols-4 sm:gap-4 sm:gap-y-12 mt-6  justify-start sm:justify-center px-12">
          {crew
            .filter(
              (member) => member.name && member.profile_path && member.job
            )
            .map((crew) => (
              <div>
                {crew.profile_path && (
                  <div className="flex flex-row mt-8 sm:mt-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${crew.profile_path}`}
                      alt=""
                      className="w-10 h-10 rounded-full scale-150 mr-6 object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="start font-montserrat font-semibold">
                        {crew.name}
                      </p>
                      <p className="start font-nunito text-xs font-light text-[#C9C9C9]">
                        {crew.job}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <ScrollToTopButton />
    </main>
  );
};

export default MovieDetail;
