import { Field, InputType } from '@nestjs/graphql';

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
  @Field(() => String)
  role: string;
}
