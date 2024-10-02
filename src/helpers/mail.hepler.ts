import * as speakeasy from 'speakeasy'

export const GenerateOTP = () =>{
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số ngẫu nhiên
    const timestamp = Date.now().toString(); // Thời gian hiện tại theo mili-giây
    const uniqueOtp = otp + timestamp.slice(-3);
    return uniqueOtp;
} 

export const secret = speakeasy.generateSecret({ length: 20 });

// Tạo mã OTP dựa trên TOTP
export const createOTP = () =>{
    return speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    })
} 

// Xác thực mã OTP
export const verifiedOTP = (token: string) =>{
    return speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: token,
    })
} 