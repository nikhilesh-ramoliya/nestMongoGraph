import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => String)
  @Prop({ type: mongoose.Types.ObjectId })
  _id?: Types.ObjectId;

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

  @Prop()
  password: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop([{ type: mongoose.Types.ObjectId, ref: 'Organization' }])
  orgs: [Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
