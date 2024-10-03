import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { TYPE_NOTIFICATION } from 'src/constants';

export type NotificationDocument = Notification & Document

@Schema()
export class Notification {
    @Prop()
    sender: ObjectId

    @Prop()
    content: string

    @Prop()
    type : TYPE_NOTIFICATION[]

    @Prop({
        default: false
    })
    isRead : boolean

    @Prop({
    type: Date,
    default: Date.now
    })
    createAt: Date
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)