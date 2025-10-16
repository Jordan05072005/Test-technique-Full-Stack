import { JwtAuthGuard } from './../jwt/jwt.guard';
import { Controller, Get, UseGuards, Req, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProjectService } from "./projects.service";
import { newProjectDto } from './dto/newproject.dto';
import { UpdateProjectDto } from './dto/updateproject.dto';
import { newTasksDto } from 'src/tasks/dto/newtasks.dto';


@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController{
	constructor (private readonly projectsService : ProjectService){}

	@Get()
	async getproject(@Req() req: any){
		return this.projectsService.getproject(req.user.userId);
	}

	@Post()
	async addproject(@Req() req: any, @Body() project: newProjectDto){
		return this.projectsService.addproject(project ,req.user.userId);
	}

	@Patch(':id')
	async updateproject(@Body() update: UpdateProjectDto, @Param('id') id: string,){
		return this.projectsService.updateproject(update, id);
	}

	@Delete(':id')
	async deleteproject(@Param('id') id: string,){
		return this.projectsService.deleteproject(id);
	}

	@Get(':projectId/tasks')
	async gettask(@Param('projectId') projectId: string){
		return (this.projectsService.gettask(projectId));
	}

	@Post(':projectId/tasks')
	async newtask(@Param('projectId') projectId: string, @Body() task: newTasksDto){
		return (this.projectsService.newtask(projectId, task))
	}
}