import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { UserRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class ShowProfileService {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User Not Found!');
    }
    return user;
  }
}

export default ShowProfileService;
