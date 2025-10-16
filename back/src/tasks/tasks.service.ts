import { Injectable } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/updatetasks.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Tasks } from "./tasks.schema";
import { Model } from "mongoose";

@Injectable()
export class TasksService{

	constructor(@InjectModel(Tasks.name) private tasksModel: Model<Tasks>) {}
		
	async updatetask(idtask: string, update: UpdateTaskDto){
		const data = await this.tasksModel.findByIdAndUpdate(idtask, update, {new: true}).exec();
		return (data);
	}
	
	async deletetask(id: string){
		console.log("\n");
		console.log(id);
		console.log("\n");
		const data = await this.tasksModel.findByIdAndDelete(id).exec();
	}
}