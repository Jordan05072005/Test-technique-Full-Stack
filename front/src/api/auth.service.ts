

import axios from "axios"
import api from "./client";


// {
//   data: [...],           // ✅ le corps de la réponse (JSON parsé automatiquement)
//   status: 200,           // code HTTP
//   statusText: "OK",      // texte du statut
//   headers: {...},        // headers de la réponse
//   config: {...},         // config Axios de la requête
//   request: {...}         // l'objet request original
// }

export const send_signup = async (user : UserSignType):Promise<UserType[] | { error: string }> =>{
	try{
		const response = await api.post("/auth/signup", user);
		return response.data;
	}
	catch(err: any){
  	if (err.response && err.response.data) {
    	return { error: err.response.data.message || "Erreur inconnue" };
  	}
  	return { error: err.message || "Erreur réseau" };
	}
}


export const send_login = async (user: UserType):Promise<{jwttoken: string} | { error: string }> =>{
	try{
		const response = await api.post("/auth/login", user);
		return response.data;
	}
	catch(err: any){
  	if (err.response && err.response.data) {
    	return { error: err.response.data.message || "Erreur inconnue" };
  	}
  	return { error: err.message || "Erreur réseau" };
	}
}