import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
    constructor (private prisma: PrismaService) {}

    async findRoom(invitation: string) {
        let room = await this.prisma.room.findUnique({ where: { exclusive: invitation } });
        if (room) return { room, role: Role.ADMIN };

        room = await this.prisma.room.findUnique({ where: { ordinary: invitation } });
        if (room) return { room, role: Role.USER };

        throw new InternalServerErrorException('Server error.');
    }
}