import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { INestApplication } from "@nestjs/common";
import { VersioningType } from "@nestjs/common";
import { NestiaSwaggerComposer } from "@nestia/sdk";
import { SwaggerModule } from "@nestjs/swagger";

import { PORT, HOST } from "@/utils";

async function bootstrap() {
	console.time("⚡ Server startup");
	const app: INestApplication = await NestFactory.create(AppModule);

	app.enableVersioning({ type: VersioningType.URI });

	const document = await NestiaSwaggerComposer.document(app, {});
	SwaggerModule.setup("api", app, document as any);
	await app.listen(PORT, () => console.log(`Started on ${HOST}:${PORT}`));
	console.timeEnd("⚡ Server startup");
}
bootstrap().catch(console.error);
