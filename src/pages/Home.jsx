import React from "react";
import PopularMovies from "../components/PopularMovies";

//Components
import MovieSearchForm from "../components/SearchForm";
import ScrollToTopButton from "../components/ScrollToTop";

//Image
import MovieResults from "../components/MovieResults";

//video
import BackgroundVideo from "../assets/BackgroundVideo.mp4";

/**
 * The Home component is the main page of the website.
 * It contains a search bar and two sections: one for search results and one for popular movies.
 * The search results are displayed in a list with a title, a poster, and a vote average.
 * The popular movies are displayed in a list with a title, a poster, and a vote average.
 * The search bar is a text input that allows users to search for movies.
 * The search results are updated in real time as the user types.
 * When the user clicks on a movie, they are taken to the movie details page.
 * The popular movies are fetched from the API on page load.
 * When the user scrolls down, the page is updated with the next page of popular movies.
 * The page also contains a button to scroll to the top of the page.
 */
const Home = () => {
  return (
    <div className="relative">
      {/* The background video is played on page load and is muted. */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full min-h-screen object-cover z-0"
      >
        <source src={BackgroundVideo} type="video/mp4" />
      </video>

      {/* The search bar is positioned at the top of the page and is centered. */}
      <div className="z-10 relative top-24 flex flex-col items-center justify-center h-screen">
        <MovieSearchForm />
      </div>

      {/* The search results are positioned below the search bar and are centered. */}
      <div className="relative z-10 py-10 sm:mt-32">
        <div>
          <div className="px-8">
            <h1 className="text-xl text-gray-300 border-b font-montserrat font-medium mb-12">
              Search Results
            </h1>
          </div>

          {/* The search results are displayed in a list. */}
          <MovieResults />
        </div>
      </div>

      {/* The popular movies are positioned below the search results and are centered. */}
      <div className="relative mx-auto z-10">
        {/* The popular movies are displayed in a list. */}
        <PopularMovies />
      </div>

      {/* The scroll to top button is positioned at the bottom of the page and is centered. */}
      <div className="relative mx-auto z-20">
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default Home;
