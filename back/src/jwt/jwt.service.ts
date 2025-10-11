import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class JwtService {
	createToken(payload: any){
		const secretKey = process.env.SECRET_KEY;
		if (!secretKey)
			throw new Error("Erreur Intern .env")

		const token = jwt.sign(payload, secretKey, {expiresIn : '2h'})
		return token;
	}
}
