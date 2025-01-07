import { Injectable } from "@nestjs/common";

//----------------------
// Services
//----------------------

@Injectable()
export class ImageService {
	getImage() {
		// throw  myError({message:"OYOYO"} as IMyErrorAPI);
		return "Image";
	}
}
