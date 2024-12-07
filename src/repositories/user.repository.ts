import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/interfaces/user-repository.interface copy';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneById(userId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { userId } });
  }

  async findByEmail(emailId: string): Promise<User> {
    return await this.userRepository.findOne({ where: { emailId } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }
}
