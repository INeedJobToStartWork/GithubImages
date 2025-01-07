import { Injectable } from "@nestjs/common";
import { IMyErrorAPI, myError } from "oh-my-error";

@Injectable()
export class ImageService {
	getImage() {
		// throw  myError({message:"OYOYO"} as IMyErrorAPI);
		return "Image";
	}
}
