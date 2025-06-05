<script setup lang="ts">
import useUserStore from "@/store/user";
import { User, Setting } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const drawer = ref(false);
const router = useRouter();
const handerLogin = () => {
  drawer.value = false;
  sessionStorage.removeItem("userInfo");
  router.push("/login");
};
</script>

<template>
  <div class="header">
    <div class="log">Log区域</div>
    <div class="user">
      <div class="userInfo">
        <el-icon :size="20">
          <User />
        </el-icon>
        <span class="username">{{ userStore.username }}</span>
      </div>
      <div class="seting" @click="drawer = true">
        <el-icon :size="20">
          <Setting></Setting>
        </el-icon>
      </div>
    </div>
    <el-drawer v-model="drawer" title="项目设置">
      <ElButton @click="handerLogin">退出登录</ElButton>
    </el-drawer>
  </div>
</template>

<style lang="less" scoped>
.header {
  background-color: var(--yb-background-main);
  width: 100%;
  height: 60px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  .user {
    display: flex;
    align-items: center;
    .userInfo {
      display: flex;
      align-items: center;
      .username {
        margin-left: 10px;
        font-size: 16px;
        color: var(--yb-color-dark-black);
      }
    }
    .seting {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>
