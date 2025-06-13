import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    PrismaModule,
    TokensModule,
  ]
})
export class TasksModule {}
