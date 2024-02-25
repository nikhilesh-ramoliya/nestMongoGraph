import { SetMetadata } from '@nestjs/common';

export const RolesAllowed = (...args: string[]) =>
  SetMetadata('roles-allowed', args);
