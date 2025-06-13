import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { getTaskDto, getTasksDto, getTasksDtoQuery, taskDto, TaskDto, taskSchema } from './dto/tasks.dto';
import { ZodValidationPipe } from 'src/pipes/ZodValidation.pipe';
import { Request } from 'express';
import { IPayload } from 'src/tokens/interfaces/token.interface';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get(":roomId")
  @ApiOperation({ summary: "Get Tasks" })
  @ApiParam({ name: 'roomId', type: 'string', description: "ID of the room" })
  @ApiQuery({ name: 'status', type: 'string', description: 'Status Determination' })
  @ApiResponse({ status: 200, type: [taskDto] })
  @UseGuards(AuthGuard)
  getTasks(
    @Param() { roomId }: getTasksDto,
    @Query() { status }: getTasksDtoQuery,
    @Req() request: AdvancedRequest,
  ) {
    return this.tasksService.getTasks(request.user, roomId, status);
  }

  @Get(":roomId/:taskId")
  @ApiOperation({ summary: "Get Task" })
  @ApiParam({ name: 'roomId', type: 'string', description: "ID of the room" })
  @ApiParam({ name: 'taskId', type: 'string', description: "ID of the task" })
  @ApiResponse({ status: 200, type: taskDto })
  @UseGuards(AuthGuard)
  getTask(
    @Param() params: getTaskDto,
    @Req() request: AdvancedRequest,
  ) {
    return this.tasksService.getTask(params);
  }

  @Post(":roomId")
  @ApiOperation({ summary: "Create Task" })
  @ApiParam({ name: 'roomId', type: 'string', description: "ID of the room" })
  @ApiResponse({ status: 201, type: taskDto })
  @UseGuards(AuthGuard)
  createTask(
    @Body(new ZodValidationPipe(taskSchema)) createTaskDto: TaskDto,
    @Param() { roomId }: getTasksDto,
    @Req() request: AdvancedRequest,
  ) {
    return this.tasksService.createTask({ ...createTaskDto, roomId });
  }

  @Put(":roomId/:taskId")
  @ApiOperation({ summary: "Update Task" })
  @ApiParam({ name: 'roomId', type: 'string', description: "ID of the room" })
  @ApiParam({ name: 'taskId', type: 'string', description: "ID of the task" })
  @ApiResponse({ status: 201, type: taskDto })
  @UseGuards(AuthGuard)
  updateTask(
    @Param() { taskId, roomId }: getTaskDto,
    @Body(new ZodValidationPipe(taskSchema)) createTaskDto: TaskDto,
  ) {
    return this.tasksService.updateTask(taskId, { ...createTaskDto, roomId });
  }
  @Patch(":roomId/:taskId")
  @ApiOperation({ summary: "Change Task" })
  @ApiParam({ name: 'roomId', type: 'string', description: "ID of the room" })
  @ApiParam({ name: 'taskId', type: 'string', description: "ID of the task" })
  @ApiResponse({ status: 201, type: taskDto })
  @UseGuards(AuthGuard)
  changeTask(
    @Param() { taskId, roomId }: getTaskDto,
    @Body(new ZodValidationPipe(taskSchema)) createTaskDto: TaskDto,
  ) {
    console.log(createTaskDto)
    return this.tasksService.changeTask(taskId, { ...createTaskDto, roomId });
  }

  @Delete(":roomId/:taskId")
  @ApiOperation({ summary: "Delete Task" })
  @ApiParam({ name: 'roomId', type: 'string', description: "ID of the room" })
  @ApiParam({ name: 'taskId', type: 'string', description: "ID of the task" })
  @ApiResponse({ status: 200, type: taskDto })
  @UseGuards(AuthGuard)
  deleteTask(
    @Param() params: getTaskDto,
    @Req() request: AdvancedRequest,
  ) {
    return this.tasksService.deleteTask(params);
  }
}

type AdvancedRequest = Request & { user: IPayload };