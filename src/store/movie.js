import router from "~/routes";

const API_KEY = process.env.VUE_APP_KEY;

const _request = async (payload) => {
  const { searchTitle, id, page, plot } = payload;
  const PARAMS = id
    ? `&i=${id}&plot=${plot}`
    : `&s=${searchTitle}&page=${page}`;

  try {
    const response = await fetch(
      `https://www.omdbapi.com?apikey=${API_KEY}${PARAMS}`
    ).then((res) => res.json());

    return response;
  } catch (e) {
    console.log(e.message);
  }
};

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
        ...payload,
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

      const movieDetail = await _request({
        ...payload,
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
