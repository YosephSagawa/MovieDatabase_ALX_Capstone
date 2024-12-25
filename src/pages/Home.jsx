import React from "react";
import PopularMovies from "../components/PopularMovies";

//Components
import MovieSearchForm from "../components/SearchForm";

//Image
import HomeBackground from "../assets/HomeBackground.jpg";
import MovieResults from "../components/MovieResults";

//video
import BackgroundVideo from "../assets/BackgroundVideo.mp4";

const Home = () => {
  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-auto object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      <div className="z-10 relative top-24 flex flex-col items-center justify-center h-screen">
        <MovieSearchForm />
      </div>
      <div className="relative z-10 py-10 mt-32">
        <div>
          <div className="px-8">
            <h1 className="text-xl text-gray-300 border-b font-montserrat font-medium mb-12">
              Search Results
            </h1>
          </div>

          <MovieResults />
        </div>
      </div>
      <div className="relative mx-auto z-10">
        <PopularMovies />
      </div>
    </div>
  );
};

export default Home;
