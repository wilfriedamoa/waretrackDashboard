import axios from "axios";

export const BASE_API_URL = "http://127.0.1:8080/api";

export const WHATSAPP_API_URL = "http://127.0.0.1:4000";

export const HttpClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: localStorage.getItem("authToken")
      ? "Bearer " + localStorage.getItem("authToken")
      : "",
  },
});

export const HttpClientNoToken = axios.create({
  baseURL: BASE_API_URL,
});

export const WhatsappRequest = axios.create({
  baseURL: WHATSAPP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
