import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchMovieDetails from "../services/MovieDetailService";
import fetchMovieCast from "../services/MovieCastService";

const MovieDetail = () => {
  const [details, setDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(id);
        setDetails(movieDetails || []);
        setGenres(movieDetails.genres || []);
        setProductionCompanies(movieDetails.production_companies || []);
        console.log(movieDetails);
      } catch (error) {
        console.error("Failed to fetch movie genres:", error);
      }
    };

    const fetchCast = async () => {
      try {
        const movieCast = await fetchMovieCast(id);
        setCast(movieCast.cast || []);
        setCrew(movieCast.crew || []);
        console.log(movieCast);
      } catch (error) {
        console.error("Failed to fetch movie cast:", error);
      }
    };
    fetchDetails();
    fetchCast();
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
          backgroundColor: "#1A1A1D", // Matches the background color
        }}
      ></div>
      <div className="-mt-[150px] flex items-center gap-4 pr-8 pl-24 relative">
        <img
          src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
          alt="Poster Image"
          className="w-[300px] h-[450px] shadow-lg"
        />
        <div>
          <p>{details.release_date}</p>
          <p></p>
          <h1 className="text-5xl font-montserrat font-bold mt-2 mb-2">
            {details.title}
          </h1>
          <p className="text-lg font-nunito font-semibold mb-2">
            {details.tagline}
          </p>
          <p className="text-base font-light font-nunito mb-6">
            {details.overview}
          </p>
          <div className="flex flex-row gap-6 items-center mb-8">
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

          <div className="flex flex-row gap-4">
            {productionCompanies.map((company) => (
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
        <h3 className="text-xl text-gray-300 border-b font-montserrat font-medium">
          Cast
        </h3>
        <div className="grid grid-cols-4 gap-4 gap-y-12 mt-6 justify-center px-12 ">
          {cast
            .filter(
              (member) => member.name && member.profile_path && member.character
            )
            .map((actor) => (
              <div>
                {actor.profile_path && (
                  <div className="flex flex-row">
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
        <div className="grid grid-cols-4 gap-4 gap-y-12 mt-6 justify-center px-12">
          {crew
            .filter(
              (member) => member.name && member.profile_path && member.job
            )
            .map((crew) => (
              <div>
                {crew.profile_path && (
                  <div className="flex flex-row">
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
    </main>
  );
};

export default MovieDetail;
