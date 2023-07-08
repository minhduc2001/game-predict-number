import axios from "axios";

export const baseUrl = "http://localhost:8080";
// export const baseUrl =
// "https://f0cd-2405-4802-1edd-e1d0-174f-efb6-9224-2382.ap.ngrok.io";
const temp = baseUrl.split(":");
export const baseUrlSocket = `${temp[0]}:${temp[1]}:3006`;
// export const baseUrlSocket = "https://some-hands-call.loca.lt";

const instance = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
