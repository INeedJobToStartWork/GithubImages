import { Injectable } from "@nestjs/common";

@Injectable()
export class ImageService {
	getImage() {
		throw new Error("OYOYO");
		return "Image";
	}
}
