import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/role.enum';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly storageService: StorageService,
  ) {}

  findAll() {
    return this.storageService
      .getUsers()
      .map((user) => this.toPublicUser(user));
  }

  findOne(id: number) {
    return this.toPublicUser(this.findRawById(id));
  }

  create(createUserDto: CreateUserDto) {
    const users = this.storageService.getUsers();
    this.ensureUniqueEmail(createUserDto.email);

    const user: User = {
      id: this.storageService.getNextId('users'),
      name: createUserDto.name,
      email: createUserDto.email,
      age: createUserDto.age,
      role: createUserDto.role ?? Role.GUEST,
      password: createUserDto.password ?? 'guest1234',
    };

    users.push(user);

    return this.toPublicUser(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findRawById(id);

    if (
      updateUserDto.email &&
      updateUserDto.email !== user.email
    ) {
      this.ensureUniqueEmail(updateUserDto.email, id);
    }

    Object.assign(user, updateUserDto);

    return this.toPublicUser(user);
  }

  remove(id: number) {
    const users = this.storageService.getUsers();
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `Пользователь с id=${id} не найден`,
      );
    }

    const [removedUser] = users.splice(index, 1);

    return this.toPublicUser(removedUser);
  }

  findRawById(id: number) {
    const user = this.storageService
      .getUsers()
      .find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(
        `Пользователь с id=${id} не найден`,
      );
    }

    return user;
  }

  findRawByEmail(email: string) {
    const normalizedEmail = email.toLowerCase();
    const user = this.storageService
      .getUsers()
      .find(
        (item) =>
          item.email.toLowerCase() === normalizedEmail,
      );

    if (!user) {
      throw new NotFoundException(
        `Пользователь с email=${email} не найден`,
      );
    }

    return user;
  }

  toPublicUser(user: User) {
    const { password, ...publicUser } = user;

    return publicUser;
  }

  private ensureUniqueEmail(
    email: string,
    excludeId?: number,
  ) {
    const exists = this.storageService.getUsers().some((user) => {
      if (excludeId && user.id === excludeId) {
        return false;
      }

      return user.email.toLowerCase() === email.toLowerCase();
    });

    if (exists) {
      throw new ConflictException(
        'Пользователь с таким email уже существует',
      );
    }
  }
}
