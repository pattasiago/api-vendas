import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { IUpdateProfileService } from '../domain/models/IUpdateProfileService';
import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfileService): Promise<IUser> {
    const usersRepository = this.usersRepository;
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User Not Found!');
    }

    const userExists = await usersRepository.findByEmail(email);

    if (userExists && userExists.id !== id) {
      throw new AppError('User Already Exists', 403);
    }

    if (password && !old_password) {
      throw new AppError('Old Password is required!');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Old Password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
