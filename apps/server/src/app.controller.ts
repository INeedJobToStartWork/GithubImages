import { Controller } from "@nestjs/common";
import type { AppService } from "./app.service";
import { TypedBody, TypedRoute } from "@nestia/core";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@TypedRoute.Get("/hello")
	getHello(@TypedBody() text?: Parameters<typeof this.appService.getHello>[0]) {
		return this.appService.getHello(text);
	}
}
