import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PersonalityService } from './personality.service';
import {
  PersonalityCreate,
  PersonalitySearch,
  PersonalityUpdate,
} from 'src/@core/application/use-cases/personality';
// import { RoleGuard } from 'src/guards/role.guard';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/@core/shared/domain/enums/role.enum';
// import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('personality')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('personality')
export class PersonalityController {
  constructor(private readonly personalityService: PersonalityService) {}

  @Post()
  create(@Body() data: PersonalityCreate.Input) {
    return this.personalityService.create(data);
  }

  @Get()
  search(@Query() searchParams: PersonalitySearch.Input) {
    return this.personalityService.search(searchParams);
  }

  @Get('active')
  getActivateRecords(@Query() searchParams: PersonalitySearch.Input) {
    return this.personalityService.getActiveRecords(searchParams);
  }

  @Get('inactive')
  getDeactivateRecords(@Query() searchParams: PersonalitySearch.Input) {
    return this.personalityService.getInactiveRecords(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalityService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: PersonalityUpdate.Input) {
    return this.personalityService.update(id, data);
  }

  @Patch('inactivate/:id')
  inactivate(@Param('id') id: string) {
    return this.personalityService.inactivate(id);
  }

  @Patch('activate/:id')
  activate(@Param('id') id: string) {
    return this.personalityService.activate(id);
  }
}
