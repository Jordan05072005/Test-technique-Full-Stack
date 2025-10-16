import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from "./dto/userlogin.dto";



@Controller('auth')
export class AuthController{
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() body : UserLoginDto){
		return (this.authService.login(body));
	}

	@Post('signup')
	async signup(@Body() body : UserDto){
		return (this.authService.signup(body));
	}
}