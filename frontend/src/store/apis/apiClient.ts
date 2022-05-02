import axios from "axios";
const ACCESS_TOKEN = localStorage.getItem("token");
export const apiClient = axios.create({
  baseURL: "https://k6e101.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fileApiClient = axios.create({
  baseURL: "https://k6e101.p.ssafy.io/api",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-type": "multipart/form-data",
  },
});
