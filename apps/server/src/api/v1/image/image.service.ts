import { Injectable } from "@nestjs/common";
import { generator } from "@packages/imageGenerator";
// import { IMyErrorAPI, IMyErrorValidation, myError, StatusCode, TMyErrorList } from "oh-my-error";
// import { generateImg } from "@packages/imageGenerator"

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
type TParams = Parameters<typeof generator>[0] & {
	cache?: boolean;
};

//----------------------
// Services (API)
//----------------------s

@Injectable()
export class ImageService {
	getImage(input: TParams) {
		const result = generator(input);
		console.log("AHA");

		return result;
	}
}
