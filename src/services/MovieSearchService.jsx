import axios from "axios";
const SearchMovies = async (name) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const URL = `https://api.themoviedb.org/3/search/movie`;
  try {
    const response = await axios.get(URL, {
      params: {
        api_key: API_KEY,
        query: name,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default SearchMovies;
