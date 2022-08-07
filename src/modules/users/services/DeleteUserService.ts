import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const usersRepository = this.usersRepository;
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User Not Found!');
    }

    await usersRepository.remove(user);
  }
}

export default DeleteUserService;
