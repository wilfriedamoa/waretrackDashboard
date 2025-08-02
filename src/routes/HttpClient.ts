import axios from "axios";

export const BASE_API_URL = "https://api-admin.waretrack.online/api"; //https://api-admin.waretrack.online

// export const WHATSAPP_API_URL = "http://127.0.0.1:4000";

export const HttpClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: localStorage.getItem("accessToken")
      ? `Bearer ${localStorage.getItem("accessToken")}`
      : "",
  },
});

export const HttpClientNoToken = axios.create({
  baseURL: BASE_API_URL,
});
