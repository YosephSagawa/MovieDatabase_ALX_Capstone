import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchMovieDetails from "../services/MovieDetailService";

const MovieDetail = () => {
  const [details, setDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const [productionCompanies, setProductionCompanies] = useState([]);
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
    fetchDetails();
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
          <div className="flex flex-row gap-6 items-center">
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
        <p className="text-lg text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          interdum.
        </p>
      </div>
    </main>
  );
};

export default MovieDetail;
