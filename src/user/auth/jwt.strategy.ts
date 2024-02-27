import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecrete } from 'src/contstant';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecrete,
    });
  }

  async validate(payload) {
    if (payload?.user) {
      const id = new ObjectId(payload.user._id);
      const user = await this.userService.findOne(payload.user._id);
      if (user) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
