import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Book } from 'src/admin/book.model';

@ObjectType()
@Schema()
export class Admin extends Document {
  @Field(() => String)
  @Prop({ type: mongoose.Types.ObjectId })
  _id?: ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  email: string;

  @Field(() => [Book])
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Book' }] })
  books: Book[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
