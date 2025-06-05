import { defineStore } from "pinia";
import { UserState } from "./types";
import pinia from "@/store";
import { refreshUserInfo, userLogin } from "@/api/user";
import { LoginRequest } from "@/api/user/types";
export const useUserStoreHook = defineStore("User", {
  state: () => ({
    username: "大伟",
    accessToken: "",
    roles: ["common"],
  }),
  getters: {},
  actions: {
    updateInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 用户登录
    storeUserLogin(data: LoginRequest) {
      return userLogin(data).then((res) => {
        this.username = res.username;
        this.roles = res.roles;
        this.accessToken = res.accessToken;
        return res;
      });
    },
    // 刷新用户信息
    refreshUserInfo() {
      if (this.username == "大伟" && this.accessToken !== "") {
        refreshUserInfo({
          accessToken: this.accessToken,
        })
          .then((res) => {
            this.username = res.username;
            this.roles = res.roles;
            this.accessToken = res.accessToken;
          })
          .catch(() => {
            this.accessToken = "";
          });
      }
    },
  },
  persist: {
    key: "userInfo",
    storage: sessionStorage,
    paths: ["accessToken"],
  } as {
    key: string;
    storage: Storage;
    paths: string[];
  },
});
export default function useUserStore() {
  return useUserStoreHook(pinia);
}
