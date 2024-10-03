import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Transporter, createTransport } from 'nodemailer';
import { createOTP, GenerateOTP, verifiedOTP } from 'src/helpers/mail.hepler';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class MailService {
  private transporter :Transporter;

  constructor( 
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.transporter = createTransport({
      service: 'Gmail', 
      auth: {
        user: process.env.EMAIL_ACCOUNT, 
        pass: process.env.PASSWORD_APP, 
      },
    });
  }

 async sendVerificationEmail(email: string) {

    const user = await this.userService.findByEmail(email)

    if(!user) return

    const payload = {
      email: user.email,
      name: user.name,
    } 

    const token = await this.jwtService.signAsync(payload)

    const mailOptions = {
      from: process.env.EMAIL_ACCOUNT,
      to: user.email,
      subject: 'Xác minh tài khoản',
      text: `Vui lòng xác minh tài khoản của bạn bằng cách sử dụng liên kết sau: http://localhost:${process.env.PORT_SERVER}/verify?token=${token}`,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      this.transporter.close()
      return result;
    } catch (error) {
      this.transporter.close()
      return {
        error: error
      }
    }
  } 

  async sendOtpCodeEmail (email:string) {
    const otp =  createOTP()
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Mã OTP xác thực',
      text: `Mã OTP của bạn là: ${otp}`,
    };
  
    try {
      // await this.transporter.sendMail(mailOptions);
      // this.transporter.close()
      const isTrue = verifiedOTP(otp)
      console.log(otp, isTrue)
      return {
        message: "Send OTP successfully !!!",
        status: 200
      }
    } catch (error) {
      this.transporter.close()
      return{
        error: error
      }
    }
  }
}
