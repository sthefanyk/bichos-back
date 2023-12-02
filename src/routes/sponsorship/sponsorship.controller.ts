import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SponsorshipService } from './sponsorship.service';
import {
  SponsorshipSearch,
  SponsorshipUsecase,
} from 'src/@core/application/use-cases/sponsorship';
// import { RoleGuard } from 'src/guards/role.guard';
// import { Roles } from 'src/decorators/roles.decorator';
// import { Role } from 'src/@core/shared/domain/enums/role.enum';
// import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sponsorship')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('sponsorship')
export class SponsorshipController {
  constructor(private readonly sponsorshipService: SponsorshipService) {}

  @Post()
  sponsorship(@Body() data: SponsorshipUsecase.Input) {
    return this.sponsorshipService.sponsorship(data);
  }

  @Get()
  search(@Query() searchParams: SponsorshipSearch.Input) {
    return this.sponsorshipService.search(searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sponsorshipService.findOne(id);
  }
}
