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
import { NGOService } from './ngo.service';
import {
  NGOCreate,
  NGOSearch,
  NGOUpdate,
} from 'src/@core/application/use-cases/ngo';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ngo')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('ngo')
export class NGOController {
  constructor(private readonly ngoService: NGOService) {}

  @Post()
  create(@Body() data: NGOCreate.Input) {
    return this.ngoService.create(data);
  }

  @Get()
  search(@Query() searchParams: NGOSearch.Input) {
    return this.ngoService.search(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: NGOSearch.Input) {
    return this.ngoService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: NGOSearch.Input) {
    return this.ngoService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ngoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: NGOUpdate.Input) {
    return this.ngoService.update(id, data);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string) {
    return this.ngoService.inactivate(id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.ngoService.activate(id);
  }
}
