<script setup lang="ts"></script>

<template>
  <div class="my-menu">
    <el-menu>
      <el-menu-item index="1">Menu Item 1</el-menu-item>
      <el-menu-item index="2">Menu Item 2</el-menu-item>
      <el-menu-item index="3">Menu Item 3</el-menu-item>
      <el-menu-item index="4">Menu Item 4</el-menu-item>
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
