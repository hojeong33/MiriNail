import axios from "axios";
const ACCESS_TOKEN = localStorage.getItem("token");
export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const fileApiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-type": "application/json",
    // "Content-type": "multipart/form-data",
  },
});
