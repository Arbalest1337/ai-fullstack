import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

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
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => {
        return normalizeResponse(data)
      })
    )
  }
}
