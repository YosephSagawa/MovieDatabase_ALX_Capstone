import React, { useEffect } from "react";
import useFavoritesStore from "../stores/favoritesStore";
import MovieCard from "../components/MovieCard";

//Images
import FavoritesBackground from "../assets/FavoritesBackground.jpg";
import Popcorn from "../assets/Popcorn.png";

/**
 * Favorites Component
 *
 * This component displays the user's favorite movies.
 *
 * @returns {JSX.Element} The Favorites component
 */
const Favorites = () => {
  /**
   * Get the user's favorite movies from the store
   */
  const { favorites } = useFavoritesStore();

  /**
   * Log the favorite movies when the component mounts
   */
  useEffect(() => {
    console.log("Favorites Array:", favorites);
  }, [favorites]);

  return (
    <div>
      <div
        style={{
          /**
           * Set the background image and gradient
           * to create a darkened image with a colored
           * gradient at the bottom
           */
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 60%, rgba(26, 26, 29, 1) 100%), url(${FavoritesBackground})`,
          height: "300px",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-normal text-textreel text-center pt-36 font-montserrat">
          Favorites
        </h1>
      </div>
      {!favorites || favorites.length === 0 ? (
        <div className="px-8 pb-8">
          <img src={Popcorn} alt="Popcorn Image" className="w-64 mx-auto" />
          <p className="text-white/25 text-center text-xl">
            Add your favorites to see them here
          </p>
        </div>
      ) : (
        <div className="px-8 mt-8">
          <h1 className="text-xl text-gray-300 border-b font-montserrat font-medium mb-12">
            Favorite Movies
          </h1>
          <div className="flex flex-wrap gap-x-20 gap-y-4 lg:gap-4 justify-center mb-6">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
