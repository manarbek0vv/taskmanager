import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class usersDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
    id: string;

    @ApiProperty({ example: 'John Doe' })
    fullName: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;

    @ApiProperty({ example: 'room1234' })
    roomId: string;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    avatar?: string

    @ApiProperty({ enum: Role, example: Role.USER })
    role: Role;
}

export class findUsersInRoomDto {
    @ApiProperty({ type: 'string' })
    roomId: string
}