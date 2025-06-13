import { ApiProperty } from "@nestjs/swagger";
import { CheckItem, Priority, Task } from "@prisma/client";
import { z } from "zod";
import { IStatus } from "../interfaces/tasks.interface";

export class taskDto implements Task {
    @ApiProperty({ type: "string" })
    id: string;
    @ApiProperty({ type: "string" })
    title: string;
    @ApiProperty({ type: "string" })
    description: string;
    @ApiProperty({ enum: Priority })
    priority: Priority;
    @ApiProperty({ type: Date })
    dueDate: Date;
    @ApiProperty({ type: 'string', isArray: true })
    attachments: string[];
    @ApiProperty({ type: "string", isArray: true })
    checkList: string[];
    @ApiProperty({ type: "string" })
    roomId: string;
    @ApiProperty({ type: 'string', isArray: true })
    assignTo: string[];
    @ApiProperty({ type: Date })
    createdAt: Date;
}

// -----------------------------------

export class getTasksDto {
    @ApiProperty({ example: "54973cea-0c32-4b09-9e9f-dec924943d94" })
    roomId: string
}

export class getUserTasksDto {
    @ApiProperty({ example: "54973cea-0c32-4b09-9e9f-dec924943d94" })
    roomId: string
    @ApiProperty({ example: "54973cea-0c32-4b09-9e9f-dec924943d94" })
    userId: string
}

export class getTasksDtoQuery {
    @ApiProperty({ example: "54973cea-0c32-4b09-9e9f-dec924943d94", })
    status: IStatus | null;
}

export class getTasksResponseDto {
    @ApiProperty({ type: [taskDto] })
    tasks: taskDto[];
}

// -----------------------------------

export class getTaskDto {
    @ApiProperty({ example: "54973cea-0c32-4b09-9e9f-dec924943d94" })
    roomId: string;

    @ApiProperty({ example: "83847cea-0c32-4b09-9e9f-dec924943d94" })
    taskId: string;
}

// ------------------------------

export class assignToDto {
    @ApiProperty({ type: 'string' })
    fullName: string;
    @ApiProperty({ type: 'string' })
    email: string;
    @ApiProperty({ type: 'string' })
    avatar: string | null
}

// -----------------------------------

// export const createTaskSchema = z.object({
//     title: z.string()
//         .min(1, 'Title is too short')
//         .max(30, 'Title is too long.')
//     ,
//     description: z.string()
//         .min(1, 'Description is too short')
//         .max(300, 'Description is too long.')
//     ,
//     priority: z.enum(Object.values(Priority) as [string, ...string[]])
//     ,
//     dueDate: z.coerce.date()
//         .min(new Date(), { message: "Incorrect due date" })
//     ,
//     attachments: z.array(z.string())
//     ,
//     checkItems: z.array(z.object({
//         taskId: z.string(),
//         title: z.string(),
//         completed: z.boolean()
//     })).min(1, { message: "Add some things to do" })
//     ,
//     assignTo: z.array(z.object({
//         fullName: z.string(),
//         email: z.string(),
//         avatar: z.string().nullable()
//     })
//     ).min(1, { message: "Select users to assign" })
// })

// export class createTaskDto {
//     @ApiProperty({ type: "string" })
//     title: string;
//     @ApiProperty({ type: "string" })
//     description: string;
//     @ApiProperty({ enum: Priority })
//     priority: Priority;
//     @ApiProperty({ type: Date })
//     dueDate: Date;
//     @ApiProperty({ type: 'string', isArray: true })
//     attachments: string[];
//     @ApiProperty({ type: checkItemDto, isArray: true })
//     checkItems: checkItemDto[];
// @ApiProperty({ type: assignToDto, isArray: true })
// assignTo: Array<{
//     fullName: string;
//     email: string;
//     avatar: string | null
// }>;

//     roomId: string;
// }

// ----------------------------------

export const taskSchema = z.object({
    title: z.string()
        .min(1, 'Title is too short')
        .max(30, 'Title is too long.')
    ,
    description: z.string()
        .min(1, 'Description is too short')
        .max(300, 'Description is too long.')
    ,
    priority: z.enum(Object.values(Priority) as [string, ...string[]])
    ,
    dueDate: z.coerce.date()
        .min(new Date(), { message: "Incorrect due date" })
    ,
    attachments: z.array(z.string())
    ,
    checkItems: z.array(z.object({
        title: z.string(),
        completed: z.boolean()
    })).min(1, { message: "Add some things to do" })
    ,
    assignTo: z.array(z.object({
        fullName: z.string(),
        email: z.string(),
        avatar: z.string().nullable()
    })
    ).min(1, { message: "Select users to assign" })
})

export class checkItemDto {
    @ApiProperty({ type: 'string' })
    title: string;
    @ApiProperty({ type: 'boolean' })
    completed: boolean;
}

export class TaskDto {
    @ApiProperty({ type: "string" })
    title: string;
    @ApiProperty({ type: "string" })
    description: string;
    @ApiProperty({ enum: Priority })
    priority: Priority;
    @ApiProperty({ type: Date })
    dueDate: Date;
    @ApiProperty({ type: 'string', isArray: true })
    attachments: string[];
    @ApiProperty({ type: checkItemDto, isArray: true })
    checkItems: checkItemDto[];
    @ApiProperty({ type: assignToDto, isArray: true })
    assignTo: Array<{
        fullName: string;
        email: string;
        avatar: string | null
    }>;
    roomId: string;
}