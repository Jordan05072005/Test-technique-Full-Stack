import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import path from 'path';
import dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

	dotenv.config({ path: path.resolve('../.env') });
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
	
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
