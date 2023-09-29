import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportService, ReportType } from './report.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';
// import { FastifyReply } from 'fastify';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(@Param('type') type: ReportType): ReportResponseDto[] {
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type') type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    return this.reportService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Param('type') type: ReportType,
    @Body()
    body: CreateReportDto,
  ): ReportResponseDto {
    return this.reportService.createReport(type, body);
  }

  @Put(':id')
  updateReport(
    @Param('id') id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    return this.reportService.updateReport(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.reportService.deleteReport(id);
  }
}
