import axios from "axios";

const fetchMovieDetails = async (movieId) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};

export default fetchMovieDetails;
