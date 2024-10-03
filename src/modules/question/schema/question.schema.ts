import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export type QuestionDocument = Question & Document

@Schema()
export class Question {
   @Prop()
   content: string

   @Prop()
   answer : []

   @Prop({
    default: 0
   })
   result: string

   @Prop()
   examCode : ObjectId
   
   @Prop({
    type: Date,
    default: Date.now
   })
   createAt: Date
}

export const QuestionSchema = SchemaFactory.createForClass(Question)