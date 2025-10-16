import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Projects, ProjectsSchema } from './projects.schema';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';
import { User, UserSchema } from 'src/auth/auth.schema';
import { Tasks, TasksSchema } from 'src/tasks/tasks.schema';
import { PassportModule } from '@nestjs/passport';
// import { ItemsModule } from './items/items.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Projects.name, schema: ProjectsSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Tasks.name, schema: TasksSchema }
		])
	],
	controllers:[ProjectsController],
	providers:[ProjectService],
})
export class ProjectsModule {}