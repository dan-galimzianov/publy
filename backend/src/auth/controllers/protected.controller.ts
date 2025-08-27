import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetCurrentUser } from '../decorators/current-user.decorator';
import type { CurrentUser } from '../types';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class ProtectedController {
  @Get('me')
  getProfile(@GetCurrentUser() user: CurrentUser) {
    return user;
  }
}
