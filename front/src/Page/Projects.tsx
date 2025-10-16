import { Link } from "react-router-dom";
import './Project.css';
import { Button } from "@/components/ui/button";
import { LogIn, PlusIcon, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TextErrorButton } from "@/components/TextErrorButton";
import { useProjectForm, useUserForm } from "../hook/useSubmit";
import { useAuth } from "@/hook/useAuth";
import { Form } from "@/components/Form/Form";
import AddButton from "@/components/AddButton/AddButton";
import LogBouton from "@/components/LogBouton";
import CardProject from "@/components/CardProject/CardProject";
import { title } from "process";
import { ProjectType } from "@/types/projects.types";
import { deleteProject } from "@/api/project.service";

export function Header({setLoginForm}: any){
	return(
	<div className="header-row">
		<h1 className="project-title"> Projects </h1>
    <div className="login-btn">
        <LogBouton onClick={() => { setLoginForm(true); }} />
    </div>
	</div>)
}

export function DisplayProjects({data, setFormProject , setDisplayForm, del}: { 
	data: ProjectType[], 
	setFormProject: Dispatch<SetStateAction<ProjectType>>, 
	setDisplayForm: Dispatch<SetStateAction<boolean>>,
	del: any})
{
	if (data.length == 0)
		return;
	return (
	<div className="project-list">
      {data.map((project, index) => (
				<CardProject index={index} project={project}
					onClick={() => {localStorage.setItem("currentProjectId", project?._id||"");}}
					onclickDel={()=>{del(project._id)}}
					onclickUpdate={()=>{
					setFormProject({_id: project._id, title: project.title, description: project.description})
					setDisplayForm(true);
					}}></CardProject>
			))}
  </div>)
}


function AuthForm({ config, children }: { config: any, children: any }) {
  if (!config) return null;
  return (
    <Form
      title={config.title}
      fields={config.fields}
      submit={config.submit}
      cancel={config.cancel}
      children={children}
    />
  );
}


export function ConnectPage({title, func, CancelForm, children}: any){
	return (
		<div className="form-backdrop">
		<div className="form">
		<h3 className="project-title">{title}</h3>
		<Button 
      	variant="ghost"
      	size="icon"
      	onClick={CancelForm}
      	className="close-btn">
      <X className="w-4 h-4" />
    	</Button>
			<button onClick={async () => {await func();}}> Déconnexion</button>
			{children}
			</div>
		</div>
	)
}

export default function ProjectList() {
	const {logout, isLogged, login } = useAuth();
	const { user, setUser, error, setError, submitSignup, submitLogin, loginForm, setLoginForm, signUpForm, setSignUpForm} = useUserForm();
  const {project, formProject, setFormProject, updateForm, setUpdateForm, displayForm, setDisplayForm, submitForm, fetchData, updateProject, delProject} = useProjectForm();

	useEffect(()=>{
		fetchData();
	}, [isLogged])


	const formsConfig = {
		login:{
			title: "Connexion",
			fields: [{name:"email", val:user.email, set:setUser},
								{name:"password", val:user.password, set:setUser},],
			submit: () => login(submitLogin),
			cancel: () => {setLoginForm(false); setUser(prev => ({...prev, email:"", password:""}))}
		},
		signup:{
			title: "Incription :",
			fields: [{name:"name", val:user.name, set:setUser},
				{name:"email", val:user.email, set:setUser},
				{name:"password", val:user.password, set:setUser}],
			submit: submitSignup,
			cancel: () => {setSignUpForm(false); setUser(prev => ({...prev, name:"", email:"", password:""}))}
		},
		projects:{
			title: "Nouveau Project",
			fields: [{name:"title", val: formProject.title, set:setFormProject},
							{name:"description", val:formProject.description, set:setFormProject}],
			submit: () => submitForm(isLogged, setError),
			cancel: () => {setDisplayForm(false); setFormProject(prev => ({ ...prev, title: "", description: ""}))},
		},
		updateprojects:{
			title: "Mise a jours du Project",
			fields: [{name:"title", val:formProject.title, set:setFormProject},
							{name:"description", val:formProject.description, set:setFormProject}],
			submit: () => updateProject(formProject._id||"", setError),
			cancel: () => {setDisplayForm(false);setUpdateForm(false);setFormProject(prev => ({ ...prev, title: "", description: ""}))}}
		}
  return (
		<>
		<Header setLoginForm={setLoginForm}></Header>
		<AddButton onClick={() => {setDisplayForm(true)}}></AddButton>
		<br></br>
		<DisplayProjects data={project} 
		setFormProject={setFormProject} setDisplayForm={()=>{setUpdateForm(true);setDisplayForm(true)}}
		del={delProject}/>
		{displayForm && (
			<AuthForm config={(updateForm) ? formsConfig.updateprojects : formsConfig.projects} 
			children={<p className="error-text">{error}</p>}/>
		)}
		{!isLogged && (
			<>
				{loginForm && <AuthForm config={formsConfig.login} children={
					<TextErrorButton 
					onClick={() => {setLoginForm(false);setSignUpForm(true)}}
					p={"Vous n'avez pas de compte ? Crée s'en un !"}
					error = {<p className="error-text">{error}</p>}/>}>
				</AuthForm>}
				{signUpForm && <AuthForm config={formsConfig.signup} children={
				<TextErrorButton 
					onClick={() => {setSignUpForm(false);setLoginForm(true);}}
					p={"Vous avez un compte ? Connecter vous !"}
					error = {<p className="error-text">{error}</p>}/>}>
				</AuthForm>}
			</>
		)}
		{(signUpForm || loginForm) && isLogged && (
		<ConnectPage
			title={"Connecté :"}
			func={() =>{logout();setLoginForm(false); setSignUpForm(false)}}
			CancelForm={() => {setLoginForm(false); setSignUpForm(false)}}
			/>
		)
	}
</>);
}




