import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API });

export const exampleRequest = () => API.get("/");

// export const ...