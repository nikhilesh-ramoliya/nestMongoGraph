import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/decorator/isPublic.decorator';
import { Admin } from './admin.model';
import { AdminService } from './admin.service';
import { CreateAdminInput, PaginatedArgs } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';

@Public()
@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Query(() => [Admin], { name: 'admin' })
  findAll(@Args() args: PaginatedArgs) {
    return this.adminService.findAll(args);
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminService.update(updateAdminInput.id, updateAdminInput);
  }

  @Mutation(() => Admin)
  removeAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.adminService.remove(id);
  }
}
