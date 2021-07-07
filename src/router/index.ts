import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import UserList from "../views/users/List.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: UserList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * History push.
 *
 * @param location
 * @returns void
 */
const push = (location: RouteLocationRaw): void => {
  router.push(location);
};

export { push, router as default };
