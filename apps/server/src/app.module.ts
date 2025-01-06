import { Module } from "@nestjs/common";

import { ImageModule } from "./api/v1/image/image.module";

@Module({
	imports: [ImageModule]
})
export class AppModule {}
