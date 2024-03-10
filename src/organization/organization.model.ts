import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';
import { User } from 'src/user/user.model';

export enum Role {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}
@Schema()
@ObjectType()
export class Organization {
  @Field(() => String)
  @Prop({ type: mongoose.Types.ObjectId })
  _id?: ObjectId;

  @Field(() => String, { description: 'Example field (placeholder)' })
  @Prop({ unique: true })
  name: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now })
  updatedAt: Date;

  @Field(() => User)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  createdById: Types.ObjectId;

  @Field(() => [OrgUser])
  @Prop()
  users: OrgUser[];
}

@ObjectType()
@Schema()
export class OrgUser {
  @Field(() => User)
  @Prop([{ type: mongoose.Types.ObjectId, ref: 'User' }])
  user: Types.ObjectId;

  @Field()
  @Prop({
    enum: Role,
    default: Role.MEMBER,
  })
  role: Role;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
