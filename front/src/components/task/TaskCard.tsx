import { useState } from "react";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import SettingButton from "../SettingButton/SettingButton";
import { randomColor } from "@/utils/color";
import "./TaskCard.css"

export default function TaskCard({
task, funcUpdate, setFormTask, onDelete, onUpdate, index}:{
task: TaskType,
funcUpdate: any,
setFormTask: any,
onDelete: any,
onUpdate: any,
index: number})
{
	const [bgColor] = useState(randomColor());
	return <>
	<label key={index} className="task-item"  style={{ backgroundColor: bgColor }} htmlFor={`task-${index}`}>
		<div className="card-buttons">
			<SettingButton className="top-button"
				onClick={() =>{setFormTask({_id: task._id, body: task.body, checked: task.checked});onUpdate(); }}></SettingButton>
			<DeleteButton className="seconde-button" 
				onClick={() => {onDelete(task._id)}}></DeleteButton>

		</div>
		<input
			id={`task-${index}`}
			type="checkbox"
			checked={task.checked}
			onChange={(e) => {
			funcUpdate({_id: task._id, body: task.body, checked: e.target.checked});
			}}/>
		<span className="task-text">{task.body}</span>
	</label></>
}