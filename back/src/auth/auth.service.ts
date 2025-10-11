import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDto } from "./Dto/user.Dto";
import { JwtService } from "../jwt/jwt.service";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./auth.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from "./Dto/UserLogin.Dto";


@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService,
		@InjectModel(User.name) private userModel: Model<User>
	){}

	async signup(user : UserDto){
		const hashedPassword = await bcrypt.hash(user.password, 10);
  	return this.userModel.create({
    	name: user.name,
    	email: user.email,
    	password: hashedPassword,
  	});
	}
	async login(user : UserLoginDto){
		const data = await this.userModel.findOne({
			email: user.email,
		})
		if (!data || (await bcrypt.compare(user.password, data.password)))
				throw new UnauthorizedException('email ou mot de passe invalide');
		const payload = {sub: data.name, email: user.email};
		return (this.jwtService.createToken(payload));
	}
}
