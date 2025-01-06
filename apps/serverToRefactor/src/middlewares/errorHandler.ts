import type { NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) =>
	// logger("An error occurred: ", err);

	res.status(err.status).json(err);

export default errorHandler;
