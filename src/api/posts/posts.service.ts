import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePostDto) {
    return this.prisma.post.create({ data });
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateUserDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
