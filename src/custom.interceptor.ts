import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { map } from 'rxjs';
import { Report } from './data';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('THIS IS INTERCEPTING THE REQUEST');

    return handler.handle().pipe(
      map((data) => {
        console.log('THIS IS INTERCEPTING THE RESPONSE', data);

        const response = data.map((report: Report) => {
          const newData = {
            ...report,
            createAt: report.created_at,
          };
          delete newData.created_at;
          return newData;
        });

        return response;
      }),
    );
  }
}
