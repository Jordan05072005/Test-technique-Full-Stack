import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as path from 'path';

async function bootstrap() {
	const dotenv = require('dotenv');

  const app = await NestFactory.create(AppModule);

	const server = app.getHttpAdapter().getInstance();
  	server.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

	// dotenv.config({ path: path.resolve(__dirname, '../.env') });
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
	
	app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
		console.log('listening on', process.env.PORT || 3000);
	});

}
bootstrap();
