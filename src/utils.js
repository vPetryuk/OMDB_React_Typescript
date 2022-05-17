import axios from "axios";
const OMDB_API_URL = "http://www.omdbapi.com/?apikey=d5b00c77";

export const MAxios = axios.create({
  baseURL: OMDB_API_URL,
});
