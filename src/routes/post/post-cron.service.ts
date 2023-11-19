import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import * as cron from 'node-cron';
import { 
  CheckAndUpdateStatusSponsorshipPost, 
  CheckAndUpdateStatusAdoptPost 
} from 'src/@core/application/use-cases/post';

@Injectable()
export class PostCronService implements OnModuleInit {
  private readonly expressionCron = '0 0 * * *'; // At 00:00
  private readonly expressionCronTest = '*/10 * * * * *'; // At 00:00
  
  @Inject(CheckAndUpdateStatusAdoptPost.Usecase)
  private useCaseAdopt: CheckAndUpdateStatusAdoptPost.Usecase;

  @Inject(CheckAndUpdateStatusSponsorshipPost.Usecase)
  private useCaseSponsorship: CheckAndUpdateStatusSponsorshipPost.Usecase;

  onModuleInit() {
    this.startCron();
  }

  private startCron() {
    cron.schedule(this.expressionCronTest, async () => {
      await this.useCaseSponsorship.execute();
      await this.useCaseAdopt.execute();
    });
  }
}