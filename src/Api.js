import axios from "axios";

const api = axios.create({
  baseURL: "https://fuelapi11.azurewebsites.net/api",
});

// 🔥 Token auto attach
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;