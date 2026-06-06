import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('inspections')
export class InspectionsController {
  constructor(
    private readonly inspectionsService: InspectionsService,
  ) {}

  @Get()
  findAll() {
    return this.inspectionsService.findAll();
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Post()
  create(
    @Body()
    createInspectionDto: CreateInspectionDto,
  ) {
    return this.inspectionsService.create(
      createInspectionDto,
    );
  }
}
