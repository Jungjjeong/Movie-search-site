<template>
  <header>
    <div class="header">
      <div class="header__title" @click="onMoveHome">
        <div class="image" />
        <div class="title">지영화검색</div>
      </div>
      <div class="header__search">
        <div class="header__search-container">
          <input
            ref="input"
            v-model="searchTitle"
            type="text"
            placeholder="영화 이름을 입력하세요!"
            @keyup.enter="onSearch"
          />
          <div class="search-action" @click="onSearch">
            <span class="material-icons">search</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchTitle: "",
    };
  },
  methods: {
    onSearch() {
      if (!this.searchTitle) {
        alert("검색어를 입력해주세요!");
        return;
      }

      this.$store.dispatch("movie/getMovies", {
        searchTitle: this.searchTitle,
        page: 1,
      });
    },
    onMoveHome() {
      this.$router.push({
        name: "Home",
      });

      this.$nextTick(() => {
        const inputElement = this.$refs.input;
        inputElement.value = "";
        inputElement.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @include display-flex($align: center);
  height: 80px;
  margin: 5px 50px;

  &__title {
    @include display-flex($align: center);
    margin: 0 50px;
    cursor: pointer;

    .image {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      background-image: url("https://user-images.githubusercontent.com/72294509/169591841-7523cc1c-eeaa-44aa-a651-c08999570473.png");
      background-size: cover;
    }
    .title {
      font-weight: 700;
      font-size: 28px;
    }
  }

  &__search {
    flex-grow: 1;
    padding: 0 40px;

    &-container {
      @include display-flex($align: center);
      width: 80%;
      height: 40px;
      padding: 0 20px;
      background-color: $color-background-light1;
      border-radius: 10px;

      &:hover {
        background-color: $color-background-light2;

        input {
          background-color: $color-background-light2;
        }
      }

      .search-action {
        cursor: pointer;
      }

      input {
        flex-grow: 1;
        height: 90%;
        color: $color-font;
        font-size: 20px;
        font-family: "Noto Sans KR", sans-serif;
        background-color: $color-background-light1;
        border: none;
        outline: none;
      }
    }
  }
}
</style>