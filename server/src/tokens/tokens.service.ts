import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { IPayload, ITokens } from './interfaces/token.interface';
import { User } from '@prisma/client';

@Injectable()
export class TokensService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async generateTokens(payload: IPayload): Promise<ITokens> {
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m', secret: process.env.ACCESS_SECRET_KEY });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d', secret: process.env.REFRESH_SECRET_KEY });
        return { accessToken, refreshToken };
    }

    async findToken(refreshToken: ITokens['refreshToken']) {
        return this.prisma.token.findUnique({ where: { refreshToken } });
    }

    async saveToken(userId: User['id'], refreshToken: ITokens['refreshToken']) {
        return this.prisma.token.upsert({
            create: { userId, refreshToken },
            update: { refreshToken },
            where: { userId },
        })
    }

    async deleteToken(refreshToken: string) {
        return this.prisma.token.delete({ where: { refreshToken } });
    }

    async validateAccessToken(accessToken: string): Promise<IPayload> {
        return this.jwtService.verify(accessToken, { secret: process.env.ACCESS_SECRET_KEY });
    }
    async validateRefreshToken(refreshToken: string): Promise<IPayload> {
        return this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_SECRET_KEY });
    }
}

