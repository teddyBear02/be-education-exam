import {IsString, IsNotEmpty, IsEmail} from 'class-validator'
import { ROLE } from 'src/constants/user'
export class RegisterAuthDto {
    @IsString()
    @IsNotEmpty({
        message: "Name field must not empty !"
    })
    name : string

    @IsString()
    @IsEmail()
    @IsNotEmpty({
        message: "Email field must not empty !"
    })
    email : string

    @IsString()
    @IsNotEmpty({
        message: "Password field must not empty !"
    }) 
    password : string


    @IsNotEmpty({
        message: "Role field must not empty !"
    })
    @IsString()
    role: ROLE
}
