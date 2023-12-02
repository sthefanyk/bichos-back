import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizProvider } from './quiz.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [QuizController],
  providers: [
    QuizService,
    QuizProvider.Repositories.QUIZ_TYPEORM_REPO,
    ...Object.values(QuizProvider.UseCases),
  ],
})
export class QuizModule {}
