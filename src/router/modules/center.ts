import { RouteRecordRaw } from "vue-router";
export default {
  path: "/center",
  name: "Center",
  component: () => import("@/views/center/index.vue"),
  meta: {},
} as RouteRecordRaw;
