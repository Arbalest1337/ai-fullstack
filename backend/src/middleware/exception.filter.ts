import {
  ExceptionFilter,
  InternalServerErrorException,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { red } from 'chalk'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private readonly logger = new Logger()

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost

    const ctx = host.switchToHttp()
    const req = ctx.getRequest()

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const { stack, cause = '', message } = exception as any
    const responseBody = {
      code: httpStatus,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: cause ?? message
    }

    this.logger.error(`${httpStatus} ${req.method} ${req.ip} ${req.originalUrl} \n${cause} \n${stack}`, 'Error')
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
