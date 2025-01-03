import type { tags } from "typia";

//----------------------
// MyError
//----------------------

// const MyErrorList = {} as const satisfies TMyErrorList<IMyError>;

//----------------------
// Types
//----------------------

type Tparams = {
	code: string;
	setViewport?: {
		height: tags.Maximum<2560> & tags.Minimum<0> & number;
		width: tags.Maximum<2560> & tags.Minimum<0> & number;
	};
	type: "fakeSVG" | "gif" | "png" | "svg" | "webp";
};

//----------------------
// Functions
//----------------------

export const generateImg = async (params: Tparams) => {
	// const browser = await puppeteer.launch({
	// 	headless: "shell",
	// 	timeout: 3000,
	// 	defaultViewport: params.setViewport || { width: 1920, height: 1080 },
	// 	args: ["--incognito", "--disable-gpu", "--disable-infobars", "--disable-sync", "--disable-translate"]
	// });
	console.log("Hello World :)");

	return "Hello World";
};

export default generateImg;
