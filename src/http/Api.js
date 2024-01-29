import { BASE_URL } from "./BaseUrl";
import { AUTH_TOKEN } from "../utils/Token";
import axios from "axios";

export const apiInstance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: { Authorization: AUTH_TOKEN },
  })