<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const routers = router.getRoutes().filter((item) => {
  if (item.meta && item.meta.isShow) {
    return true;
  }
});
</script>

<template>
  <div class="my-menu">
    <el-menu router :default-active="route.path">
      <el-menu-item
        v-for="item in routers"
        :key="item.path"
        :index="item.path"
        >{{ item.meta?.title }}</el-menu-item
      >
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.my-menu {
  width: 200px;
  height: 100%;
  background-color: var(--yb-background-main);
  .el-menu {
    height: 100%;
  }
}
</style>
