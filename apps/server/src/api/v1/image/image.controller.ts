import { Controller } from "@nestjs/common";
import { ImageService } from "./image.service";
import { TypedRoute } from "@nestia/core";

@Controller({ version: "1" })
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@TypedRoute.Get("/image")
	getImage() {
		return this.imageService.getImage();
	}
}
