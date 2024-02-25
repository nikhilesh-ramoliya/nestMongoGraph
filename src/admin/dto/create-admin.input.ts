import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int, { defaultValue: 10, nullable: true })
  limit?: number;

  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip?: number;
}
