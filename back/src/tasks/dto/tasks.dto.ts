import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TasksDto{
	@IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
	@IsString({message: 'Le titre est incorrect'})
	body: string;
	@IsBoolean()
	checked: boolean = false;
	@IsNotEmpty({ message: "L'id ne peut pas être vide"})
	@IsString({message: "L'id est incorrect"})
	projectId: string;
}