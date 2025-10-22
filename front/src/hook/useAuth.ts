import { useState, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
	const key = import.meta.env.VITE_JWT_KEY;

  useEffect(() => {
    const savedToken = localStorage.getItem(key);
    if (savedToken) setToken(savedToken);
  }, []);

  const login  = async(funclogin: () => Promise<string | null | undefined>) => {
		const jwt = await funclogin();
		if (jwt){
    	localStorage.setItem(key, jwt);
    	setToken(jwt);
		}
  };

  const logout = () => {
    localStorage.removeItem(key);
    setToken(null);
  };

  return {login, logout, isLogged: !!token };
};
