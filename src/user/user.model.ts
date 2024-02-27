import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => String)
  @Prop({ type: mongoose.Types.ObjectId })
  _id?: ObjectId;

  @Field(() => String)
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop({ required: false })
  name?: string;

  @Field(() => String, {
    nullable: true,
  })
  @Prop()
  avatarKey?: string;

  @Field({ nullable: true })
  @Prop()
  password: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
