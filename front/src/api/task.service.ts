import axios from "axios"
import { Key } from "lucide-react";
import api, { getToken, setAuthToken } from "./client";


export const getTask = async (projectId: string):Promise<TaskType[] | { error: string }> =>{
	const token =  getToken();
	if (!token) return {error:"no token"};
	setAuthToken(token);
	try{
		console.log(projectId);
		const response = await api.get(`projects/${projectId}/tasks`);
		return response.data;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}

export const postTask = async (projectId: string, newtask: TaskType):Promise<TaskType | { error: string }> =>{
	const token = getToken();
	api.defaults.headers.Authorization = `Bearer ${token}`;
	try{
		const response = await api.post(`projects/${projectId}/tasks`, newtask);
		return response.data;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}

export const patchTask = async (id: string, project: TaskType):Promise<TaskType | { error: string }> =>{
	const token = getToken();
	api.defaults.headers.Authorization = `Bearer ${token}`;
	try{
		const response = await api.patch(`/tasks/${id}`, project);
		return response.data;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}

export const deleteTask = async (id: string):Promise<null | { error: string }> =>{
	const token = getToken();
	api.defaults.headers.Authorization = `Bearer ${token}`;
	try{
		await api.delete(`/tasks/${id}`);
		return null;
	}
	catch(err: any){
		if (err.response && err.response.data) {
			return { error: err.response.data.message || "Erreur inconnue" };
		}
		return { error: err.message || "Erreur réseau" };
	}
}
