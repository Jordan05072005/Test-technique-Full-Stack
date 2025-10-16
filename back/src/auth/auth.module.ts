import { JwtStrategy } from './../jwt/jwt.strategy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '../jwt/jwt.service';
import { PassportModule } from '@nestjs/passport';
// import { ItemsModule } from './items/items.module';

@Module({
  imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
	controllers:[AuthController],
	providers:[AuthService, JwtService, JwtStrategy],
	exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
