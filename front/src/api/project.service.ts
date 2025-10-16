import axios from "axios"
import { Key } from "lucide-react";
import api, { getToken, setAuthToken } from "./client";
import { ProjectType } from "@/types/projects.types";


export const getProject = async ():Promise<ProjectType[] | { error: string }> =>{
	const token =  getToken();
	if (!token) return {error:"no token"};
	setAuthToken(token);
	try{
		const response = await api.get("/projects");
		return response.data;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}

export const postProject = async (project: ProjectType):Promise<ProjectType | { error: string }> =>{
	const token = getToken();
	api.defaults.headers.Authorization = `Bearer ${token}`;
	try{
		const response = await api.post("/projects", project);
		return response.data;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}

export const patchProject = async (id: string, project: ProjectType):Promise<ProjectType | { error: string }> =>{
	const token = getToken();
	api.defaults.headers.Authorization = `Bearer ${token}`;
	try{
		const response = await api.patch(`/projects/${id}`, project);
		return response.data;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}

export const deleteProject = async (id: string):Promise<null | { error: string }> =>{
	const token = getToken();
	api.defaults.headers.Authorization = `Bearer ${token}`;
	try{
		await api.delete(`/projects/${id}`);
		return null;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}
