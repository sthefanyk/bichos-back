import { Controller, Get, Post, Body, Put, Param, Patch, Query, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonCreate, PersonSearch, PersonUpdate } from 'src/@core/application/use-cases/person';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import supabase from 'src/database/supabase/config';

@ApiTags('person')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
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

  // const result = await writeFile(join(__dirname, '..', '..', '..', 'storage', 'photos', 'a.png'), photo.buffer)

  @UseInterceptors(FileFieldsInterceptor([
    { name: 'photo' },
    { name: 'profile' },
  ]))
  @Post('photos')
  async photos(@UploadedFiles() photos: { photo: Express.Multer.File, profile: Express.Multer.File, }){

    if (!photos.photo || !photos.profile) {
      return null;
    }

    await supabase.storage.from("profile").upload("test1.png", photos.photo[0].buffer, {
      upsert: true,
    })

    await supabase.storage.from("profile").upload("test2.png", photos.profile[0].buffer, {
      upsert: true,
    })

    const result = await supabase.storage.from("profile").createSignedUrl("test1.png", 120);
    const result2 = await supabase.storage.from("profile").createSignedUrl("test2.png", 120);

    return { result, result2 };

  }

  @UseInterceptors(FileInterceptor('photo'))
  @Post('photo')
  async photo(@UploadedFile() photo: Express.Multer.File){

    // await supabase.storage.from("profile").upload("test.png", photo.buffer, {
    //   upsert: true,
    // })

    // const result = await supabase.storage.from("profile").createSignedUrl("test.png", 120);

    // return { result };

    return photo.buffer
  }

}
