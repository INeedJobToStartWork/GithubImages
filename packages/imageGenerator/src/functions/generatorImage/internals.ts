/**
 * Internal constants and configurations for Puppeteer-based image generation
 *
 * @typeParam TProps - Type definition for generator properties
 * @see {@link ./generator} for the main generator implementation
 *
 * @packageDocumentation
 * @module generatorImage/internals
 * @internal
 */
//====================

import type puppeteer from "puppeteer";
import type { IMyError, TDetails, TMyErrorList } from "oh-my-error";
import type { Viewport } from "puppeteer";

//----------------------
// MyError
//----------------------

/** @internal @dontexport */
export const MyErrorList = {
	GENERATOR_THROW_ERROR: {
		code: "GENERATOR_THROW_ERROR",
		name: "Generator Throw Error",
		hint: (genName: string) => `${genName} - An error occurred while generating the screenshot`,
		details: (e: unknown) => e
	}
} as const satisfies TMyErrorList<IMyError & TDetails>;

//----------------------
// Internals
//----------------------

/** @internal @dontexport */
export const DEFAULT_VIEWPORT = {
	width: 1920,
	height: 1080
} as const satisfies Viewport;

/** @internal @dontexport */
export const BROWSER_SETTINGS = {
	headless: "shell",
	timeout: 3000,
	args: [
		"--incognito",
		"--disable-gpu",
		"--disable-infobars",
		"--disable-sync",
		"--disable-translate",
		"--no-sandbox",
		"--disable-setuid-sandbox"
	]
} as const satisfies Parameters<typeof puppeteer.launch>[0];

/** @internal @dontexport */
export const PUPPETEER_DEFAULT_VALUES = {
	screenshotOptions: { fullPage: true, omitBackground: true, encoding: "binary" },
	waitForOptions: { waitUntil: "networkidle0" }
} as const;
// } as const satisfies Partial<TgenerateScreenshotProps>;
