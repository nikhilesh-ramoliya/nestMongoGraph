import {
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
@Dependencies(UserService)
export class LocalStrategy extends PassportStrategy(Strategy) {
  userService: UserService;
  constructor(userService) {
    super({
      usernameField: 'email',
    });
    this.userService = userService;
  }

  async validate(username: string, password: string) {
    const user = await this.userService.signIn({ email: username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user.toObject();
  }
}
