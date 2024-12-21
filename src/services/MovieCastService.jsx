import axios from "axios";
const fetchMovieCast = async (movieId) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchMovieCast;
