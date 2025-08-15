import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger()

  @Cron(CronExpression.EVERY_10_SECONDS)
  async loggerSchedule() {
    // this.logger.log(Date.now(), 'Scheduler')
  }
}
