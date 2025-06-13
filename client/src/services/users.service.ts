import { ITask, IUser } from "../definitions/interfaces";
import { $api } from "../http";

export default class UsersService {

    static async findUsersInRoom(roomId: string) {
        return await $api.get<IUser[]>(`/users/${roomId}`);
    }
    static async findUsersTasks(roomId: string, userId: string) {
        return await $api.get<ITask[]>(`/users/${roomId}/${userId}`);
    }
    static async uploadAvatar(userId: string, file: File | null) {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        return (await $api.patch<IUser>(`/users/${userId}`, formData)).data;
    }
}