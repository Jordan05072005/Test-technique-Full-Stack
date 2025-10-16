import { newProjectDto } from './dto/newproject.dto';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDto } from "src/auth/dto/user.dto";
import { Projects } from "./projects.schema";
import { Model } from "mongoose";
import { User } from "src/auth/auth.schema";
import { ProjectsDto } from "./dto/projects.dto";
import { UpdateProjectDto } from './dto/updateproject.dto';
import { Tasks } from 'src/tasks/tasks.schema';
import { newTasksDto } from 'src/tasks/dto/newtasks.dto';


@Injectable()
export class ProjectService {
	constructor(@InjectModel(Projects.name) private projectsModel: Model<Projects>,
		@InjectModel(Tasks.name) private tasksModel: Model<Tasks>) {}

	async getproject(id: any){
		const dataProjects = await this.projectsModel.find({
			userId: id,
		}).exec();
		if (!dataProjects)
				return ({})
		return (dataProjects);
	}

	async addproject(project: newProjectDto, id: any){
		const newproject = await this.projectsModel.create({
			title: project.title,
			description: project.description,
			userId: id
		});
		return  newproject;
	}
	
	async updateproject(update: UpdateProjectDto, idproject: string){
		const data = await this.projectsModel.findByIdAndUpdate(idproject, update, {new: true}).exec();
		return (data);
	}

	async deleteproject(idproject: string){
		await this.projectsModel.findByIdAndDelete(idproject).exec();
		await this.tasksModel.deleteMany({ projectId: idproject	 });
	}

	async gettask(projectId: string){
		const data = await this.tasksModel.find({projectId: projectId}).exec();
		if (!data)
				return {};
		return data;
	}

	async newtask(projectId: string, task: newTasksDto){
		const newTask = this.tasksModel.create({
			body: task.body,
			checked: task.checked,
			projectId: projectId,
		});
		return (newTask)
	}
}
