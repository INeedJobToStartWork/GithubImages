import config from "./tsup.base";
import typiaPlug from "@ryoppippi/unplugin-typia/esbuild";
import noInternalExportsPlugin from "@esplugins/no-internal-exports";
import { copy } from "esbuild-plugin-copy";
import { defineConfig } from "tsup";

export default defineConfig([
	{
		...config,

		splitting: false,
		minify: true,
		shims: true,

		bundle: true,

		minifyIdentifiers: true,
		minifySyntax: true,
		minifyWhitespace: true,

		metafile: false,
		treeshake: true,

		outDir: "dist",
		
		esbuildPlugins:[...config.esbuildPlugins,noInternalExportsPlugin]
	}
]);
