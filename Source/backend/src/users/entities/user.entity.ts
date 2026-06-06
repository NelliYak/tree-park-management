import { Role } from '../../auth/role.enum';

export class User {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: Role;
  password: string;
}
