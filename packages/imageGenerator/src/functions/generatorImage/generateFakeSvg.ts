//----------------------
// Types
//----------------------

/** @dontexport */
type TgenerateFakeSvgProps = {
	code: string;
	setViewport: { height: number; width: number };
};

//----------------------
// Functions
//----------------------
/**
 * Generates a fake SVG string with the specified parameters.
 *
 * @param params - The validated properties for generating the SVG.
 * @returns A string representing the generated SVG.
 */
export const generateFakeSvg = (
	props: TgenerateFakeSvgProps
): string => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" width="${props.setViewport.width}" height="${props.setViewport.height}" viewBox="0 0 ${props.setViewport.width} ${props.setViewport.height}">
	<foreignObject width="100%" height="100%">
			<div xmlns="http://www.w3.org/1999/xhtml">${props.code}</div>
	</foreignObject>
</svg>`;

export default generateFakeSvg;
