import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryProvider } from './gallery.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GalleryController],
  providers: [
    GalleryService,
    GalleryProvider.Repositories.GALLERY_TYPEORM_REPO,
    ...Object.values(GalleryProvider.UseCases),
  ],
})
export class GalleryModule {}
