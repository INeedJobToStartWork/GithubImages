import { Controller } from "@nestjs/common";
import { ImageService } from "./image.service";
import { TypedBody, TypedRoute } from "@nestia/core";

//----------------------
// Router & Controller
//----------------------

@Controller({ version: "1" })
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@TypedRoute.Get("/image")
	getImage(@TypedBody() props: Parameters<typeof this.imageService.getImage>) {
		return this.imageService.getImage();
	}
}



