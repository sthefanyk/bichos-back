import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import * as cron from 'node-cron';
import {
  CheckAndUpdateStatusSponsorshipPost,
  CheckAndUpdateStatusAdoptPost,
} from 'src/@core/application/use-cases/post';

@Injectable()
export class PostCronService implements OnModuleInit {
  private readonly expressionCron = '0 0 * * *'; // At 00:00
  private readonly expressionCronTest = '*/5 * * * * *';

  @Inject(CheckAndUpdateStatusAdoptPost.Usecase)
  private useCaseAdopt: CheckAndUpdateStatusAdoptPost.Usecase;

  @Inject(CheckAndUpdateStatusSponsorshipPost.Usecase)
  private useCaseSponsorship: CheckAndUpdateStatusSponsorshipPost.Usecase;

  onModuleInit() {
    this.startCron();
  }

  private startCron() {
    cron.schedule(this.expressionCron, async () => {
      console.log('---------------');
      await this.useCaseAdopt.execute();
      await this.useCaseSponsorship.execute();
    });
  }
}
