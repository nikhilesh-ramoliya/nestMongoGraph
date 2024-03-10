import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtSecrete } from 'src/contstant';
import {
  Organization,
  OrganizationSchema,
} from 'src/organization/organization.model';
import { JwtStrategy } from 'src/user/auth/jwt.strategy';
import { User, UserSchema } from 'src/user/user.model';
import { LocalStrategy } from './auth/local.strategy';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
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
    JwtModule.register({
      secret: jwtSecrete,
    }),
  ],
  providers: [UserResolver, UserService, LocalStrategy, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
