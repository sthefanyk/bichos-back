import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { BreedService } from './breed.service';
import { BreedCreate, BreedSearch, BreedUpdate } from 'src/@core/application/use-cases/breed';
// import { RoleGuard } from 'src/guards/role.guard';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/@core/shared/domain/enums/role.enum';
// import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('breed')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  create(@Body() data: BreedCreate.Input) {
    return this.breedService.create(data);
  }

  @Get()
  search(@Query() searchParams: BreedSearch.Input) {
    return this.breedService.search(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: BreedSearch.Input) {
    return this.breedService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: BreedSearch.Input) {
    return this.breedService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedService.findOne(id);
  }

  @Get('specie/:specie')
  findBySpecie(@Param('specie') specie: string, @Query() searchParams: BreedSearch.Input) {
    return this.breedService.findBySpecie(searchParams, specie);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: BreedUpdate.Input) {
    return this.breedService.update(id, data);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string) {
    return this.breedService.inactivate(id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.breedService.activate(id);
  }
}

