import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TokensService],
  exports: [TokensService],
  imports: [
    PrismaModule,
    JwtModule,
  ],
})
export class TokensModule {}
