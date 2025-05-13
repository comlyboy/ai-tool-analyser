import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter, HttpExceptionFilter } from './filters';

async function bootstrap() {
	const application = await NestFactory.create(AppModule);
	application.enableCors();
	application.setGlobalPrefix('api');
	application.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter());
	application.useGlobalPipes(new ValidationPipe({
		whitelist: true, transform: true,
		transformOptions: { enableImplicitConversion: true }
	}));
	await application.listen(process.env.PORT || 3330);
}
bootstrap();
