import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateUserService {
  public async execute({ id, name, email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User Not Found!');
    }

    const userExists = await usersRepository.findByEmail(email);

    if (userExists && email !== user.email) {
      throw new AppError('User Already Exists', 403);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
