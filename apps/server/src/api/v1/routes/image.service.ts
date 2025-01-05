import type { Request, Response } from "express";

//----------------------
// Routes
//----------------------

export const imageController = {
	getImage: () => (req: Request, res: Response) => {
		res.send("Hello World");
	}
};
