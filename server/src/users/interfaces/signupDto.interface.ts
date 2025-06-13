import { Role } from "@prisma/client";

export interface ISignupDto {
    fullName: string;
    email: string;
    password: string;
    roomId: string;
    role: Role
}