import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { yellow, blue } from 'chalk'

export interface ApiResponse<T> {
  code: HttpStatus
  message: string
  data: T
}

const normalizeResponse = <T>(data: T): ApiResponse<T> => ({
  code: HttpStatus.OK,
  message: 'success',
  data
})

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  private readonly logger = new Logger()

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const res = ctx.getResponse()
    const start = Date.now()
    return next.handle().pipe(
      map(data => {
        return normalizeResponse(data)
      }),
      tap({
        complete: () => {
          const ms = Date.now() - start
          this.logger.log(
            `${req.method} ${req.ip} ${req.originalUrl} ${blue(res.statusCode)} ${yellow(ms + 'ms')}`,
            'HTTP'
          )
        }
      })
    )
  }
}
