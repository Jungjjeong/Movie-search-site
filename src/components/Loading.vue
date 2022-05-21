<template>
  <section class="loading">
    <div class="loading__overlay" />
    <div class="loading__image" />
  </section>
</template>


<style lang="scss" scoped>
.loading {
  @include absolute-position($l: 0, $t: 0);
  z-index: 9;
  width: 100%;
  height: 100%;

  &__overlay {
    width: 100%;
    height: 100%;
    background-color: rgba($color-background, 0.8);
  }

  &__image {
    @include absolute-position($l: calc(50% - 50px), $t: calc(50% - 50px));
    width: 100px;
    height: 100px;
    background-image: url("https://user-images.githubusercontent.com/72294509/169640035-e4a158d6-125c-46dc-90a8-53e8ec347895.png");
    background-size: cover;
    animation: rotate-image 2s linear infinite;

    @keyframes rotate-image {
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>