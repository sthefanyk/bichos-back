import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonCreate, PersonSearch, PersonUpdate } from 'src/@core/application/use-cases/person';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
