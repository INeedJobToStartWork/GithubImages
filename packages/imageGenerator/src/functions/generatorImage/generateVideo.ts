import type { ScreenshotOptions, Viewport, WaitForOptions } from "puppeteer";
import puppeteer from "puppeteer";
import { BROWSER_SETTINGS, MyErrorList, PUPPETEER_DEFAULT_VALUES } from "./internals";
import { myError } from "oh-my-error";
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";

//----------------------
// Types
//----------------------

type TgenerateRecordProps = {
	code: string;
	screenshotOptions?: ScreenshotOptions;
	setViewport: Viewport;
	waitForOptions?: WaitForOptions;
};

//----------------------
// Functions
//----------------------

/**
 * Generates a video recording from HTML/CSS code using Puppeteer.
 *
 * @param props - Configuration options for recording
 * @param props.code - HTML/CSS/JS code to render
 * @param props.setViewport - Viewport dimensions for the recording
 * @param props.screenshotOptions - Puppeteer screenshot options
 * @param props.waitForOptions - Puppeteer wait options for page load
 * @returns Promise resolving to Buffer containing the video recording
 *
 * @experimental
 */
export const generateVideo = async (props: TgenerateRecordProps): Promise<Buffer> => {
	try {
		const mergedOptions = {
			...PUPPETEER_DEFAULT_VALUES,
			waitForOptions: { waitUntil: ["networkidle0", "load", "domcontentloaded"] },
			...props
		};

		const browser = await puppeteer.launch({ ...BROWSER_SETTINGS });
		const page = await browser.newPage();
		const recorder = new PuppeteerScreenRecorder(page);
		await recorder.start("./example.mp4"); // We don't want to save the video, we want to store that in a buffer
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

		await page.setContent(html, mergedOptions.waitForOptions as WaitForOptions);

		// TODO: Implement actual video recording functionality
		// This currently returns an empty buffer as a placeholder

		await recorder.stop();
		await browser.close();

		return void 0;
	} catch (error) {
		throw myError(MyErrorList.GENERATOR_THROW_ERROR, {
			details: [error],
			hint: ["generateVideo"]
		});
	}
};

export default generateVideo;
