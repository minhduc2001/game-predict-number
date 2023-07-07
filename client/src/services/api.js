import axios from "axios";

export const baseUrl = "http://localhost:8080";
const temp = baseUrl.split(":");
export const baseUrlSocket = `${temp[0]}:${temp[1]}:3006`;

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
