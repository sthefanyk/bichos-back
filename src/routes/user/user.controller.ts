import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSearch } from 'src/@core/application/use-cases/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  search(@Query() searchParams: UserSearch.Input) {
    return this.userService.search(searchParams);
  }
}