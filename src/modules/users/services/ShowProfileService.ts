import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { injectable, inject } from 'tsyringe';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<IUser> {
    const usersRepository = this.usersRepository;
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User Not Found!');
    }
    return user;
  }
}

export default ShowProfileService;
