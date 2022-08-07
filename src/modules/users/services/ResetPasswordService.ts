import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IResetPassword } from '../domain/models/IResetPassoword';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const usersRepository = this.usersRepository;
    const userTokensRepository = this.userTokensRepository;

    const userToken = await userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User Token does not exist');
    }

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired!');
    }

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
