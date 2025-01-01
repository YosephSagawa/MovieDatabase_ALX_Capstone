import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  addFavorite: (movie) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  removeFavorite: (movieId) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter(
        (movie) => movie.id !== movieId
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  toggleFavorite: (movie) => {
    const { favorites } = get();
    const isFavorite = favorites.some((favorite) => favorite.id === movie.id);
    if (isFavorite) {
      get().removeFavorite(movie.id);
    } else {
      get().addFavorite(movie);
    }
  },

  isFavorite: (movieId) => {
    const { favorites } = get();
    return favorites.some((favorite) => favorite.id === movieId);
  },
}));

export default useFavoritesStore;
