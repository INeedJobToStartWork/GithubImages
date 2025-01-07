import { Module } from "@nestjs/common";

import { ImageModule } from "./api/v1/image/image.module";
import { APP_FILTER } from "@nestjs/core";
import { ErrorHandlerFilter } from "./middlewares";

@Module({
	imports: [ImageModule],
	providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHandlerFilter,
    },
  ],
})
export class AppModule {}
