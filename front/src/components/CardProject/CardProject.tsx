import { DeleteButton } from "@/components/DeleteButton/DeleteButton";
import { Link } from "react-router-dom";
import "./CardProject.css"
import { ProjectType } from "@/types/projects.types";
import SettingButton from "../SettingButton/SettingButton";
import { useState } from "react";
import { randomColor } from "@/utils/color";

export default function CardProject({index, project, onClick,  onclickDel, onclickUpdate} : {index: number, project: ProjectType, onClick: any, onclickDel: any , onclickUpdate: any}){
	 const [bgColor] = useState(randomColor());
	return(
		<Link key={index}
			to="project"
			onClick={onClick}
			className="project-link">
			<div className="project-card" style={{ backgroundColor: bgColor }}>
				<div className="card-buttons">
					<SettingButton onClick={onclickUpdate}></SettingButton>
					<DeleteButton className="top-button" 
					onClick={onclickDel}></DeleteButton>
				</div>
				<h1 className="project-card-title">{project.title}</h1>
				<p className="project-card-desc">{project.description}</p>
			</div>
		</Link>
	)
}