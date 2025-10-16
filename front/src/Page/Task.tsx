import { useState } from "react";
import "./Task.css";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddButton from "@/components/AddButton/AddButton";
import { useTaskForm } from "@/hook/useTask";
import { Form } from "@/components/Form/Form";
import { DeleteButton } from "@/components/DeleteButton/DeleteButton";
import SettingButton from "@/components/SettingButton/SettingButton";




export function DisplayTask({tasks, funcUpdate, setFormTask, onDelete, onUpdate}: { tasks: TaskType[], funcUpdate: any, setFormTask: any, onDelete: any, onUpdate: any}){
	if (tasks.length == 0)
		return;
	return (
	<div className="project-list">
		{tasks.map((task, index) => (
        <label key={index} className="task-item" htmlFor={`task-${index}`}>
				<div className="card-buttons">
				<DeleteButton className="top-button" 
					onClick={() => {onDelete(task._id)}}></DeleteButton>
					<SettingButton 
					onClick={() =>{setFormTask({_id: task._id, body: task.body, checked: task.checked});onUpdate(); }}></SettingButton>
					</div>
          <input
            id={`task-${index}`}
            type="checkbox"
            checked={task.checked}
            onChange={(e) => {
							funcUpdate({_id: task._id, body: task.body, checked: e.target.checked});
            }}
          />
          <span className="task-text">{task.body}</span>
        </label>
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
