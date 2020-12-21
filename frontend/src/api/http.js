import axios from "axios";

const baseURL = "http://localhost:3001/api";

const http = axios.create({ baseURL, withCredentials: true });

export default http