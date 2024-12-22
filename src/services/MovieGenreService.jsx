import axios from "axios";

const MovieGenreService = async () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const URL = "https://api.themoviedb.org/3/genre/movie/list";
  try {
    const response = await axios.get(URL, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    return response.data.genres;
  } catch (error) {
    throw error;
  }
};
export default MovieGenreService;
