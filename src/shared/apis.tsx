import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json,",
  },
});

const apis = {
  // HOME
  enterChat: () => api.get("/chat"),
};

export default apis;
