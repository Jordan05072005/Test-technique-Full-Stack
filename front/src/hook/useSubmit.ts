import { deleteProject, patchProject, postProject } from './../api/project.service';
import { useEffect, useRef, useState } from "react";
import { send_login, send_signup } from "@/api/auth.service";
import { getProject } from "@/api/project.service";
import { get } from "http";
import { ProjectType } from '@/types/projects.types';
import setErrorMessage from '@/utils/error';

export const useUserForm = () => {
	const [user, setUser] = useState<{id?: string, name?: string, email: string, password: string}>({email: "", password: ""});

  const [error, setError] = useState<string | null>(null);
	const [loginForm, setLoginForm] = useState(false)
	const [signUpForm, setSignUpForm] = useState(false)

  const submitSignup = async () => {
    if (!user.email.trim() || !user.password.trim() || !user.name||"".trim()) 
			return (setErrorMessage("Un champ manque !", setError));
    const result = await send_signup({ name: user.name||"", email: user.email, password: user.password });
    if (typeof result === "object" && 'error' in result) {
			setErrorMessage("email déjà utilisé", setError);
    } else {
			setSignUpForm(false);
  		setUser(prev => ({...prev, name:"", email: "", password: ""}));
      return true;
    }
  };

  const submitLogin = async () => {
    if (!user.email.trim() || !user.password.trim())
			return (setErrorMessage("Un champ manque !", setError), null);
    const result = await send_login({ email: user.email, password: user.password });
    if (typeof result === "object" && 'error' in result && result.error != "") {
      setError("email ou mdp invalide");
      setTimeout(() => setError(null), 3000);
			return null;
    }
		else if ('jwttoken' in result) {
 			setLoginForm(false);
  		setUser(prev => ({...prev, email: "", password: ""}));
  		return result.jwttoken;
	}
	return null;
  };

  return {user, setUser, error, setError, submitSignup, submitLogin, loginForm, setLoginForm, signUpForm, setSignUpForm };
};

export const useProjectForm = () =>{
	const [project, setProjects] = useState<ProjectType[]>([] as ProjectType[]);
	const [formProject, setFormProject] = useState<{_id?: string, title: string, description: string}>({title: "", description: ""});
	const [displayForm, setDisplayForm] = useState(false);
	const [updateForm, setUpdateForm] = useState(false);


	const fetchData = async() =>{
		const result = await getProject();
		if (Array.isArray(result)){
			setProjects(result);
			return null
		}
		setProjects([]);
	}

	const addProjects = (dataproject : ProjectType) => {
		setProjects(prev => [...prev, dataproject])
	}

	const submitForm = async(IsLogged: boolean, setError: any) => {
		if (!IsLogged) {
			return (setErrorMessage("Vous n'êtes pas connecté", setError));
		}
		console.log(formProject.title);
		if (!formProject.title.trim() || !formProject.description.trim())
			return (setErrorMessage("Un champ manque !", setError));
		const result = await postProject({title: formProject.title, description: formProject.description});
		if (typeof result === "object" && 'error' in result){
			return (setErrorMessage("Ce project existe déjà !", setError));
		}
		addProjects(result);
		setDisplayForm(false);
		setFormProject(prev => ({ ...prev, title: "", description: ""}));
	}

	const updateProject = async(_id: string, setError: any) =>{
		if (!formProject.title.trim() || !formProject.description.trim())
			return (setErrorMessage("Un champ manque !", setError));
		const result = await patchProject(_id, {title: formProject.title, description: formProject.description});
		if (!('error' in result)){
			setProjects(prev =>
				prev.map(p =>
					p._id === _id
						? { ...p, ...result }: p));
		}
		setFormProject(prev => ({ ...prev, title: "", description: ""}));
		setDisplayForm(false);
		setUpdateForm(false);
	}

	const delProject = async(_id: string) =>{
		console.log(_id);
		await deleteProject(_id);
		setProjects(project.filter(p => p._id !== _id));
		setDisplayForm(false);
		setFormProject(prev => ({ ...prev, title: "", description: ""}));
	}

	return {
    project,
		setProjects,
		formProject,
		setFormProject,
    displayForm,
    setDisplayForm,
		updateForm,
		setUpdateForm,
    submitForm,
		fetchData,
		updateProject,
		delProject
  };
}
