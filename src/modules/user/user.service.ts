import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { hashPassword, comparePassword } from 'src/helpers/auth.helper';
import { HttpMessage, HttpReponseStatus } from 'src/constants/https'
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private UserModel: Model<User>){}


  // Create a new user: 

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.UserModel(createUserDto)
    createUser.password = hashPassword(createUser.password)
    createUser.save()
    return {
      message: HttpMessage.CREATE_SUCCESS,
      status: HttpReponseStatus.CREATE_SUCCESS
    }
  }

  // Find user by email: 

  async findByEmail(email: string): Promise<User | undefined> {
    return this.UserModel.findOne({ email }).exec();
  }

  //Compare password:

  async validateUserPassword(password: string, hashedPassword: string): Promise<boolean> {
    return comparePassword(password, hashedPassword);
  }

  // Find all user : (Pagination)

  async findAll(SearchUser : SearchUserDto) {

    const {pageNumber, pageSize, search} = SearchUser.pagination

    const regexName = new RegExp(search,'i')

    const users = await this.UserModel.find({
      $or : [
        { name: { $regex :  regexName }}, 
        { email: { $regex :  regexName }}
      ],
    })
    .skip((pageNumber-1) * pageSize)
    .limit(pageSize)

    const res = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        createAt: user.createAt
      }
    })

    return {
      result: res,
      message: HttpMessage.SUCCESS,
      status: HttpReponseStatus.SUCCESS
    };
  }

  // Find one user by id: 

  async findOne(id: string) {

    const objectId = new Types.ObjectId(id);

    const user = await this.UserModel.findById(objectId);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const res = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      createAt: user.createAt
    }

    return {
      result: res,
      message: HttpMessage.SUCCESS,
      status: HttpReponseStatus.SUCCESS
    };
  }

  // Update one user: 

  async update(id: string, updateUserDto: UpdateUserDto) {

    const objectId = new Types.ObjectId(id);

    const user = await this.UserModel.findById(objectId);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const UserUpdate = await this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true })

    return {
      result: UserUpdate,
      message: HttpMessage.SUCCESS,
      status: HttpReponseStatus.SUCCESS
    };;
  }

  // Delete one user:

  async remove(id: string) {

    const objectId = new Types.ObjectId(id);

    return {
      message: "Delete user successfully !!!",
      status: 200
    };
  }
}
