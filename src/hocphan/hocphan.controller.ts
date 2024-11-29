import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HocphanService } from './hocphan.service';
import { UpdateHocphanDto } from './dto/update-hocphan.dto';
import { CreateHocPhanDto } from './dto/create-hocphan.dto';

@Controller('hocphan')
export class HocphanController {
  constructor(private readonly hocphanService: HocphanService) {}

  @Post()
  create(@Body() createHocphanDto: CreateHocPhanDto) {
    return this.hocphanService.create(createHocphanDto);
  }

  @Get()
  findAll() {
    return this.hocphanService.findAll();
  }

  @Get(':MAHP')
  findOne(@Param('MAHP') MAHP: string) {
    return this.hocphanService.getHocPhanByMAHP(MAHP);
  }

  @Patch(':MAHP')
  update(
    @Param('MAHP') MAHP: string,
    @Body() updateHocphanDto: UpdateHocphanDto,
  ) {
    return this.hocphanService.update(MAHP, updateHocphanDto);
  }

  @Delete(':MAHP')
  remove(@Param('MAHP') MAHP: string) {
    return this.hocphanService.remove(MAHP);
  }
}
