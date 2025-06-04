import axios from "axios";
import { getMessageInfo } from "@/utils/statusCode";
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import { ElMessage } from "element-plus";
import { BaseResponse } from "@/utils/types";

const service: AxiosInstance = axios.create({
  baseURL: Boolean(import.meta.env.VITE_APP_USE_MOCK)
    ? import.meta.env.VITE_APP_MOCK_BASEURL
    : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    }
    ElMessage({
      message: getMessageInfo(response.status),
      type: "error",
      duration: 3000,
    });
    return response.data;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      ElMessage({
        message: getMessageInfo(response.status),
        type: "error",
        duration: 3000,
      });
      return Promise.reject(error);
    }
    ElMessage({
      message: "网络异常，请稍后再试！",
      type: "error",
      duration: 3000,
    });
  }
);

// 封装request方法
export const requestInstace = <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<BaseResponse>>({ ...config })
      .then((res: AxiosResponse<BaseResponse>) => {
        const data = res.data;
        if (data.code !== 1) {
          ElMessage({
            message: data.message || "请求失败",
            type: "error",
            duration: 3000,
          });
          reject(new Error(data.message || "请求失败"));
        } else {
          ElMessage({
            message: data.message || "请求成功",
            type: "success",
            duration: 3000,
          });
          resolve(data.data as T);
        }
      });
  });
};

// 在最后使用封装过的axios导出不同的请求方式
export function get<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  parms?: U
): Promise<T> {
  return requestInstace({ ...config, url, method: "GET", params: parms });
}

export function post<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data: U
): Promise<T> {
  return requestInstace({ ...config, url, method: "POST", data: data });
}
