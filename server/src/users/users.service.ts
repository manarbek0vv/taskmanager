import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ISignupDto } from './interfaces/signupDto.interface';
import { Role, User } from '@prisma/client';
import { IPayload } from 'src/tokens/interfaces/token.interface';
import { getTasksDto } from 'src/tasks/dto/tasks.dto';

export const include = {
    assignTo: {
        select: {
            fullName: true,
            avatar: true,
            email: true,
        }
    },
    checkItems: {
        select: {
            taskId: true,
            title: true,
            completed: true,
        }
    }
}

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findUserByEmail(email: User['email']) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async createUser(user: ISignupDto) {
        return await this.prisma.user.create({ data: user });
    }


    async getUserTasks(user: IPayload, roomId: getTasksDto['roomId'], userId: string) {
        return await this.prisma.task.findMany({ where: { assignTo: { some: { id: userId } } }, include })
    }

    async findUsersInRoom(roomId: string) {
        return await this.prisma.user.findMany({
            where: { roomId, role: Role.USER },
            select: {
                id: true,
                fullName: true,
                email: true,
                avatar: true,
                role: true,
                roomId: true,
            }
        });
    }

    async uploadAvatar(userId: string, file: Express.Multer.File) {
        const filePath = `/uploads/${file.filename}`;
        return await this.prisma.user.update({
            where: { id: userId },
            data: { avatar: filePath },
            select: {
                id: true,
                fullName: true,
                email: true,
                avatar: true,
                role: true,
                roomId: true,
            }
        })
    }
}