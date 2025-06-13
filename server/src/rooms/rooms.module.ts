import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [PrismaModule]
})
export class RoomsModule {}
