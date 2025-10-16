import { PartialType } from '@nestjs/mapped-types';
import { ProjectsDto } from './projects.dto';

export class UpdateProjectDto extends PartialType(ProjectsDto) {}
