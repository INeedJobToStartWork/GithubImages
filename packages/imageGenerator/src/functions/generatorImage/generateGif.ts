/* eslint-disable no-await-in-loop */
import type { ScreenshotOptions, Viewport, WaitForOptions } from "puppeteer";
import puppeteer from "puppeteer";
import type { TPropsValidated as TGeneratorProps } from "./generator";
import GIFEncoder from "gif-encoder";
import { promisify } from "node:util";
import getPixels from "get-pixels";
import { BROWSER_SETTINGS, MyErrorList, PUPPETEER_DEFAULT_VALUES } from "./internals";
import { myError } from "oh-my-error";

//----------------------
// Types
//----------------------

type TGifConfig = {
	delay: number;
	frameCount: number;
	frameRate: number;
	quality: number;
	repeat: number;
};

type TgenerateGifProps = TGeneratorProps & {
	code: string;
	gifConfig?: TGifConfig;
	screenshotOptions?: ScreenshotOptions;
	setViewport: Viewport;
	/**
	 * TODO: Fix that later
	 * {@inheritDoc puppeteer#WaitForOptions}
	 */
	waitForOptions?: WaitForOptions;
};

//----------------------
// Functions
//----------------------
// TODO: Make it better
/**
 * Generates an animated GIF from HTML/CSS code using Puppeteer and GIFEncoder.
 *
 * @param props - Configuration options for GIF generation
 * @param params.code - HTML/CSS/JS code to render
 * @param params.setViewport - Viewport dimensions for the GIF
 * @param params.gifConfig - GIF encoding configuration
 * @param params.gifConfig.frameRate - Frames per second
 * @param params.gifConfig.quality - GIF quality (1-10)
 * @param params.gifConfig.delay - Delay between frames in milliseconds
 * @param params.gifConfig.repeat - Number of times to loop (0 = infinite)
 * @param params.gifConfig.frameCount - Total number of frames to capture
 * @returns Promise resolving to Buffer containing the GIF
 *
 * @example
 * ```
 * const gif = await generateGif({
 *   code: '<div>Hello World</div>',
 *   setViewport: { width: 800, height: 600 },
 *   gifConfig: {
 *     frameRate: 30,
 *     quality: 5,
 *     delay: 100,
 *     repeat: 0,
 *     frameCount: 60
 *   }
 * });
 * ```
 *
 * @defaultValue gifConfig - {@link ENCODE_DEFAULTS}
 * @defaultValue waitForOptions - {@link PUPPETEER_DEFAULT_VALUES.waitForOptions}
 * @defaultValue setViewport - {@link DEFAULT_VIEWPORT}
 */
export const generateGif = async (props: TgenerateGifProps): Promise<Buffer> => {
	try {
		const mergedOptions = {
			...PUPPETEER_DEFAULT_VALUES,
			waitForOptions: { waitUntil: ["networkidle0", "load", "domcontentloaded"] },
			gifConfig: ENCODE_DEFAULTS,
			...props
		} satisfies TgenerateGifProps;

		const browser = await puppeteer.launch({ ...BROWSER_SETTINGS });
		const page = await browser.newPage();

		const html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {
                    box-sizing: border-box;
                }
                body {
                    margin: 0;
                    padding: 0;
                    width: ${props.setViewport.width}px;
                    height: ${props.setViewport.height}px;
                    overflow: hidden;
                }
                #container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
            </style>
        </head>
        <body>
            <div id="container">
                ${props.code}
            </div>
        </body>
    </html>
`;
		await page.setContent(html, mergedOptions.waitForOptions);

		const gif = new GIFEncoder(props.setViewport.width, props.setViewport.height);
		if (mergedOptions.gifConfig.frameRate) gif.setFrameRate(mergedOptions.gifConfig.frameRate);
		gif.setQuality(mergedOptions.gifConfig.quality);
		gif.setDelay(mergedOptions.gifConfig.delay);
		gif.setRepeat(mergedOptions.gifConfig.repeat);

		const chunks: Buffer[] = [];
		gif.on("data", (chunk: Buffer) => chunks.push(chunk));
		gif.writeHeader();

		const frames: Buffer[] = [];
		for (let i = 0; i < mergedOptions.gifConfig.frameCount; i++) {
			frames.push(Buffer.from(await page.screenshot(mergedOptions.screenshotOptions)));
		}

		await browser.close();

		for (const frame of frames) {
			//TODO: Fix type later
			const pixels = await getPixelsAsync(frame, "image/png");
			gif.addFrame(pixels.data);
			gif.read();
		}

		gif.finish();

		return Buffer.concat(chunks);
	} catch (error) {
		throw myError(MyErrorList.GENERATOR_THROW_ERROR, { details: [error], hint: ["generateGif"] });
	}
};

export default generateGif;

const getPixelsAsync = promisify(getPixels);

//----------------------
// INTERNALS
//----------------------

const ENCODE_DEFAULTS = {
	frameRate: 10,
	quality: 1,
	delay: 100,
	repeat: 0,
	frameCount: 10
} as const satisfies TgenerateGifProps["gifConfig"];
