import {IsString, IsNotEmpty, IsEmail} from 'class-validator'

export class LoginAuthDto {
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
}
