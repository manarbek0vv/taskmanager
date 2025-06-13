import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { RoomsModule } from './rooms/rooms.module';
import { TasksModule } from './tasks/tasks.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        AuthModule,
        TokensModule,
        RoomsModule,
        TasksModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads', // теперь файлы доступны по /uploads/...
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }