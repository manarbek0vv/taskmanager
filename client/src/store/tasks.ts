import { makeAutoObservable } from "mobx";
import { IError, ITask, Priority } from "../definitions/interfaces";
import TasksService from "../services/tasks.service";
import ErrorSerivce from "../services/error.service";
import { TaskDto } from "../dto/index.dto";

export class Tasks {
    tasks: ITask[] = [];
    isLoading: boolean = false;
    error: IError | null = null;
    success: string | null = null;

    setTasks(tasks: ITask[]) {
        this.tasks = tasks;
    }
    setLoading(value: boolean) {
        this.isLoading = value;
    }
    setError(value: IError | null) {
        this.error = value;
    }
    setSuccess(value: string | null) {
        this.success = value;
    }

    constructor() {
        makeAutoObservable(this);
    }

    get totalTasksCount() {
        return this.tasks.length;
    }
    get pendingTasksCount() {
        return this.tasks.filter(task => task.checkItems.every(checkItem => !checkItem.completed)).length;
    }
    get inProgressTasksCount() {
        return this.tasks.filter(task => (task.checkItems.some(checkItem => checkItem.completed) && task.checkItems.some(checkItem => !checkItem.completed))).length;
    }
    get completedTasksCount() {
        return this.tasks.filter(task => task.checkItems.every(checkItem => checkItem.completed)).length;
    }
    get lowTasksCount() {
        return this.tasks.filter(task => task.priority === Priority.LOW).length;
    }
    get mediumTasksCount() {
        return this.tasks.filter(task => task.priority === Priority.MEDIUM).length;
    }
    get highTasksCount() {
        return this.tasks.filter(task => task.priority === Priority.HIGH).length;
    }

    async findTasks(roomId: string) {
        try {
            this.setLoading(true);
            const tasks = await TasksService.findTasks(roomId);
            this.setTasks(tasks.data);
            this.setError(null);
        } catch (error) {
            this.setSuccess(null);
            this.setError(ErrorSerivce.getError(error));
        } finally {
            this.setLoading(false);
        }
    }
    async findOneTask(roomId: string, taskId: string) {
        return await TasksService.findOneTask(roomId, taskId);
    }
    async createTask(roomId: string, data: TaskDto) {
        return await TasksService.createTask(roomId, data);
    }
    async updateTask(roomId: string, taskId: string, data: TaskDto) {
        return await TasksService.updateTask(roomId, taskId, data);
    }
    async changeTask(roomId: string, taskId: string, data: TaskDto) {
        return await TasksService.changeTask(roomId, taskId, data);
    }
    async deleteTask(roomId: string, taskId: string) {
        return await TasksService.deleteTask(roomId, taskId)
    }
}