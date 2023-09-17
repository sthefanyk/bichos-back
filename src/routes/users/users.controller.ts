import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto, SearchUsersDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUsersDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() searchParams: SearchUsersDto) {
    return this.usersService.findAll(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: SearchUsersDto) {
    return this.usersService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: SearchUsersDto) {
    return this.usersService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateUserDto: UpdateUsersDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.usersService.remove(id);
  }
}
