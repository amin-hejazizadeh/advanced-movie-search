import axios from "axios";

export function API1() {
  const api = axios.create({
    headers: {
      "X-RapidAPI-Key": "e106db93fbmsh866dcbcee48cddep1ede05jsn9d99948a161b",
      "X-RapidAPI-Host": "advanced-movie-search.p.rapidapi.com",
    },
    params: {
      ids: "80057281",
      lang: "en",
    },
  });

  api.defaults.headers.post["Content-Type"] = "application/json ";
  api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  api.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (error) => {
      console.log(error);
    }
  );

  return api;
}

export async function getMoviesList(genre,page) {
  const response = await API1().get(
    `https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=${genre}&page=${page}`
  );
  if (response) {
    return response;
  } else {

  }
}

export async function getGenreList() {
    const response = await API1().get(
      "https://advanced-movie-search.p.rapidapi.com/genre/movie/list"
    );
    if (response) {
      return response;
    } else {
    }
  }

  export async function getMoviesListBySearch(name,page) {
    const response = await API1().get(
      `https://advanced-movie-search.p.rapidapi.com/search/movie?query=${name}&page=${page}`
    );
    if (response) {
      return response;
    } else {
  
    }
  }

  export async function getMovieDetails(id) {
    const response = await API1().get(
      `https://advanced-movie-search.p.rapidapi.com/movies/getdetails?movie_id=${id}' `
    );
    if (response) {
      return response;
    } else {
  
    }
  }
