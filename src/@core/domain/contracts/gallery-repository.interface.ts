import { 
    GalleryFindImageByIdUseCase, 
    GalleryGetImageUrlUseCase, 
    GalleryInsertImageUseCase, 
    GalleryRemoveImageUseCase
} from "src/@core/application/use-cases/gallery";
import { Image } from "../entities/gallery/image";

export interface IGalleryRepository {
    insertImage(entity: Image, photo: Express.Multer.File): GalleryInsertImageUseCase.Output;
    getImageUrl(id: string): GalleryGetImageUrlUseCase.Output;
    findImageById(id: string): GalleryFindImageByIdUseCase.Output;
    removeImage(entityId: string): GalleryRemoveImageUseCase.Output;
}