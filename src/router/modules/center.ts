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
      meta: {
        title: "首页",
        isShow: true,
      },
    },
    {
      path: "/user",
      name: "User",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户列表",
        isShow: true,
      },
    },
    {
      path: "/role",
      name: "Role",
      component: () => import("@/views/role/index.vue"),
      meta: {
        title: "角色列表",
        isShow: true,
      },
    },
    {
      path: "/auth",
      name: "Auth",
      component: () => import("@/views/auth/index.vue"),
      meta: {
        title: "权限列表",
        isShow: true,
      },
    },
  ],
} as RouteRecordRaw;
