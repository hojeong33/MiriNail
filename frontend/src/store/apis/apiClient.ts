import axios from "axios"

export const apiClient = axios.create({
  baseURL: "https://k6e101.p.ssafy.io/api",
  headers: {
    "Content-type": "application/json",
  },
})

export const fileApiClient = axios.create({
  baseURL: "https://k6e101.p.ssafy.io/api",
  headers: {
    "Content-type": "multipart/form-data",
  },
})