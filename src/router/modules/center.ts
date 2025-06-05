import { RouteRecordRaw } from "vue-router";
export default {
  path: "/",
  name: "Layout",
  component: () => import("@/layout/index.vue"),
  children: [
    {
      path: "/center",
      name: "Center",
      component: () => import("@/views/center/index.vue"),
      meta: {},
    },
  ],
} as RouteRecordRaw;
