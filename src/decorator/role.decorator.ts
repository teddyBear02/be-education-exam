import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/constants/user';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
