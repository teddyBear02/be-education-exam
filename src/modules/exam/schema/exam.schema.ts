import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type ExamDocument = Exam & Document

@Schema()
export class Exam {
   @Prop()
   name: string

   @Prop()
   mainTeacher : ObjectId

   @Prop({
    default: 0
   })
   studentCount: number

   @Prop()
   startTime: Date

   @Prop()
   endTime: Date
   
   @Prop({
    type: Date,
    default: Date.now
   })
   createAt: Date
}

export const ExamSchema = SchemaFactory.createForClass(Exam)