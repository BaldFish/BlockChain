import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home/home";
import search from "@/components/search/search";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/search",
      name: "search",
      component: search
    }
  ]
});
