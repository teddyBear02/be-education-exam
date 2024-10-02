import { Body, Controller, Get, ValidationPipe } from "@nestjs/common";
import { MailService } from "./mail.service";
import { EmailDto } from "./dto/email.dto";

@Controller('mail')
export class MailController{
    constructor(private readonly mailService: MailService) {}
    
    @Get('reset-pass')
    async reset(@Body(ValidationPipe) emailDto : EmailDto){
        return this.mailService.sendVerificationEmail(emailDto.email)
    }

    @Get('otp-test')
    async otpTest(@Body(ValidationPipe) emailDto : EmailDto){
        return this.mailService.sendOtpCodeEmail(emailDto.email)
    }
}