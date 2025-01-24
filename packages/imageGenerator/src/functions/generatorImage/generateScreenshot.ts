import type { ScreenshotOptions, Viewport, WaitForOptions } from "puppeteer";
import puppeteer from "puppeteer";
import { BROWSER_SETTINGS, MyErrorList, PUPPETEER_DEFAULT_VALUES } from "./internals";
import { myError } from "oh-my-error";

//----------------------
// Types
//----------------------

type TgenerateScreenshotProps = {
	code: string;
	screenshotOptions?: ScreenshotOptions;
	setViewport?: Viewport;
	/**
	 * TODO: Fix that later
	 * {@inheritDoc puppeteer#WaitForOptions}
	 */
	waitForOptions: WaitForOptions;
};

//----------------------
// Functions
//----------------------

/**
 * Generates a screenshot from HTML/CSS code using Puppeteer.
 *
 * @param params - Configuration options for screenshot generation
 * @param params.code - HTML/CSS/JS code to render
 * @param params.setViewport - Viewport dimensions for the screenshot
 * @param params.screenshotOptions - Puppeteer screenshot options. See {@link https://pptr.dev/api/puppeteer.screenshotoptions | Puppeteer ScreenshotOptions docs}
 * @param params.waitForOptions - Puppeteer wait options for page load. See {@link https://pptr.dev/api/puppeteer.waitforoptions | Puppeteer WaitForOptions docs}
 * @returns Promise resolving to Uint8Array containing the screenshot
 *
 * @example
 * ```
 * const screenshot = await generateScreenshot({
 *   code: '<div>Hello World</div>',
 *   setViewport: { width: 800, height: 600 },
 *   screenshotOptions: { type: 'png' },
 *   waitForOptions: { waitUntil: 'networkidle0' }
 * });
 * ```
 *
 * @defaultValue screenshotOptions - {@link PUPPETEER_DEFAULT_VALUES.screenshotOptions}
 * @defaultValue waitForOptions - {@link PUPPETEER_DEFAULT_VALUES.waitForOptions}
 * @defaultValue setViewport - {@link DEFAULT_VIEWPORT }
 */
export const generateScreenshot = async (params: TgenerateScreenshotProps): Promise<Uint8Array> => {
	try {
		const mergedOptions = { ...PUPPETEER_DEFAULT_VALUES, ...params };

		const browser = await puppeteer.launch({ ...BROWSER_SETTINGS, defaultViewport: mergedOptions.setViewport });
		const page = await browser.newPage();
		await page.setContent(mergedOptions.code, mergedOptions.waitForOptions);
		const screenshot = await page.screenshot(mergedOptions.screenshotOptions);
		await browser.close();
		return screenshot;
	} catch (error) {
		throw myError(MyErrorList.GENERATOR_THROW_ERROR, { details: [error], hint: ["generateScreenshot"] });
	}
};

export default generateScreenshot;
