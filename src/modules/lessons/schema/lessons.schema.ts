import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop()
  name: string;

  @Prop({
    type:Date,
    default: Date.now
  })
  createAt : Date
  
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
