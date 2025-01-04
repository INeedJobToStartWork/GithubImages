import type { TTodo } from "@/types";
import { myErrorWrapper } from "oh-my-error";
import type { IMyError, TMyErrorList } from "oh-my-error";
import type { tags } from "typia";

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

//----------------------
// Types
//----------------------

type TProps = {
	code: string;
	setViewport?: {
		height: tags.Maximum<2560> & tags.Minimum<0> & number;
		width: tags.Maximum<2560> & tags.Minimum<0> & number;
	};
	// TODO: Only SVG 2
	type: "fakeSVG" | "gif" | "png" | "svg" | "webp";
};

//----------------------
// Main
//----------------------

export const generateImg = async (props: TProps) => {
	// const browser = await puppeteer.launch({
	// 	headless: "shell",
	// 	timeout: 3000,
	// 	defaultViewport: params.setViewport || { width: 1920, height: 1080 },
	// 	args: ["--incognito", "--disable-gpu", "--disable-infobars", "--disable-sync", "--disable-translate"]
	// });

	const OPTIONS_TEST = {
		fakeSVG: fakeSVGGenerator,
		gif: void 0,
		png: void 0,
		svg: void 0,
		webp: void 0
	} satisfies Record<TProps["type"], TTodo>;
	const result = myErrorWrapper(OPTIONS_TEST[props.type] as any, MyErrorList.GENERATOR_THROW_ERROR)(props);

	// console.log(result);

	return result;
};

export default generateImg;

//----------------------
// Functions
//----------------------

const DEFAULT_VIEWPORT: TProps["setViewport"] = {
	width: 1920,
	height: 1080
};

const fakeSVGGenerator = (params: TProps): string => {
	const viewport = params.setViewport || DEFAULT_VIEWPORT;
	const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" width="${viewport.width}" height="${viewport.height}" viewBox="0 0 ${viewport.width} ${viewport.height}">
	<foreignObject width="100%" height="100%">
			<div xmlns="http://www.w3.org/1999/xhtml">${params.code}</div>
	</foreignObject>
</svg>`;

	return svgTemplate;
};
