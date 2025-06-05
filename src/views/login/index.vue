<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import useUserStore from "@/store/user";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
// 获取表单实例
const formRef = useTemplateRef<FormInstance>("formRef");
// 用户登录信息
const loginForm = reactive({
  username: "123456",
  password: "123456",
});
// 表单校验
const rules = reactive<FormRules<typeof loginForm>>({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      min: 3,
      max: 20,
      message: "用户名长度在 3 到 20 个字符之间",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 6,
      max: 20,
      message: "密码长度在 6 到 20 个字符之间",
      trigger: "blur",
    },
  ],
});
// 登录
async function loginFn(formInstance: FormInstance | null) {
  if (!formInstance) return;
  await formInstance.validate(async (valid) => {
    if (valid) {
      await userStore.storeUserLogin(loginForm);
      router.push("/");
    } else {
      ElMessage({
        type: "error",
        message: "请检查表单填写是否正确",
      });
    }
  });
}
</script>

<template>
  <div class="login">
    <div class="login-box">
      <h1>企业级后台管理系统</h1>
      <ElForm ref="formRef" :rules="rules" :model="loginForm" center>
        <ElFormItem prop="username">
          <ElInput
            :prefix-icon="User"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            clearable />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            :prefix-icon="Lock"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            clearable />
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            style="width: 100%"
            @click="loginFn(formRef)">
            登录
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .login-box {
    background-color: var(--yb-background-main);
    border-radius: 10px;
    border: 1px solid var(--yb-color-dark-gray);
    padding: 30px;
    width: 400px;
    text-align: center;
    h1 {
      font-size: 25px;
      font-weight: 600;
      margin: 20px 0;
    }
  }
}
</style>
