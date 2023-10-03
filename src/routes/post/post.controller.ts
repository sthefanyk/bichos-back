import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { PublishAdoptPost, PublishSponsorshipPost } from 'src/@core/application/use-cases/post';

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

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
