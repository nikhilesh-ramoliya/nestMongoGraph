import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateOrganizationInput } from './create-organization.input';

@InputType()
export class UpdateOrganizationInput extends PartialType(
  CreateOrganizationInput,
) {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;
}
