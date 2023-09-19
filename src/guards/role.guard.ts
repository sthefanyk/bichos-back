import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/@core/shared/domain/enums/role.enum';
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {

    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    const rolesFiltered: number[] = requiredRoles.filter(role => role === user.role);

    if (rolesFiltered.length > 0) {
      return true;
    }

    return false;

  }
}
