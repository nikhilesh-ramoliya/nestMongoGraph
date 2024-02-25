import { UseGuards } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  PartialType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { Public } from 'src/decorator/isPublic.decorator';
import { UserDecorator } from 'src/decorator/user/user.decorator';
import { GqlAuthGuard } from 'src/guard/auth/gqlAuth.guard';
import { GqlJWTAuthGuard } from 'src/guard/auth/gqlJwtAuth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.model';
import { UserService } from './user.service';

@InputType()
export class SignInUserInput extends PartialType(CreateUserInput) {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class SignInUser {
  @Field(() => String)
  token: string;

  @Field((returns) => User)
  user: User;
}

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Mutation(() => User)
  async signUp(@Args('signUpUserInput') createUserInput: CreateUserInput) {
    const password = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.create({ ...createUserInput, password });
  }

  @UseGuards(GqlJWTAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAll(@UserDecorator() user: User) {
    const users = await this.userService.findAll();
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Public()
  @Query((returns) => SignInUser, { name: 'signIn' })
  async signIn(
    @Args('signInUserInput') signInUserInput: SignInUserInput,
    @UserDecorator() user: User,
  ) {
    return { token: this.jwtService.sign({ user }), user };
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    const objectId = new ObjectId(id);
    return this.userService.findOne(objectId);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const id = updateUserInput._id;
    delete updateUserInput._id;
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    const objectId = new ObjectId(id);
    await this.userService.remove(objectId);
    return 'user removed successfully';
  }
}
