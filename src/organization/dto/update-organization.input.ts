import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateOrganizationInput } from './create-organization.input';

@InputType()
export class UpdateOrganizationInput extends PartialType(
  CreateOrganizationInput,
) {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
