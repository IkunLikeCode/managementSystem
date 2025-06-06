import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(["./modules/*.ts"], {
  eager: true,
});
const routes: Array<RouteRecordRaw> = [
  // 首页
  {
    path: "/",
    redirect: "/center",
  },
  // 没有匹配到也去到中心页
  {
    path: "/:pathMatch(.*)*",
    redirect: "/center",
  },
];

Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default);
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const noLogin = ["/login"];
router.beforeEach(async (_to, _from, next) => {
  NProgress.start();
  const token = sessionStorage.getItem("userInfo");
  const isLogin = token ? true : false;
  if (isLogin || noLogin.includes(_to.path)) {
    if (_to.path === "/login" && isLogin) {
      next("/center");
    } else {
      next();
    }
  } else {
    next("/login");
  }
});
router.afterEach((_to) => {
  NProgress.done();
});
export default router;
