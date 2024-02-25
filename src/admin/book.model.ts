import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Admin } from 'src/admin/admin.model';

@ObjectType()
@Schema()
export class Book extends Document {
  @Field(() => String)
  @Prop({ type: mongoose.Types.ObjectId })
  _id?: ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Admin)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Admin' })
  author: Admin;

  @Field(() => [Admin])
  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Admin' }])
  readers: Admin[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
