import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateOrganizationInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class CreateOrganizationWithUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  userName: string;
}
