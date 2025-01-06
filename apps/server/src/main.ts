import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { INestApplication } from "@nestjs/common";
import { VersioningType  } from "@nestjs/common";

import { NestiaSwaggerComposer } from "@nestia/sdk";
import { SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);

	app.enableVersioning({ type: VersioningType.URI });

	const document = await NestiaSwaggerComposer.document(app, {});
	SwaggerModule.setup("api", app, document as any);
	await app.listen(4000);

	// await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch(console.error);
