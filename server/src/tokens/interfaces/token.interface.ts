import { Role } from "@prisma/client";

export interface IPayload {
    userId: string;
    email: string;
    role: Role;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}