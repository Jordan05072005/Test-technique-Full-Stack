import { X } from "lucide-react";
import { Button } from "../ui/button";
import "./Form.css"
import { Dispatch, SetStateAction } from "react";
import type { Field } from "../../types/projects.types.tsx";
import type { ProjectType } from "../../types/projects.types";

export function Form({title, fields, submit, cancel, children}: any){
	return (
		<div className="form-backdrop">
		<div className="form">
		<h3 className="project-title">{title}</h3>
		<Button 
      	variant="ghost"
      	size="icon"
      	onClick={cancel}
      	className="close-btn">
      <X className="w-4 h-4" />
    	</Button>
		<div className="header-row">
			{fields.map((field : Field<ProjectType>, i : any) =>(	
				<input type={field.name} placeholder={field.name} value={field.val} onChange={e => field.set(prev => ({ ...prev, [field.name]: e.target.value }))}/>
			))}
			</div>
			<button className="Validation" onClick={async () => {await submit();}}> Valider</button>
			{children}
			</div>
		</div>
	)
}