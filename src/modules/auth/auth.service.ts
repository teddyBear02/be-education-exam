import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hashPassword } from 'src/helpers/auth.helper';
import { HttpMessage, HttpReponseStatus } from 'src/constants/https';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ){}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email not found !');
    }

    const isPasswordValid = await this.userService.validateUserPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password !');
    }

    return user;
  }

  async login(user: any) {

    const payload = { 
      id: user._id, 
      email: user.email, 
      createAt : user.createAt,
      role: user.role,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar
    };

    return {
      result: payload,
      accessToken: await this.jwtService.signAsync(payload),
      message: "Login success",
      status: 200
    };
  }

  async register(user: RegisterAuthDto) {
    const createUser = new this.userModel(user)

    const userExist = await this.userService.findByEmail(createUser.email);

    if(userExist !== null && createUser.email === userExist.email){
      throw new BadRequestException('Email was existed !');
    }
    
    createUser.password = hashPassword(createUser.password)
    createUser.save()

    return {
      message: HttpMessage.CREATE_SUCCESS,
      status: HttpReponseStatus.CREATE_SUCCESS
    }
  }

  async logout(request : Request){
    
    const token : string =  request.headers.authorization?.slice(7)

    const decodedToken = this.jwtService.decode(token) as any

    console.log(decodedToken)

    return {
      message : "Log out successfully !",
      status: 200
    } 
  }
}