import { TypedRoute } from '@nestia/core';
import { Controller, Get, Version } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller({ version: '1' })
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/image')
  getImage() {
    return this.imageService.getImage();
  }
}
