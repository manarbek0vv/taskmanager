import { Auth } from "../store/auth";
import { Tasks } from "../store/tasks";

// --------------------------------------------------

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    roomId: string;
    avatar: string | null;
    role: Role;
}

//--------------------------------------------------

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

//--------------------------------------------------

export interface IStore {
    auth: Auth;
    tasks: Tasks
}

//--------------------------------------------------

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}

//--------------------------------------------------

export interface IError {
    message: string;
    errors?: IErrorOne[];
}

//--------------------------------------------------

export interface IErrorOne {
    message: string;
}

//--------------------------------------------------

export interface ICheckItem {
    title: string;
    completed: boolean;
}

export interface ITask {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    dueDate: string;
    attachments: string[];
    roomId: string;
    assignTo: Array<{
        fullName: string;
        email: string;
        avatar: string | null
    }>;
    checkItems: ICheckItem[];
    createdAt: string;
}
