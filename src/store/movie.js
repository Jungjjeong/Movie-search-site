import axios from "axios";
import router from "~/routes";

export default {
  namespaced: true,
  state() {
    return {
      movies: [],
      moviesTotalResults: 0,
      currentSearchTitle: "",
      currentPage: 1,
      currentMovie: {},
      isLoading: false,
    };
  },
  mutations: {
    updateMovies(state, newMovies) {
      state.movies = [...state.movies, ...newMovies];
    },
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    updateLoading(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    async getMovies({ commit }, payload) {
      commit("updateLoading");

      const { searchTitle, page } = payload;
      const movies = await _request({
        s: searchTitle,
        page,
      });

      if (page > 1) {
        commit("updateMovies", movies.Search);
      } else {
        commit("assignState", {
          movies: movies.Search,
        });
      }

      commit("assignState", {
        moviesTotalResults: movies.totalResults,
        currentSearchTitle: searchTitle,
        currentPage: page,
      });

      router.push({
        name: "MovieList",
        params: {
          searchTitle,
        },
      });

      commit("updateLoading");
    },
    async getMovieDetail({ commit }, payload) {
      commit("updateLoading");

      const { id } = payload;
      const movieDetail = await _request({
        i: id,
        plot: "full",
      });

      commit("assignState", {
        currentMovie: movieDetail,
      });

      router.push({
        name: "MovieDetail",
        params: {
          id: movieDetail.imdbID,
        },
      });

      commit("updateLoading");
    },
  },
};

async function _request(params) {
  const data = await axios.post(
    "/.netlify/functions/movie",
    JSON.stringify(params)
  );

  return data.data;
}
