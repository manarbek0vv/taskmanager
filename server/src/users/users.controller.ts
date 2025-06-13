import { Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { findUsersInRoomDto, usersDto } from "./dto/users.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { getUserTasksDto, taskDto } from "src/tasks/dto/tasks.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { IPayload } from "src/tokens/interfaces/token.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get(":roomId")
    @ApiOperation({ summary: 'Get Users in Room' })
    @ApiResponse({ status: 200, type: usersDto })
    async findUsersInRoom(
        @Param() { roomId }: findUsersInRoomDto
    ) {
        return await this.usersService.findUsersInRoom(roomId);
    }

    @Get(":roomId/:userId")
    @ApiOperation({ summary: "Get User Tasks" })
    @ApiParam({ name: 'roomId', type: 'string', description: "ID of the room" })
    @ApiResponse({ status: 200, type: [taskDto] })
    @UseGuards(AuthGuard)
    getUserTasks(
        @Param() { roomId, userId }: getUserTasksDto,
        @Req() request: AdvancedRequest,
    ) {
        return this.usersService.getUserTasks(request.user, roomId, userId);
    }

    @Patch(":userId")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename(req, file, callback) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        })
    }))
    uploadAvatar(
        @UploadedFile() file: Express.Multer.File,
        @Param() { userId }: { userId: string },
    ) {
        return this.usersService.uploadAvatar(userId, file);
    }
}

type AdvancedRequest = Request & { user: IPayload };