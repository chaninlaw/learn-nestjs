import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { data } from '../data';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report.find(
      (report) => report.type === type && report.id === id,
    );

    if (!report) return;

    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: CreateReportDto,
  ): ReportResponseDto {
    const newReport = {
      id: randomUUID(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(new ReportResponseDto(newReport));
    return new ReportResponseDto(newReport);
  }

  updateReport(id: string, body: UpdateReportDto): ReportResponseDto {
    const updatedReportIndex = data.report.findIndex(
      (report) => report.id === id,
    );

    const oldReport = data.report[updatedReportIndex];

    const updatedReport = (data.report[updatedReportIndex] = {
      ...oldReport,
      amount: body.amount ?? oldReport.amount,
      source: body.source ?? oldReport.source,
      updated_at: new Date(),
    });

    return new ReportResponseDto(updatedReport);
  }

  deleteReport(id: string) {
    const restReport = data.report.filter((report) => report.id !== id);

    data.report = restReport;
    return;
  }
}
