import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  login(loginDto: LoginDto) {
    const user = this.usersService.findRawByEmail(
      loginDto.email,
    );

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException(
        'Неверный пароль',
      );
    }

    return {
      user: this.usersService.toPublicUser(user),
    };
  }
}
