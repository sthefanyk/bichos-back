import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @UseInterceptors(FileInterceptor('photo'))
  @Post('image')
  insertImage(@Body() data, @UploadedFile() photo: Express.Multer.File) {
    console.log('aaaaaaaaaaaa')
    return this.galleryService.insertImage({
      type: data.type,
      photo
    });
  }

  @Get('image/url/:id')
  getImageUrl(@Param('id') id: string) {
    return this.galleryService.getImageUrl({id});
  }

  @Delete('image/:id')
  removeImage(@Param('id') id: string) {
    return this.galleryService.removeImage({id});
  }
}

