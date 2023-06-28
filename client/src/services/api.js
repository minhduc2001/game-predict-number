import axios from "axios";

export const baseUrl = "http://localhost:3000";
const instance = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
