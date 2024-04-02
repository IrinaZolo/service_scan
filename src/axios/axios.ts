import axios from "axios";

export default axios.create({
  baseURL: "https://gateway.scan-interfax.ru/",
  headers: {
    Authorization: "Bearer [token]",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
