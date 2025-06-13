import { ICheckItem, ITokens, IUser, Priority } from "../definitions/interfaces";

export interface SignupDto {
    fullName: string;
    email: string;
    password: string;
    avatar: File | null;
    inviteToken: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface AuthResponseDto {
    user: IUser;
    tokens: ITokens;
}

export interface LogoutResponesDto {
    id: string;
    refreshToken: string;
    userId: string;
}

// ---------------------------------------


export interface TaskDto {
    title: string;
    description: string;
    priority: Priority;
    dueDate: string;
    attachments: string[];
    assignTo: Array<{
        fullName: string;
        email: string;
        avatar: string | null
    }>;
    checkItems: ICheckItem[];
}