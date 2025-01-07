import { ExceptionFilter, Catch, ArgumentsHost, Logger } from "@nestjs/common";
import { Response } from "express";

//----------------------
// Functions
//----------------------

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		Logger.error(exception, exception);

		response.status(exception?.status || 500).json(exception);
	}
}
