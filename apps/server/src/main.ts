import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { INestApplication } from "@nestjs/common";
import { VersioningType, Logger } from "@nestjs/common";
import { NestiaSwaggerComposer } from "@nestia/sdk";
import { SwaggerModule } from "@nestjs/swagger";
import { PORT, HOST } from "@/utils";
import { WinstonModule } from "nest-winston";
import { WinstonConfig } from "@/../config/winstonLogger";

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger({ instance: WinstonConfig })
	});

	app.enableVersioning({ type: VersioningType.URI });

	const document = await NestiaSwaggerComposer.document(app, {});
	SwaggerModule.setup("api", app, document as any);
	await app.listen(PORT, () => {
		Logger.log(`⚡ Started on ${HOST}:${PORT}`, "NestApplication");
	});
}

bootstrap().catch(console.error);
