import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
});

export default axiosInstance;
