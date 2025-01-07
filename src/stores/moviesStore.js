import { create } from "zustand";

const useMoviesStore = create((set) => ({
  loading: false,
  movies: [],
  setLoading: (loading) => set({ loading }),
  setMovies: (movies) => set({ movies }),
}));

export default useMoviesStore;
