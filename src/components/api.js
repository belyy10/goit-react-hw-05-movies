import axios from 'axios';

const API_KEY = 'a6f475cc84f4a9f427988f60780ac335';

export async function trendingFetch() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
  const response = await axios.get(url);
  const data = await response.data;
  const filmArr = await data.results;
  return filmArr;
}

export async function searchFilm(quary) {
  return await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${quary}`
  );
}

export async function getMovieById(id) {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
}

export async function getReviews(id) {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
  );
}

export async function getCast(id) {
  return await axios.get(
    `
    https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  );
}
