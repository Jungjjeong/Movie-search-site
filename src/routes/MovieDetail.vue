<template>
  <section class="movie-detail">
    <div class="overlay" @click="closeModal" />
    <div class="detail-container">
      <div class="detail-container__image">
        <img
          :src="
            movie.Poster !== 'N/A'
              ? movie.Poster.replace('SX300', 'SX700')
              : 'https://user-images.githubusercontent.com/72294509/169549901-0c68bcba-d45b-4a94-97d8-f014b2133991.png'
          "
        />
      </div>
      <div class="detail-container__text">
        <div class="title">{{ movie.Title }}</div>
        <div class="description">
          <ul class="description__ratings">
            <li
              class="rating"
              v-for="(rate, index) in movie.Ratings"
              :key="index"
            >
              <span class="rating-source">{{ rate.Source }}</span
              ><span class="rating-value">{{ rate.Value }}</span>
            </li>
          </ul>
          <div class="description__plot">
            {{ movie.Plot }}
          </div>
          <div class="description__summary">
            <div class="director">
              <span class="description__summary-title">감독 </span>
              <span class="description__summary-value">{{
                movie.Director
              }}</span>
            </div>
            <div class="genre">
              <span class="description__summary-title">장르 </span>
              <span class="description__summary-value">{{ movie.Genre }}</span>
            </div>
            <div class="ects">
              <span class="description__summary-title">개요 </span>
              <span class="description__summary-value"
                >{{ movie.Country }} | {{ movie.Year }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    movie() {
      return this.$store.state.movie.currentMovie;
    },
  },
  methods: {
    closeModal() {
      this.$router.push({
        name: "MovieList",
        params: {
          page: 1,
          searchTitle: this.$store.state.movie.currentSearchTitle,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-detail {
  .overlay {
    @include absolute-position($r: 0, $t: 0);
    width: 100%;
    height: 100%;
    background-color: rgba($color-background, 0.8);
  }

  .detail-container {
    @include absolute-position($l: calc(50% - 600px), $t: calc(50% - 375px));
    display: flex;
    width: 1200px;
    height: 750px;
    background-color: $color-background;
    border-radius: 20px;
    box-shadow: 0 7px 10px 1px rgba($color-background, 0.8);

    &__image {
      width: 500px;
      overflow: hidden;
      border-radius: 20px 0 0 20px;

      img {
        height: 100%;
        object-fit: cover;
        -webkit-mask-image: linear-gradient(to left, transparent 1%, black 40%);
      }
    }

    &__text {
      @include display-flex(column);
      gap: 20px;
      width: 650px;
      padding: 50px 30px;

      .title {
        font-weight: 700;
        font-size: 70px;
      }
      .description {
        @include display-flex($d: column);
        flex-grow: 1;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 10px;
          height: 90%;
        }
        &::-webkit-scrollbar-thumb {
          background-color: rgba($color-background-light1, 0.5);
          border-radius: 10px;
        }
        &::-webkit-scrollbar-track {
          background-color: rgba($color-background, 0);
        }

        &__ratings {
          padding: 15px 0;

          .rating {
            @include display-flex($align: center);
            width: 50%;
            margin: 2px 0;
            border: 1px solid;

            &-source {
              width: 70%;
              padding: 0 8px;
            }

            &-value {
              width: 30%;
              color: $color-background;
              font-weight: 700;
              font-size: 18px;
              text-align: center;
              background-color: $color-font;
            }
          }
        }

        &__plot {
          flex-grow: 1;
          padding: 15px 15px 15px 0;
          font-size: 18px;
        }

        &__summary {
          color: $color-font-dark;

          &-title {
            margin-right: 10px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>