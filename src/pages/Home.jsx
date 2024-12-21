import React from "react";
import PopularMovies from "../components/PopularMovies";

//Image
import HomeBackground from "../assets/HomeBackground.jpg";

const Home = () => {
  return (
    <div>
      <div>
        <div>
          <img
            src={HomeBackground}
            alt="Joker background Image"
            className="w-full h-auto bg-cover bg-center"
          />
        </div>
        <div className="mx-auto">
          <PopularMovies />
        </div>
      </div>
    </div>
  );
};

export default Home;
