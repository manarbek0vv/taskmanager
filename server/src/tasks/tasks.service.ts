import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto, getTaskDto, getTasksDto } from './dto/tasks.dto';
import { IPayload } from 'src/tokens/interfaces/token.interface';
import { Role } from '@prisma/client';
import { IStatus } from './interfaces/tasks.interface';

const include = {
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
export class TasksService {
    constructor(
        private primsa: PrismaService,
    ) { }

    async getTasks(user: IPayload, roomId: getTasksDto['roomId'], status: IStatus | null) {
        const assignTo = user.role === Role.USER ? { some: { id: user.userId } } : {};

        if (!status) return await this.primsa.task.findMany({ where: { roomId, assignTo }, include });
        else if (status === 'pending')
            return await this.primsa.task.findMany({
                where: {
                    roomId,
                    assignTo,
                    checkItems: {
                        every: { completed: false }
                    }
                },
                include,
            });
        else if (status === 'inprogress')
            return await this.primsa.task.findMany({
                where: {
                    roomId,
                    assignTo,
                    AND: [
                        {
                            checkItems: {
                                some: { completed: true }
                            }
                        },
                        {
                            checkItems: {
                                some: { completed: false }
                            }
                        }
                    ]
                },
                include,
            });
        else return await this.primsa.task.findMany({
            where: {
                roomId,
                assignTo,
                checkItems: {
                    every: { completed: true }
                }
            },
            include,
        });
    }

    async getTask({ roomId, taskId }: getTaskDto) {
        return await this.primsa.task.findUnique({
            where: { id: taskId, roomId },
            include: {
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
        });
    }
    async createTask(createTaskDto: TaskDto) {
        const { assignTo, checkItems, ...data } = createTaskDto;
        const createdTask = await this.primsa.task.create({
            data: {
                ...data,
                assignTo: { connect: assignTo.map(({ email }) => ({ email })) },
                checkItems: { createMany: { data: checkItems.map(({ title }) => ({ title })) } }
            },
            include: {
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
        });
        return createdTask;
    }
    async updateTask(taskId: string, updateTaskDto: TaskDto) {
        const { assignTo, checkItems, ...data } = updateTaskDto;
        const updatedTask = await this.primsa.task.update({
            where: { id: taskId },
            data: {
                ...data,
                assignTo: {
                    set: [],
                    connect: assignTo.map(({ email }) => ({ email }))
                },
                checkItems: {
                    deleteMany: { taskId: taskId },
                    createMany: { data: checkItems }
                }
            },
            include: {
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
        });
        return updatedTask;
    }
    async changeTask(taskId: string, updateTaskDto: TaskDto) {
        const { assignTo, checkItems, ...data } = updateTaskDto;
        const updatedTask = await this.primsa.task.update({
            where: { id: taskId },
            data: {
                checkItems: {
                    deleteMany: { taskId: taskId },
                    createMany: { data: checkItems }
                }
            },
            include: {
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
        });
        return updatedTask;
    }
    async deleteTask({ roomId, taskId }: getTaskDto) {
        return await this.primsa.task.delete({
            where:
                { id: taskId, roomId },
            include: {
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
        });
    }
}
