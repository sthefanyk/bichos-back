import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreatePersonalityDto } from './dto/create-personality.dto';
import { UpdatePersonalityDto } from './dto/update-personality.dto';
import { SearchPersonalityDto } from './dto/search-personality.dto';
import { PersonalityService } from './personality.service';

@Controller('personalities')
export class PersonalityController {
  constructor(private readonly personalityService: PersonalityService) {}

  @Post()
  create(@Body() createUserDto: CreatePersonalityDto) {
    return this.personalityService.create(createUserDto);
  }

  @Get()
  findAll(@Query() searchParams: SearchPersonalityDto) {
    return this.personalityService.findAll(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: SearchPersonalityDto) {
    return this.personalityService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: SearchPersonalityDto) {
    return this.personalityService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.personalityService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateUserDto: UpdatePersonalityDto,
  ) {
    return this.personalityService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.personalityService.remove(id);
  }
}
