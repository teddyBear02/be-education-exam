import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ROLE } from 'src/constants/user';
import { Date, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({unique: true})
  email: string

  @Prop()
  password: string

  @Prop({
    default: null
  })
  phoneNumber: string | null;

  @Prop({
    default: ROLE.USER
  })
  role: ROLE[]

  @Prop({
    default: null
  })
  avatar: string | null

  @Prop({
    type: Date,
    default: Date.now
  })
  createAt: Date

}

export const UserSchema = SchemaFactory.createForClass(User);
