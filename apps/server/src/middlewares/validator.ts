import type { Request, Response, NextFunction } from "express";
import { myError, StatusCode } from "oh-my-error";
import type { IMyErrorAPI, IMyErrorValidation, TMyErrorList } from "oh-my-error";
import type { createValidate } from "typia";

//----------------------
// MyError
//----------------------

const MyErrorList = {
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

/**
 * Middleware function to validate request body or query parameters using a provided validator.
 *
 * @template T - The type of the user-defined validator function.
 * @param {T} userValidator - The validator function to validate the request data.
 * @param {"body" | "query"} toCheck - Specifies whether to validate the request body or query parameters.
 * @returns {Function} Middleware function to validate the request and call the next middleware.
 *
 * The middleware function validates the request data using the provided validator function.
 * If validation is successful, it calls the next middleware.
 * If validation fails, it formats the validation errors and passes them to the next middleware.
 *
 * @example
 * // Example usage:
 * const validateBody = validator(myBodyValidator, "body");
 * app.post("/endpoint", validateBody, (req, res) => {
 *   res.send("Request is valid");
 * });
 */
export const validator =
	<T extends ReturnType<typeof createValidate>>(userValidator: T, toCheck: "body" | "query") =>
	(req: Request, res: Response, next: NextFunction) => {
		const ValidationWithDetails = userValidator(req[toCheck]);
		if (ValidationWithDetails.success) {
			next();
			return;
		}
		const formatErrors = ValidationWithDetails.errors.map(
			error =>
				({
					name: error.path.slice(7),
					receivedValue: error.value == void 0 ? `${error.value}` : (error.value as string),
					expectedFormat: error.expected
				}) satisfies IMyErrorValidation["fields"][number]
		) satisfies IMyErrorValidation["fields"];

		next(myError(MyErrorList.MISSING_PROPERTIES, { fields: [formatErrors] }));
	};
