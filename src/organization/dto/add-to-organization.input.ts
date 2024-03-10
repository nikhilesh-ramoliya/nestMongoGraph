import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

enum Role {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

@InputType()
export class RemoveFromOrganizationInput {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  userId: string;
}

@InputType()
export class AddToOrganizationInput extends RemoveFromOrganizationInput {
  @IsEnum(Role)
  @Field(() => String)
  role: Role;
}
