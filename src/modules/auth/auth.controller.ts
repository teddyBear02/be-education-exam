import { Controller, Post, Body, ValidationPipe, HttpCode, Get, Head, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body(ValidationPipe) loginAuthDto: LoginAuthDto) {
    const user = await this.authService.validateUser(loginAuthDto.email, loginAuthDto.password);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body(ValidationPipe) registerAuthDto: RegisterAuthDto){
    return this.authService.register(registerAuthDto);
  }

  @Get('logout')
  @HttpCode(200)
  async logout(@Req() request : Request){
    return this.authService.logout(request)
  }
  
}