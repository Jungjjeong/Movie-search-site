<template>
  <section ref="list" class="movie-list" @scroll="onHandleScroll">
    <div v-if="movies" class="movie-container">
      <div
        class="movie-container__item"
        v-for="movie in movies"
        :key="movie.imdbID"
      >
        <Movie :movie="movie" />
      </div>
    </div>
    <div v-else class="movie-none">
      <div class="image" />
      <div class="text">
        <div class="text__title">검색된 영화가 없습니다.</div>
        <div class="text__description">다른 검색어를 입력해주세요.</div>
      </div>
    </div>
  </section>
  <section class="movie-scroll">
    <div class="movie-scroll__button" @click="onScrollTop">
      <span class="material-icons"> vertical_align_top </span>
    </div>
  </section>
  <RouterView name="modal" />
</template>

<script>
import Movie from "~/components/Movie";

export default {
  components: {
    Movie,
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies;
    },
    totalResults() {
      return parseInt(this.$store.state.movie.moviesTotalResults);
    },
  },
  watch: {
    isEndPage() {
      if (this.isEndPage) alert("더 이상 불러올 페이지가 없습니다.");
    },
  },
  data() {
    return {
      isEndPage: false,
    };
  },
  methods: {
    onHandleScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isBottom = scrollHeight === scrollTop + clientHeight;

      if (isBottom) this.onLoadMoreList();
    },
    onLoadMoreList() {
      if (!this.movies) return;

      if (this.movies.length < this.totalResults) {
        this.$store.dispatch("movie/getMovies", {
          searchTitle: this.$store.state.movie.currentSearchTitle,
          page: this.$store.state.movie.currentPage + 1,
        });
        return;
      }

      this.isEndPage = true;
    },
    onScrollTop() {
      this.$refs.list.scroll({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-list {
  width: 100%;
  max-height: 80vh;
  padding: 50px 0;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($color-background-light1, 0.7);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba($color-background, 0);
  }

  .movie-container {
    display: grid;
    grid-gap: 20px 10px;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    width: 80%;
    margin: 30px auto;

    &__item {
      width: 100%;
    }
  }

  .movie-none {
    @include display-flex(column, center);
    gap: 30px;

    .image {
      display: inline-block;
      width: 150px;
      height: 150px;
      margin: 0 auto;
      background-image: url("https://user-images.githubusercontent.com/72294509/169639122-369d020b-866d-48c6-b3a2-f80d4e8b1afa.png");
      background-size: cover;
    }

    .text {
      margin: 0 auto;

      &__title {
        font-weight: 700;
        font-size: 40px;
      }

      &__description {
        margin-top: 10px;
        color: $color-font-dark;
        font-size: 16px;
        text-align: center;
      }
    }
  }
}

.movie-scroll {
  @include absolute-position($r: 50px, $b: 50px);
  width: 50px;
  height: 50px;
  text-align: center;
  background-color: $color-background-light1;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: $color-background-light2;
  }

  &__button {
    margin-top: 10px;
  }
}
</style>