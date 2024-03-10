import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Public } from 'src/decorator/isPublic.decorator';
import { UserDecorator } from 'src/decorator/user/user.decorator';
import {
  AddToOrganizationInput,
  RemoveFromOrganizationInput,
} from 'src/organization/dto/add-to-organization.input';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import {
  CreateOrganizationInput,
  CreateOrganizationWithUserInput,
} from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization } from './organization.model';
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Organization)
  createOrganization(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
    @UserDecorator() user: User,
  ) {
    const createdById = user._id;
    return this.organizationService.create(
      createOrganizationInput,
      createdById,
    );
  }

  @Public()
  @Mutation(() => Organization)
  async createOrganizationWithUser(
    @Args('createOrganizationWithUserInput')
    createOrganizationWithUserInput: CreateOrganizationWithUserInput,
  ) {
    const user = {
      name: createOrganizationWithUserInput.userName,
      password: createOrganizationWithUserInput.password,
      email: createOrganizationWithUserInput.email,
    };

    const createdUser = await this.userService.create(user);

    const oldOrg = await this.organizationService.findOneByName(
      createOrganizationWithUserInput.name,
    );

    if (oldOrg) {
      throw new Error('Organization already exists');
    }

    return this.organizationService.create(
      {
        name: createOrganizationWithUserInput.name,
      },
      createdUser._id,
    );
  }

  @Mutation(() => Organization)
  addUserToOrganization(
    @Args('addToOrganizationInput')
    addToOrgInput: AddToOrganizationInput,
  ) {
    return this.organizationService.addToOrg(addToOrgInput);
  }

  @Mutation(() => Organization)
  updateUserRoleToOrganization(
    @Args('addToOrganizationInput')
    addToOrgInput: AddToOrganizationInput,
  ) {
    return this.organizationService.updateUserRole(addToOrgInput);
  }

  @Mutation(() => Organization)
  removeUserFromOrganization(
    @Args('removeFromOrganizationInput')
    addToOrgInput: RemoveFromOrganizationInput,
  ) {
    return this.organizationService.removeFromOrg(addToOrgInput);
  }

  @Mutation(() => Organization)
  updateOrganization(
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ) {
    return this.organizationService.update(updateOrganizationInput);
  }

  @Mutation(() => Organization)
  removeOrganization(@Args('id', { type: () => String }) id: string) {
    return this.organizationService.remove(id);
  }

  @Query(() => [Organization], { name: 'organizations' })
  findAll() {
    return this.organizationService.findAll();
  }

  @ResolveField()
  createdById(@Parent() parent: Organization) {
    const a = parent.createdById;
    return this.userService.findOne(a);
  }

  @ResolveField()
  async users(@Parent() parent: Organization) {
    const users = await Promise.all(
      parent.users.map(async (i) => {
        const user = await this.userService.findOne(i.user);
        return {
          role: i.role,
          user: user,
        };
      }),
    );
    return users;
  }

  @Query(() => Organization, { name: 'organization' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.organizationService.findOne(id);
  }

  @Query(() => [Organization], { name: 'userOrgs' })
  findMyOrgs(@UserDecorator() user: User) {
    return this.organizationService.findOneByUserId(user._id);
  }
}
