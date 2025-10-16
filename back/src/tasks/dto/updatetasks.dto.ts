import { PartialType } from '@nestjs/mapped-types';
import { TasksDto } from './tasks.dto';

export class UpdateTaskDto extends PartialType(TasksDto) {}
