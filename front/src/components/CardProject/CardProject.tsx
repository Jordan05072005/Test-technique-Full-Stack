import { DeleteButton } from "@/components/DeleteButton/DeleteButton";
import { Link } from "react-router-dom";
import "./CardProject.css"
import { ProjectType } from "@/types/projects.types";
import SettingButton from "../SettingButton/SettingButton";

export default function CardProject({index, project, onClick,  onclickDel, onclickUpdate} : {index: number, project: ProjectType, onClick: any, onclickDel: any , onclickUpdate: any}){
	return(
		<Link key={index}
			to="project"
			onClick={onClick}
			className="project-link">
			<div className="project-card">
				<div className="card-buttons">
					<DeleteButton className="top-button" 
					onClick={onclickDel}></DeleteButton>
					<SettingButton onClick={onclickUpdate}></SettingButton>
				</div>
				<h1 className="project-card-title">{project.title}</h1>
				<p className="project-card-desc">{project.description}</p>
			</div>
		</Link>
	)
}