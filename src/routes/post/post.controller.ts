import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { PublishAdoptPost, PublishSponsorshipPost, SearchAdoptPost } from 'src/@core/application/use-cases/post';
import { SearchSponsorshipPost } from 'src/@core/application/use-cases/post/search-sponsorship-post.usecase copy';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id);
  // }
}
