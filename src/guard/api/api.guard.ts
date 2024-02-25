import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RolesAllowed } from 'src/decorator/roles-allowed/roles-allowed.decorator';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesAllowed = this.reflector.get<string[]>(
      RolesAllowed,
      context.getHandler(),
    );

    const request: Request = context.switchToHttp().getRequest();

    return true;
  }
}
