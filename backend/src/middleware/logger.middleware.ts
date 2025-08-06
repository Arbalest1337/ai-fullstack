import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { blue } from 'chalk'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger()

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${blue.bold(req.method)} ${req.ip} ${req.originalUrl}`, 'LoggerMiddleware')
    next()
  }
}
