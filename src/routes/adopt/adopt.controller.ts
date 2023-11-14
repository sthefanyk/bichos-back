import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AdoptService } from './adopt.service';
import { AdoptSearch, AdoptUsecase } from 'src/@core/application/use-cases/adopt';
// import { RoleGuard } from 'src/guards/role.guard';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/@core/shared/domain/enums/role.enum';
// import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('adopt')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('adopt')
export class AdoptController {
  constructor(private readonly adoptService: AdoptService) {}

  @Post()
  adopt(@Body() data: AdoptUsecase.Input) {
    return this.adoptService.adopt(data);
  }

  @Get()
  search(@Query() searchParams: AdoptSearch.Input) {
    return this.adoptService.search(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptService.findOne(id);
  }
}

