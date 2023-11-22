import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  PublishAdoptPost,
  PublishSponsorshipPost,
  SearchAdoptPost,
} from 'src/@core/application/use-cases/post';
import { SearchSponsorshipPost } from 'src/@core/application/use-cases/post/search-sponsorship-post.usecase';
import { PostInactivate } from 'src/@core/application/use-cases/post/inactivate-adopt-post.usecase';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import PhotosConfig from 'src/@core/domain/entities/posts/post';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @UseInterceptors(FileFieldsInterceptor(PhotosConfig))
  @Post('adopt')
  publishAdoptPost(@Body() data: PublishAdoptPost.Input) {
    return this.postService.publishAdoptPost(data);
  }

  @Post('sponsorship')
  publishSponsorshipPost(@Body() data: PublishSponsorshipPost.Input) {
    return this.postService.publishSponsorshipPost(data);
  }

  @Get('adopt')
  findAllAdoptPost(@Query() searchParams: SearchAdoptPost.Input) {
    return this.postService.searchAdoptPost(searchParams);
  }

  @Get('sponsorship')
  findAllSponsorshipPost(@Query() searchParams: SearchSponsorshipPost.Input) {
    return this.postService.searchSponsorshipPost(searchParams);
  }

  @Get('adopt/:id')
  findByIdAdoptPost(@Param('id') id: string) {
    return this.postService.findByIdAdoptPost({ id });
  }

  @Get('sponsorship/:id')
  findByIdSponsorshipPost(@Param('id') id: string) {
    return this.postService.findByIdSponsorshipPost({ id });
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string, @Body() data: PostInactivate.Input) {
    return this.postService.inactivatePost(id, data);
  }
}
