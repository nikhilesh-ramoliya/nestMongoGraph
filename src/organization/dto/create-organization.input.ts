import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class CreateOrganizationWithUserInput {
  @Field(() => String)
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  userName: string;
}
