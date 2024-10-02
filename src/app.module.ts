import { MiddlewareConsumer, Module, NestModule  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { LessonsModule } from './modules/lessons/lessons.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { RolesGuard } from './modules/user/user.guard';
import { AuthGuard } from './modules/auth/auth.guard';
import { MailService } from './modules/shared/mail/mail.service';
import { MailController } from './modules/shared/mail/mail.controller';
import { ChatModule } from './modules/chat/chat.module';
import { ChatGateway } from './modules/chat/chat.gateway';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService : ConfigService) => {
        const secret_key = configService.get<string>('JWT_CONSTANT')
        return {
          secret: secret_key,
          signOptions: {expiresIn: '14000s'}
        }
      },
      inject:[ConfigService],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUrl = configService.get<string>('DATABASE_MONGOSE_URL')
        return {uri: mongoUrl}
      },
      inject:[ConfigService]
    }),
    
    AuthModule,
    LessonsModule,
    UserModule,
    ClassroomModule,
    ChatModule
  ],
  controllers: [AppController, UserController, MailController],
  providers: [AppService, UserService, RolesGuard, AuthGuard, MailService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('auth')
  }
}
