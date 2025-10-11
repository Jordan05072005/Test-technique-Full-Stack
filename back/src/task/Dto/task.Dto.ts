import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class TaskDto{
	@IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
	@IsString({message: 'Le titre est incorrect'})
	title: string;
	@IsBoolean()
	done: boolean = false;
	@IsNotEmpty({ message: "L'id ne peut pas être vide"})
	@IsString({message: "L'id est incorrect"})
	idProject: string;
}