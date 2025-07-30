import Axios from "axios";

import { baseURL } from "./base-url";
import i18n from "@/i18n";

const axiosInstance = Axios.create({});

axiosInstance.defaults.timeout = 120000; // Milliseconds
axiosInstance.interceptors.request.use(
  async function (config) {
    const token = JSON.parse(localStorage.getItem("session") as string) || null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Credentials"] = true;
    }
    config.headers["Accept-Language"] = i18n.language;
    config.baseURL = baseURL;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 403) {
      // Handle forbidden error
    }
    if (error?.response?.status === 401) {
      localStorage.removeItem("session");
      return Promise.resolve({
        data: {
          message: "Unauthorized",
          Data: null,
        },
      });
    }
    throw error; // Propagate the error
  }
);

export default axiosInstance;
