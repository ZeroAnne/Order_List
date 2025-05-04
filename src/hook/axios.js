import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev.tapgo.cc/test",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
