import axios from "axios"

export const apiClient = axios.create({
  baseURL: "http://k6e101.p.ssafy.io:8080/api",
  headers: {
    "Content-type": "application/json",
  },
})

export const fileApiClient = axios.create({
  baseURL: "http://k6e101.p.ssafy.io:8080/api",
  headers: {
    "Content-type": "multipart/form-data",
  },
})