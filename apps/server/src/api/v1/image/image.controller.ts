import { Controller, Post, Res } from "@nestjs/common";
import { ImageService } from "./image.service";
import { TypedBody } from "@nestia/core";
import { Response } from "express";

//----------------------
// Router & Controller
//----------------------

@Controller({ version: "1" })
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Post("/image")
	async getImage(@TypedBody() input: Parameters<typeof this.imageService.getImage>[0], @Res() res: Response) {
		const screenshotBuffer = await this.imageService.getImage(input);
		console.log("screenshotBuffer", screenshotBuffer);
		return res.end(screenshotBuffer);
	}
}
