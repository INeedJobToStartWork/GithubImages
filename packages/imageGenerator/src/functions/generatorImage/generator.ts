/* eslint-disable @typescript-eslint/sort-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { myErrorWrapper } from "oh-my-error";
import type { IMyError, TMyErrorList } from "oh-my-error";
import type { ScreenshotOptions } from "puppeteer";
import generateFakeSvg from "./generateFakeSvg";
import generateScreenshot from "./generateScreenshot";
import { generateGif } from "./generateGif";
import generateVideo from "./generateVideo";

//----------------------
// MyError
//----------------------

// TODO: FINISH THIS
const MyErrorList = {
	GENERATOR_THROW_ERROR: {
		code: "GENERATOR_THROW_ERROR",
		name: "Generator Throw Error"
	}
} as const satisfies TMyErrorList<IMyError>;

// TODO: SUPPORT JS CRASH IN PUPPETEER

//----------------------
// Types
//----------------------

// TODO: svg option
/** @dontexport */
export type TTypes = Exclude<ScreenshotOptions["type"], undefined> | "fakeSVG" | "gif" | "video" /** | "svg" */;

/** @dontexport */
export type TProps = { type: TTypes };
/** @dontexport */
export type TPropsValidated = Required<TProps>;

/** @internal @dontexport */
const OPTIONS_GENERATOR = {
	fakeSVG: generateFakeSvg,
	gif: generateGif,
	png: generateScreenshot,
	video: generateVideo,
	// svg: generateGif,
	webp: generateScreenshot,
	jpeg: generateScreenshot
} as const satisfies Record<TTypes, unknown>;

//----------------------
// Functions
//----------------------

// TODO: Make TsDocs better
/**
 * Generates an image using the specified type.
 *
 * @param props - Configuration options for image generation
 * @param props.type - Type of image to generate {@link TTypes | TTypes}
 * @param props.setViewport - Viewport dimensions for the image
 * @returns Promise resolving to Buffer containing the image
 *
 * @example
 * ```
 * const png = await generator({ type: "png", code: '<div>Hello World</div>' });
 * ```
 */
export const generator = async <T extends TTypes>(
	props: { type: T } & Parameters<(typeof OPTIONS_GENERATOR)[T]>[0]
) => {
	//TODO: fix it later
	const { type, ...rest } = props;
	const params = rest as unknown as Parameters<(typeof OPTIONS_GENERATOR)[typeof type]>[0];
	const result = await myErrorWrapper(OPTIONS_GENERATOR[type], MyErrorList.GENERATOR_THROW_ERROR)(params);
	return result;
};

export default generator;
