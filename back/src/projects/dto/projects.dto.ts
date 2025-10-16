import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class ProjectsDto{
	@IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
	@IsString({message: 'Le titre est incorrect'})
	title: string;
	@IsString({message: 'La description est incorrect'})
	description: string ;
	@IsNotEmpty({ message: "L'id ne peut pas être vide"})
	@IsString({message: "L'id est incorrect"})
	userid: string;
}