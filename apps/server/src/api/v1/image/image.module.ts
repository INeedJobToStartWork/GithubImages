import { Module } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ImageController } from "./image.controller";

//----------------------
// Modules
//----------------------

@Module({
	controllers: [ImageController],
	providers: [ImageService]
})
export class ImageModule {}
