import { Controller, Get, Post, Body, Put, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonCreate, PersonSearch, PersonUpdate } from 'src/@core/application/use-cases/person';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Roles(Role.ADMIN)
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() data: PersonCreate.Input) {
    return this.personService.create(data);
  }

  @Get()
  search(@Query() searchParams: PersonSearch.Input) {
    return this.personService.search(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: PersonSearch.Input) {
    return this.personService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: PersonSearch.Input) {
    return this.personService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: PersonUpdate.Input) {
    return this.personService.update(id, data);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string) {
    return this.personService.inactivate(id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.personService.activate(id);
  }
}
