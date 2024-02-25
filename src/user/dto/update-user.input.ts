import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatarKey?: string;
}
