import { Injectable } from "@nestjs/common";
import { IMyErrorAPI, IMyErrorValidation, myError, StatusCode, TMyErrorList } from "oh-my-error";
import { generateImg } from "@packages/imageGenerator"

//----------------------
// MyError
//----------------------

// const MyErrorList = {
// 	INTERNAL_ERROR: {
// 		status: StatusCode.InternalServerError
// 	},
// } as const satisfies TMyErrorList<IMyErrorAPI & IMyErrorValidation>;

//----------------------
// Types
//----------------------

/** @internal @dontexport */
// type TParams = Parameters<typeof generateImg>[0] & {
// 	cache?: boolean;
// };


//----------------------
// Services (API)
//----------------------

@Injectable()
export class ImageService {
	getImage() {
		// throw myError(MyErrorList.MISSING_PROPERTIES)
		const result = generateImg({})
		return "Image";
	}
}


