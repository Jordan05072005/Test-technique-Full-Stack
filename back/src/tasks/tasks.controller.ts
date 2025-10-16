import { Body, Controller, Delete, Param, Patch } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/updatetasks.dto";
import { TasksService } from "./tasks.service";

@Controller('tasks')
export class TasksController{
constructor (private readonly taskService : TasksService){}

	@Patch(':id')
	async updatetask(@Param('id') id: string, @Body() data: UpdateTaskDto){
		return this.taskService.updatetask(id, data);
	}

	@Delete(':id')
	async deletetask(@Param('id') id: string){
		this.taskService.deletetask(id);
	}
}