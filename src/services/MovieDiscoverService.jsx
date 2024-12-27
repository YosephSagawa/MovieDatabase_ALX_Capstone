import axios from "axios";
const Discover = async (genre, minRating, maxRating) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const URL = "https://api.themoviedb.org/3/discover/movie";
  try {
    const response = await axios.get(URL, {
      params: {
        api_key: API_KEY,
        with_genres: genre,
        "vote_average.gte": minRating,
        "vote_average.lte": maxRating,
        language: "en-US",
        sort_by: "popularity.desc",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default Discover;
