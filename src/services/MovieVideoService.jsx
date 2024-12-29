import axios from "axios";

const fetchMovieVideos = async (id) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

export default fetchMovieVideos;
