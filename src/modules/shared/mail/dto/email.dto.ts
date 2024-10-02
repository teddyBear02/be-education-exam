import {IsString, IsNotEmpty, IsEmail} from 'class-validator'

export class EmailDto {
    @IsEmail()
    @IsNotEmpty()
    email:string
}