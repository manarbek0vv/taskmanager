import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { loginDto, signupDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { IPayload } from 'src/tokens/interfaces/token.interface';
import { TokensService } from 'src/tokens/tokens.service';
import * as bcrypt from 'bcrypt';
import { RoomsService } from 'src/rooms/rooms.service';
import { ISignupDto } from 'src/users/interfaces/signupDto.interface';
import { Token } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
        private tokensService: TokensService,
        private roomsService: RoomsService,
    ) { }

    async signup(signupFullDto: signupDto) {
        const candidate = await this.usersService.findUserByEmail(signupFullDto.email);
        if (candidate) throw new BadRequestException();

        const { inviteToken, ...signupDto } = signupFullDto;

        const roomData = await this.roomsService.findRoom(signupFullDto.inviteToken);
        const hashPassword = await bcrypt.hash(signupDto.password, 3);

        const dataForCreateUser: ISignupDto = {
            ...signupDto, password: hashPassword,
            roomId: roomData.room?.id, role: roomData.role,
        }
        const createdUser = await this.usersService.createUser(dataForCreateUser);

        const payload: IPayload = { userId: createdUser.id, email: createdUser.email, role: createdUser.role };
        const tokens = await this.tokensService.generateTokens(payload);

        await this.tokensService.saveToken(createdUser.id, tokens.refreshToken);

        const { password, ...userWithoutPassword } = createdUser;

        return { user: userWithoutPassword, tokens };
    }

    async login(loginDto: loginDto) {
        const user = await this.usersService.findUserByEmail(loginDto.email);
        if (!user) throw new BadRequestException("User with this email does not exists.");

        const isEqualPasswords = await bcrypt.compare(loginDto.password, user.password);
        if (!isEqualPasswords) throw new BadRequestException("Incorrect password.");

        const payload: IPayload = { userId: user.id, email: user.email, role: user.role };
        const tokens = await this.tokensService.generateTokens(payload);

        await this.tokensService.saveToken(user.id, tokens.refreshToken);

        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, tokens };
    }

    async logout(refreshToken: string) {
        return this.tokensService.deleteToken(refreshToken);
    }

    async refresh(refreshToken: Token['refreshToken']) {
        const payload: IPayload = await this.tokensService.validateRefreshToken(refreshToken);
        const isExists = await this.tokensService.findToken(refreshToken);

        if (!payload || !isExists) throw new UnauthorizedException();

        const user = await this.usersService.findUserByEmail(payload.email);
        if (!user) throw new InternalServerErrorException();

        const { password, ...userWithoutPassword } = user;

        const newPayload: IPayload = { userId: user.id, email: user.email, role: user.role }
        const tokens = await this.tokensService.generateTokens(newPayload);

        await this.tokensService.saveToken(user.id, tokens.refreshToken);

        return { user: userWithoutPassword, tokens };
    }
}