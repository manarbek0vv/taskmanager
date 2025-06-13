import { ITask } from "../definitions/interfaces";
import { TaskDto } from "../dto/index.dto";
import { $api } from "../http";

export default class TasksService {

    static async findTasks(roomId: string) {
        return await $api.get<ITask[]>(`/tasks/${roomId}`);
    }
    static async findPendingTasks(roomId: string) {
        return await $api.get<ITask[]>(`/tasks/${roomId}`, { params: { status: 'pending' } });
    }
    static async findInProgressTasks(roomId: string) {
        return await $api.get<ITask[]>(`/tasks/${roomId}`, { params: { status: 'inprogress' } });
    }
    static async findCompletedTasks(roomId: string) {
        return await $api.get<ITask[]>(`/tasks/${roomId}`, { params: { status: 'completed' } });
    }

    static async createTask(roomId: string, data: TaskDto) {
        return await $api.post<ITask>(`/tasks/${roomId}`, data);
    }

    static async findOneTask(roomId: string, taskId: string) {
        return await $api.get<ITask>(`/tasks/${roomId}/${taskId}`);
    }

    static async updateTask(roomId: string, taskId: string, data: TaskDto) {
        return await $api.put<ITask>(`/tasks/${roomId}/${taskId}`, data);
    }
    static async changeTask(roomId: string, taskId: string, data: TaskDto) {
        return await $api.patch<ITask>(`/tasks/${roomId}/${taskId}`, data);
    }

    static async deleteTask(roomId: string, taskId: string) {
        return await $api.delete<ITask>(`/tasks/${roomId}/${taskId}`);
    }
}