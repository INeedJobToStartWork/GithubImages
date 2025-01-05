import type { generateImg } from "@packages/imageGenerator";
import type { IMyErrorAPI, IMyErrorValidation, TMyErrorList } from "oh-my-error";
import { StatusCode } from "oh-my-error";
import { Router as router } from "express";
import { validator } from "@/middlewares/validator";
import { createValidateEquals } from "typia";
import { imageController as imageServices } from "./image.service";

//----------------------
// MyError
//----------------------

const MyErrorList = {
	INTERNAL_ERROR: {
		status: StatusCode.InternalServerError
	},
	MISSING_PROPERTIES: {
		status: StatusCode.BadRequest,
		name: "Missing properties",
		code: "MISSING_PROPERTIES",
		message: "Missing properties",
		hint: `Please provide the required properties`,
		endpoint: "/image",
		timestamp: new Date(),
		fields: (er: Record<string, unknown>) => er
	}
} as const satisfies TMyErrorList<IMyErrorAPI & IMyErrorValidation>;

//----------------------
// Types
//----------------------

/** @internal @dontexport */
type TParams = Parameters<typeof generateImg>[0] & {
	cache?: boolean;
};

const validate = createValidateEquals<TParams>();

//----------------------
// Functions (API)
//----------------------

export const imageRouter = router();

imageRouter.get("/v1/image", validator(validate, "body"), imageServices.getImage());

export default imageRouter;
