import axios from "axios";
const fetchPopularMovies = async () => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response = await axios.get(URL);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchPopularMovies;
