<template>
  <div class="app__inner">
    <div class="app__header">
      <Header />
    </div>
    <div class="app__page">
      <Loading v-if="this.$store.state.movie.isLoading" />
      <RouterView />
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
import Loading from "~/components/Loading";

export default {
  components: {
    Header,
    Loading,
  },
};
</script>

<style lang="scss" scoped>
.app__inner {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: $color-font;
  background-color: $color-background;
  font-size: 14px;
  line-height: 1.2;
  font-family: "Noto Sans KR", sans-serif;

  .app__page {
    flex-grow: 1;
  }
}
</style>