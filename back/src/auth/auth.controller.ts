import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from './Dto/user.Dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from "./Dto/UserLogin.Dto";



@Controller('auth')
export class AuthController{
	constructor(private readonly authService: AuthService) {}

	@Post('auth/login')
	async login(@Body() body : UserLoginDto){
		return (this.authService.login(body));
	}

	@Post('auth/signup')
	async signup(@Body() body : UserDto){
		return (this.authService.signup(body));
	}
}