import { copy } from "esbuild-plugin-copy";
import { defineConfig } from "tsup";
import typiaPlug from "@ryoppippi/unplugin-typia/esbuild";

export default defineConfig({
	entry: ["src/index.ts"],
	target: "es2020",
	clean: true,
	format: ["esm"],
	noExternal: ["typia"],

	esbuildPlugins: [
		typiaPlug({ tsconfig: "./tsconfig.json", cache: true }),
	],
	});
