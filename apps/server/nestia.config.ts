import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
// import { FastifyAdapter } from "@nestjs/platform-fastify";

import { AppModule } from "./src/app.module";

const NESTIA_CONFIG: INestiaConfig = {
	input: async () => {
		const app = await NestFactory.create(AppModule);
		// const app = await NestFactory.create(AppModule, new FastifyAdapter());
		// app.setGlobalPrefix("api");
		// app.enableVersioning({
		//     type: VersioningType.URI,
		//     prefix: "v",
		// })
		return app;
	},
	swagger: {
		openapi: "3.1",
		output: "dist/swagger.json",
		security: {
			bearer: {
				type: "apiKey",
				name: "Authorization",
				in: "header"
			}
		},
		servers: [
			{
				url: "http://localhost:40000",
				description: "Local Server"
			}
		],
		beautify: true
	},
	output: "./lib"
};
export default NESTIA_CONFIG;
