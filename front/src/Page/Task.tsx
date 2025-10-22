import { useState } from "react";
import "./Task.css";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddButton from "@/components/AddButton/AddButton";
import { useTaskForm } from "@/hook/useTask";
import { Form } from "@/components/Form/Form";
import { DeleteButton } from "@/components/DeleteButton/DeleteButton";
import SettingButton from "@/components/SettingButton/SettingButton";
import { ReturnButton } from "@/components/ReturnButton/ReturnButton";
import { randomColor } from "@/utils/color";
import TaskCard from "@/components/task/TaskCard";




export function DisplayTask({tasks, funcUpdate, setFormTask, onDelete, onUpdate}: { tasks: TaskType[], funcUpdate: any, setFormTask: any, onDelete: any, onUpdate: any}){
	if (tasks.length == 0)
		return;
	return (
	<div className="project-list">
		{tasks.map((task, index) => (
			<TaskCard task={task} funcUpdate={funcUpdate} setFormTask={setFormTask} onDelete={onDelete} onUpdate={onUpdate} index={index}></TaskCard>
		))}
	</div>)
}


export default function TaskList(){
	const {dataTask, setDataTask, formTask, setFormTask, stateUpdateformTask, setStateUpdateFormTask, stateformTask, setStateFormTask, submitTask, updateTask, delTask, error} = useTaskForm();
	return(<>
		<div className="page-wrapper">
			<h1 className="page-title">Tâches</h1>
			<AddButton onClick={() => {setStateFormTask(true)}}></AddButton>
			<div className="page-center">
				<DisplayTask tasks={dataTask} setFormTask={setFormTask}
				onDelete={delTask} onUpdate={()=>{setStateUpdateFormTask(true)}} funcUpdate={updateTask} />
			</div>
			<ReturnButton className="return-button" 
			path="/"></ReturnButton>
		</div>
		{(stateformTask || stateUpdateformTask)&& (
			<Form
			title={stateUpdateformTask ? "Mise a jours de la tâche :" : "Nouvelle tâche :"}
			fields={[{name:"body", val:formTask.body, set:setFormTask}]}
			submit={stateUpdateformTask ?  updateTask : submitTask}
			cancel={() => {setStateFormTask(false); setStateUpdateFormTask(false)}}
			children={<p className="error-text">{error}</p>}
			></Form>
		)}
	</>);
}
