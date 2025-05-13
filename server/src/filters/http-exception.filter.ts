import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const http = host.switchToHttp();
		const { method, url } = http.getRequest<Request>();
		const res = http.getResponse<Response>();
		let statusCode = exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
		let message: string = (exception as any)?.response?.message || exception?.message || 'Internal server error!';

		if (statusCode > 499 && (message === '' || !message)) {
			message = 'Internal server error!'
		}

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