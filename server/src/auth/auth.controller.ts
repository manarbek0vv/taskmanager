import { Body, Controller, Delete, Post, Req, Res, UnauthorizedException, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authResponseDto, loginDto, loginSchema, logoutResponseDto, signupDto, signupSchema } from './dto/auth.dto';
import { ZodValidationPipe } from 'src/pipes/ZodValidation.pipe';
import { Request, Response } from 'express';
import { Token } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    @ApiOperation({ summary: 'Sign up' })
    @ApiBody({ type: signupDto })
    @ApiResponse({ status: 201, type: authResponseDto })
    @UsePipes(new ZodValidationPipe(signupSchema))
    async signup(
        @Res({ passthrough: true }) response: Response,
        @Body() signupDto: signupDto,
    ) {
        const data = await this.authService.signup(signupDto);
        response.cookie('refreshToken', data.tokens.refreshToken);
        return data;
    }

    @Post('/login')
    @ApiOperation({ summary: 'Login' })
    @ApiBody({ type: loginDto })
    @ApiResponse({ status: 201, type: authResponseDto })
    @UsePipes(new ZodValidationPipe(loginSchema))
    async login(
        @Res({ passthrough: true }) response: Response,
        @Body() loginDto: loginDto
    ) {
        const data = await this.authService.login(loginDto);
        response.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
        return data;
    }

    @Delete('/logout')
    @ApiOperation({ summary: 'Logout' })
    @ApiResponse({ status: 200, type: logoutResponseDto })
    async logout(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const { refreshToken } = request.cookies as Pick<Token, 'refreshToken'>;
        const token = await this.authService.logout(refreshToken);
        response.clearCookie('refreshToken');
        return token;
    }

    @Post('/refresh')
    @ApiOperation({ summary: 'Refresh' })
    @ApiResponse({ status: 201, type: authResponseDto })
    async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const { refreshToken } = request.cookies as Pick<Token, 'refreshToken'>;
        if (!refreshToken) throw new UnauthorizedException('No token');
        const data = await this.authService.refresh(refreshToken);
        response.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
        return data;
    }
}