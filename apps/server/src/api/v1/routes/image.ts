import app from "@/app";
import { validateEquals } from "typia";
import { generateImg } from "@packages/imageGenerator";
import type { IMyErrorAPI, IMyErrorValidation, TMyErrorList } from "oh-my-error";
import { myError, myErrorWrapper, StatusCode } from "oh-my-error";
import type { Request, Response } from "express";

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

//----------------------
// Functions (API)
//----------------------

app.get("/v1/image", async (req: Request, res: Response) => {
	// Parsing Request - using typia
	const ValidationWithDetails = validateEquals<TParams>(req.body);
	if (!ValidationWithDetails.success) {
		const formatErrors = ValidationWithDetails.errors.map(error => ({
			name: error.path.slice(7),
			receivedValue: error.value == void 0 ? `${error.value}` : (error.value as string),
			expectedFormat: error.expected
		}));

		return res
			.status(MyErrorList.MISSING_PROPERTIES.status)
			.json(myError(MyErrorList.MISSING_PROPERTIES, { fields: [formatErrors] }));
	}

	const parsedRequest = ValidationWithDetails.data;
	// Check is Cached and Values changed - Cache-Control: max-age=0, no-cache, no-store, must-revalidate | pragma: no-cache
	// Render
	const result = await myErrorWrapper(generateImg, MyErrorList.INTERNAL_ERROR)(parsedRequest);
	// Response

	//TODO: PRECALCULATION IN BUILD
	const RequestHeadersETC = {
		fakeSVG: {
			headers: new Headers({ "Content-Type": "image/svg+xml", Vary: "Accept-Encoding" })
		},
		svg: {
			headers: new Headers({ foo: "bar" })
		},
		png: {
			headers: new Headers({ foo: "bar" })
		},
		webp: {
			headers: new Headers({ foo: "bar" })
		},
		gif: {
			headers: new Headers({ foo: "bar" })
		}
	} satisfies Record<TParams["type"], { headers: any }>;

	res.setHeaders(RequestHeadersETC[parsedRequest.type].headers);
	res.status(StatusCode.OK);
	res.send(result);
});
