import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { tokensDto } from "src/tokens/dto/tokens.dto";
import { usersDto } from "src/users/dto/users.dto";
import { z } from "zod";

export const signupSchema = z.object({
    fullName: z.string()
        .min(6, 'Full name is too short.')
        .max(30, 'Full name is too long.')
    ,
    email: z.string()
        .email()
    ,
    password: z.string()
        .min(6, 'Password is too short.')
        .max(30, 'Password is too long.')
    ,
    inviteToken: z.string()
})

export const loginSchema = z.object({
    email: z.string()
        .email()
    ,
    password: z.string()
        .min(6, 'Password is too short.')
        .max(30, 'Password is too long.')
    ,
})

// DTOS

export class signupDto {

    @ApiProperty({ example: 'John Doe' })
    fullName: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    password: string;

    @ApiProperty({ example: 'token' })
    inviteToken: string;
}

export class loginDto {

    @ApiProperty({ example: 'test@mail.ru' })
    email: string;

    @ApiProperty({ example: 'testpassword' })
    password: string;
}

// RESPONSE DTOS

export class authResponseDto {

    @ApiProperty({ type: usersDto })
    user: usersDto;

    @ApiProperty({ type: tokensDto })
    tokens: tokensDto;
}

export class logoutResponseDto {

    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
    id: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4NjQ4YWRiNS05MzQ3LTQwMzItYmI1Ni0wNTRmNzc3Y2M5NTkiLCJlbWFpbCI6Im1hbmFyYmVrMHZ2YkBtYWlsLnJ1IiwiaWF0IjoxNzQ4OTY5NTMyLCJleHAiOjE3NTE1NjE1MzJ9.eYAfaF0vSCY77KPM2nxr5DZtqm1yHm0gyav97o0P74Q' })
    refreshToken: string;

    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
    userId: string;
}