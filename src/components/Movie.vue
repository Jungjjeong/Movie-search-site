<template>
  <div class="movie" @click="getMovieDetail">
    <div class="movie__image">
      <img
        :src="
          movie.Poster !== 'N/A'
            ? movie.Poster
            : 'https://user-images.githubusercontent.com/72294509/169549901-0c68bcba-d45b-4a94-97d8-f014b2133991.png'
        "
      />
    </div>
    <div class="movie__title">{{ movie.Title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    async getMovieDetail() {
      await this.$store.dispatch("movie/getMovieDetail", {
        id: this.movie.imdbID,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.movie {
  position: relative;
  @include display-flex(column);
  width: 100%;
  height: 100%;
  margin-top: 5%;
  overflow: hidden;
  border-radius: 8px;

  &:hover {
    transform: scale(1.05);
    transition: 0.4s;

    .movie__title {
      display: block;
    }
  }

  &__image {
    flex-grow: 1;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__title {
    @include absolute-position($b: 0);
    display: none;
    width: 100%;
    padding: 15% 0 5% 0;
    font-size: 16px;
    text-align: center;
    background: linear-gradient(
      rgba($color-background, 0.05),
      rgba($color-background, 0.9),
      $color-background
    );
  }
}
</style>