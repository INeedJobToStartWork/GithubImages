import { Injectable } from "@nestjs/common";

@Injectable()
export class ImageService {
	getImage() {
		return "Image";
	}
}
