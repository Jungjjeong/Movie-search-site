<template>
  <section class="home">
    <div class="home__container">
      <div class="title">무한으로 즐겨요. 지영화검색</div>
      <div class="description">속도는 느리지만, 추가 요금은 전혀 없어요.</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba($color-background, 0.6),
      rgba($color-background, 0.6)
    ),
    url("https://user-images.githubusercontent.com/72294509/169593330-1aa90c4b-9816-465a-bfd1-ec123ebbaaa3.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: auto 100%;

  &__container {
    padding-top: 40vh;
    line-height: 1.4;
    text-align: center;

    .title {
      font-weight: 700;
      font-size: 50px;
    }
    .description {
      color: $color-font-dark;
      font-size: 16px;
    }
  }
}
</style>