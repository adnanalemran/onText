import axios from "axios";

const api = axios.create({
  baseURL: "https://textapp-eight.vercel.app", // Your backend URL
});

export const fetchNote = async (title) => {
  const response = await api.get(`/note/${title}`);
  return response.data;
};

export const saveNote = async (title, description) => {
  const response = await api.post("/note", { title, description });
  return response.data;
};
