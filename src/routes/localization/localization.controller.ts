import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { StateInsert } from 'src/@core/application/use-cases/localization/insert-state.usecase';
import { CityInsert } from 'src/@core/application/use-cases/localization/insert-city.usecase';

@Controller('localization')
export class LocalizationController {
  constructor(private readonly localizationService: LocalizationService) {}

  @Post('state')
  insertState(@Body() data: StateInsert.Input) {
    return this.localizationService.insertState(data);
  }
  @Get('state/:name')
  getStateByName(@Param('name') name: string) {
    return this.localizationService.getStateByName(name);
  }

  @Post('city')
  insertCity(@Body() data: CityInsert.Input) {
    return this.localizationService.insertCity(data);
  }

  @Get()
  findAll() {
    return this.localizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localizationService.findOne(+id);
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() data) {
    return this.localizationService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localizationService.remove(+id);
  }
}
