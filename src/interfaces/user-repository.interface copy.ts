import { User } from 'src/entities/user.entity';

export interface IUserRepository {
  findOneById(userId: string): Promise<User | null>;
  findByEmail(emailId: string): Promise<User | null>;
  createUser(user: Partial<User>): Promise<User | null>;
}

export const USER_REPOSITORY_TOKEN = Symbol('IUserRepository');
