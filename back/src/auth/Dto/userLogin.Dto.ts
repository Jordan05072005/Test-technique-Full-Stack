import { IsNotEmpty, IsEmail, MinLength, Matches, IsString } from 'class-validator';


export class UserLoginDto {
	@IsNotEmpty({ message: "L'email ne peut pas être vide"})
	@IsEmail({}, { message: 'Email invalide' })
	@IsString({message: 'Email invalide'})
	email: string;
	@IsString({message: 'Le password est incorrect'})
	@IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide' })
	@MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
	@Matches(/(?=.*[a-z])/, { message: 'Le mot de passe doit contenir une lettre minuscule' })
	@Matches(/(?=.*[A-Z])/, { message: 'Le mot de passe doit contenir une lettre majuscule' })
	@Matches(/(?=.*\d)/, { message: 'Le mot de passe doit contenir un chiffre' })
	@Matches(/(?=.*[@$!%*?&])/, { message: 'Le mot de passe doit contenir un caractère spécial (@$!%*?&)' })
	password: string;
}
