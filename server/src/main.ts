import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { boolean } from 'zod';

const PORT = (process.env.PORT as string) ?? 5000

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser())
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })

    const config = new DocumentBuilder()
        .setTitle('Task Manager')
        .setDescription('Task manager API')
        .setVersion('1.0')
        .addTag('tasks')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(PORT);
}
bootstrap();
