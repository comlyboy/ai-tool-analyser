import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';



@Catch()
export class AllExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const http = host.switchToHttp();
		const { method, url } = http.getRequest<Request>();
		const res = http.getResponse<Response>();
		let statusCode = exception instanceof HttpException ? exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR : exception?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
		let message = exception.response?.message || exception?.message || 'Internal server error!';


		const error = {
			statusCode,
			timestamp: new Date().toISOString(),
			method,
			path: url,
			message
		};

		return res.status(statusCode).json({
			statusCode,
			message: error.message,
			data: null,
			error
		});
	}
}