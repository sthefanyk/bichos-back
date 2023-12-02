import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShelterService } from './shelter.service';
import {
  ShelterCreate,
  ShelterSearch,
  ShelterUpdate,
} from '../../@core/application/use-cases/shelter';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('shelter')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  create(@Body() data: ShelterCreate.Input) {
    return this.shelterService.create(data);
  }

  @Get()
  search(@Query() searchParams: ShelterSearch.Input) {
    return this.shelterService.search(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: ShelterSearch.Input) {
    return this.shelterService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: ShelterSearch.Input) {
    return this.shelterService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shelterService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: ShelterUpdate.Input) {
    return this.shelterService.update(id, data);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string) {
    return this.shelterService.inactivate(id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.shelterService.activate(id);
  }
}
