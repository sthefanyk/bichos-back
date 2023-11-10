import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { AddQuestionToQuiz, QuizCreate, RemoveQuestionToQuiz } from 'src/@core/application/use-cases/quiz';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quiz')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(Role.ADMIN)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() data: QuizCreate.Input) {
    return this.quizService.create(data);
  }

  @Get(':title')
  findByTitle(@Param('title') title: string) {
    return this.quizService.findByTitle({title});
  }

  @Post('add/question')
  addQuestion(@Body() data: AddQuestionToQuiz.Input) {
    return this.quizService.addQuestion(data);
  }

  @Delete('question/:id_question')
  removeQuestion(@Param('id_question') id_question: RemoveQuestionToQuiz.Input) {
    return this.quizService.removeQuestion(id_question);
  }
}

