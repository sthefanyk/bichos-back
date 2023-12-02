import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CustomError } from 'src/@core/shared/domain/errors/error.interface';

@Catch()
export class CustomErrorFilter<T extends CustomError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.status || 500;
    const message = exception.message || 'Unknown error';
    const error = exception.className || 'Internal Server Error';

    response.status(status).json({
      message: message,
      error: error,
      statusCode: status,
    });
  }
}
