import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class newTasksDto{
	@IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
	@IsString({message: 'Le titre est incorrect'})
	body: string;
	@IsBoolean()
	@IsOptional()
	checked: boolean = false;
}

