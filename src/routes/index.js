import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import NotFound from "./NotFound";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home,
    },
    {
      name: "MovieList",
      path: "/search/:searchTitle",
      component: MovieList,
      meta: {
        scrollToTop: true,
      },
      children: [
        {
          name: "MovieDetail",
          path: "/detail/:id",
          components: {
            modal: MovieDetail,
          },
        },
      ],
    },
    {
      path: "/:notFound(.*)",
      component: NotFound,
    },
  ],
});
