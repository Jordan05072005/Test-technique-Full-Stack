import { deleteTask, getTask, patchTask, postTask } from "@/api/task.service";
import setErrorMessage from "@/utils/error";
import { useEffect, useState } from "react";

export const useTaskForm = () => {
	const [dataTask, setDataTask] =  useState<TaskType[]>([] as TaskType[]);
	const [formTask, setFormTask] = useState<{_id?: string, body: string, checked: boolean}>({body: "", checked: false})
	const [idProject, setIdProject] = useState(localStorage.getItem("currentProjectId") || "");
	const [stateformTask, setStateFormTask] = useState(false);
	const [stateUpdateformTask, setStateUpdateFormTask] = useState(false);
	const [error, setError] = useState("");


	useEffect(() => {
		const fetchData = async() =>{
			const result = await getTask(idProject||"");
			if (Array.isArray(result)){
				setDataTask(result);
				return null
			}
			setDataTask([]);
		}
		fetchData();
	}, []);

	const submitTask = async(IsLogged: boolean) => {
		if (!formTask.body.trim())
			return (setErrorMessage("Un champ manque !", setError));
		const result = await postTask(idProject, {body: formTask.body, checked: formTask.checked});
		if (typeof result === "object" && 'error' in result)
			return (setErrorMessage("Cette tâche existe déja", setError));
		setDataTask(prev => [...prev, result])
		setStateFormTask(false);
		setFormTask(prev => ({...prev, body: "", checked: false}));
	}

	const updateTask = async(task? :TaskType) =>{
		if (task == undefined) task = formTask;
		if (!task.body.trim())
			return (setErrorMessage("Un champ manque !", setError));
		const result = await patchTask(task._id||"", {body: task.body, checked: task.checked});
		if (!('error' in result)){
			setDataTask(prev =>
				prev.map(p =>
					p._id === task._id
						? { ...p, ...result }: p));
		}
		setStateFormTask(false);
		setFormTask(prev => ({...prev, body: "", checked: false}));
		setStateUpdateFormTask(false);
	}

	const delTask = async(_id: string) =>{
		await deleteTask(_id);
		setDataTask(dataTask.filter(p => p._id !== _id));
		setStateFormTask(false);
		setFormTask(prev => ({...prev, body: "", checked: false}));
	}


	return {dataTask,
		setDataTask,
		formTask,
		setFormTask,
		stateformTask,
		setStateFormTask,
		stateUpdateformTask,
		setStateUpdateFormTask,
		submitTask,
		updateTask,
		delTask,
	error};
};