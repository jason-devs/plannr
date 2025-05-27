import axios from "axios";

const getBaseUrl = () => {
  const { hostname } = window.location;

  const urlMap = {
    localhost: "http://localhost:3000/api/v1",
    "192.168.68.113": "http://192.168.68.113:3000/api/v1",
  };

  console.log(urlMap[hostname], hostname);

  return urlMap[hostname] || urlMap["localhost"]; // Fallback
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export default api;
