import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const getToken = () =>{
	const key = import.meta.env.VITE_JWT_KEY;
	const token = localStorage.getItem(key);
	if (token)
		return token
}

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.Authorization;
}

export default api;
