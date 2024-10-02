import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type ClassDocument = Classroom & Document

@Schema()
export class Classroom {
   @Prop()
   name: string

   @Prop()
   mainTeacher : ObjectId

   @Prop({
    default: 0
   })
   studentCount: number

   @Prop()
   school: ObjectId

   @Prop({
    type: Date,
    default: Date.now
   })
   createAt: Date
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom)