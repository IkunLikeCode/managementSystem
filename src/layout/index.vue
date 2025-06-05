<script setup lang="ts">
import myHeader from "./header/index.vue";
import myMenu from "./myMenu/index.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><myHeader></myHeader></el-header>
      <el-container>
        <el-aside width="200px">
          <myMenu></myMenu>
        </el-aside>
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  width: 100%;
  .el-header {
    padding: 0;
  }
}
.el-container {
  height: 100vh;
  width: 100%;
}
</style>
