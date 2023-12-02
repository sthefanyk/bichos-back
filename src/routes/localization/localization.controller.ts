import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import {
  CityInsert,
  StateInsert,
} from '../../@core/application/use-cases/localization';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('localization')
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

  @Get('city/:state')
  getCitiesByState(@Param('state') state: string) {
    return this.localizationService.getCitiesByState(state);
  }

  @Get('states')
  listStates() {
    return this.localizationService.listStates();
  }

  @Get('cities')
  listCities() {
    return this.localizationService.listCities();
  }

  @Delete('city/:name')
  deleteCity(@Param('name') name: string) {
    const nameDecode = String(decodeURIComponent(name));
    return this.localizationService.deleteCity(nameDecode);
  }

  @Delete('state/:name')
  deleteState(@Param('name') name: string) {
    return this.localizationService.deleteState(name);
  }

  @Get('encode/:name')
  encode(@Param('name') name: string) {
    return encodeURIComponent(name);
  }
}
