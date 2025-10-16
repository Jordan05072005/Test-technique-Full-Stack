import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from './tasks.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';


@Module({
	imports: [
		MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema}]),
	],
	controllers:[TasksController],
	providers:[TasksService],
})
export class TasksModule {}