import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Organization,
  OrganizationSchema,
} from 'src/organization/organization.model';
import { User, UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Organization.name,
        schema: OrganizationSchema,
      },
    ]),
  ],
  providers: [OrganizationResolver, OrganizationService],
})
export class OrganizationModule {}
