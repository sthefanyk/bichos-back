import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards, Put } from '@nestjs/common';
import { NeedService } from './need.service';
import { NeedCreate, NeedSearch, NeedUpdate } from 'src/@core/application/use-cases/need';
// import { RoleGuard } from 'src/guards/role.guard';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/@core/shared/domain/enums/role.enum';
// import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('need')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('need')
export class NeedController {
  constructor(private readonly needService: NeedService) {}

  @Post()
  create(@Body() data: NeedCreate.Input) {
    return this.needService.create(data);
  }

  @Get()
  search(@Query() searchParams: NeedSearch.Input) {
    return this.needService.search(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: NeedSearch.Input) {
    return this.needService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: NeedSearch.Input) {
    return this.needService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.needService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: NeedUpdate.Input) {
    return this.needService.update(id, data);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string) {
    return this.needService.inactivate(id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.needService.activate(id);
  }
}
