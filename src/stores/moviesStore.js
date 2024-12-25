import { create } from "zustand";

const useMoviesStore = create((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
}));

export default useMoviesStore;
